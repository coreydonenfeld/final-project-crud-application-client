/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { editStudentThunk, fetchAllCampusesThunk, fetchStudentThunk } from '../../store/thunks';

import Header from './Header';
import { UpdateStudentView } from '../views';

class EditStudentContainer extends Component {

    // Initialize state
    constructor(props) {
        super(props);
        this.state = {
            studentId: this.props.match.params.id || null,
            firstname: "",
            lastname: "",
            campusId: "",
            email: "",
            gpa: "",
            imageUrl: "",
            redirect: false,
            redirectId: null,
            allCampuses: [],
        };
    }

    // Fetch student data when component mounts
    async componentDidMount() {
        await this.props.fetchAllCampuses();
        await this.props.fetchStudent(this.props.match.params.id);

        this.setState({
            studentId: this.props.student.id,
            firstname: this.props.student.firstname,
            lastname: this.props.student.lastname,
            campusId: this.props.student.campusId,
            email: this.props.student.email,
            gpa: this.props.student.gpa || "",
            imageUrl: this.props.student.imageUrl || "",
        });
    }

    // Capture input data when it is entered
    handleChange = event => {
        this.clearErrorNotices();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // Capture selected campus when it is selected
    handleSelectChange = (selectedOption, name) => {
        this.clearErrorNotices();
        this.setState({
            [name]: selectedOption.value
        });
    }

    getErrorNotices = () => {
        return document.getElementById('error-notices');
    }

    addErrorNotice = (message, field = '') => {
        const errorNotices = this.getErrorNotices();
        let notice = document.createElement('div');
        notice.innerHTML = message;
        errorNotices.appendChild(notice);

        // Add error class to input wrapper
        if (field) {
            let input = document.querySelector(`input[name=${field}]`);
            let inputWrapper = input.parentElement;
            if (inputWrapper) {
                inputWrapper.classList.add('error');
            }
        }
    }

    clearErrorNotices = () => {
        const errorNotices = this.getErrorNotices();
        errorNotices.innerHTML = '';

        // Remove error class from input wrapper
        const inputs = document.querySelectorAll('.form-input-wrapper input');
        inputs.forEach(input => {
            let inputWrapper = input.parentElement;
            inputWrapper.classList.remove('error');
        });
    }

    // Take action after user click the submit button
    handleSubmit = async (event) => {
        event.preventDefault();  // Prevent browser reload/refresh after submit.

        // Update state with new student data
        this.setState({
            firstname: event.target.firstname.value,
            lastname: event.target.lastname.value,
            campusId: parseInt(event.target.campusId.value),
            email: event.target.email.value,
            gpa: event.target.gpa.value,
            imageUrl: event.target.imageUrl.value,
        }, async () => {
            // Error handling
            const errors = [
                {
                    field: 'firstname',
                    message: 'Please enter a first name.',
                    validation: 'required',
                },
                {
                    field: 'lastname',
                    message: 'Please enter a last name.',
                    validation: 'required',
                },
                {
                    field: 'email',
                    message: 'Please enter an email address.',
                    validation: 'required',
                },
                {
                    field: 'gpa',
                    message: 'Please enter a GPA between 0 and 4.',
                    validation: (gpa) => {
                        if (typeof gpa === 'undefined') return true;  // allow empty string (no GPA)
                        return gpa >= 0 && gpa <= 4;
                    }
                },
            ];
            this.clearErrorNotices();

            let isValid = true;
            errors.forEach(error => {
                if (error.validation === 'required' && !this.state[error.field]) {
                    this.addErrorNotice(error.message, error.field);
                    isValid = false;
                } else if (typeof error.validation === 'function' && !error.validation(this.state[error.field])) {
                    this.addErrorNotice(error.message, error.field);
                    isValid = false;
                }

                // check that it is not greater than 255 characters
                if (this.state[error.field] && this.state[error.field].length > 255) {
                    this.addErrorNotice('Please enter a value less than 255 characters.', error.field);
                    isValid = false;
                }
            });

            if (!isValid) {
                return;
            }

            let student = {
                id: this.state.studentId,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                campusId: this.state.campusId,
                email: this.state.email,
                imageUrl: this.state.imageUrl || null,
                gpa: this.state.gpa || null,
            };

            // Add new student in back-end database
            let newStudent = await this.props.editStudent(student);

            // Update state, and trigger redirect to show the new student
            this.setState({
                studentId: "",
                firstname: "",
                lastname: "",
                campusId: "",
                email: "",
                gpa: "",
                imageUrl: "",
                redirect: true,
                redirectId: newStudent.id,
            });
        });
    }

    // Unmount when the component is being removed from the DOM
    componentWillUnmount() {
        this.setState({ redirect: false, redirectId: null });
    }

    // Render new student input form
    render() {
        // Redirect to new student's page after submit
        if (this.state.redirect) {
            return (<Redirect to={`/student/${this.state.redirectId}`} />);
        }

        // Display the input form via the corresponding View component
        return (
            <div>
                <Header />
                <main className="new-student">
                    <UpdateStudentView
                        formTitle="Edit Student"
                        submitButtonText="Update"

                        handleChange={this.handleChange}
                        handleSelectChange={this.handleSelectChange}
                        handleSubmit={this.handleSubmit}

                        student={this.props.student}
                        campuses={this.props.allCampuses}

                        campusId={this.state.campusId}
                        firstname={this.state.firstname}
                        lastname={this.state.lastname}
                        email={this.state.email}
                        gpa={this.state.gpa}
                        imageUrl={this.state.imageUrl }
                    />
                </main>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        allCampuses: state.allCampuses,  // Get the State object from Reducer "allCampuses"
        student: state.student,
    };
};
const mapDispatch = (dispatch) => {
    return ({
        editStudent: (student) => dispatch(editStudentThunk(student)),
        fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
        fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentContainer);
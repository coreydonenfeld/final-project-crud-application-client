/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk, fetchAllCampusesThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
    // Initialize state
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            imageUrl: "",
            email: "",
            redirect: false,
            redirectId: null,
            allCampuses: [],
            defaultCampus: null,
            campusId: null,
        };

        // get campusId and campusName from search query
        const searchParams = new URLSearchParams(this.props.location.search);
        const campusId = searchParams.get('campusId');
        const campusName = searchParams.get('campusName');

        if (campusId && campusName) {
            this.state.defaultCampus = {
                label: campusName,
                value: campusId,
            };
            this.state.campusId = campusId;
        }
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
        this.setState({
            [name]: selectedOption.value
        });
    }

    getCampusesForSelect = async (input) => {
        await this.props.fetchAllCampuses();
        let campuses = this.props.allCampuses;

        // map campuses to an array of objects with label and value
        campuses = campuses.map(campus => {
            return {
                label: campus.name,
                value: campus.id,
            };
        });

        // check if each campus name contains the input string
        if (typeof input === 'string') {
            campuses = campuses.filter(campus => {
                return campus.label.toLowerCase().includes(input.toLowerCase());
            });
        }

        return campuses;
    }

    getErrorNotices = () => {
        const errorNotices = document.getElementById('error-notices');
        return errorNotices;
    }

    addErrorNotice = (message, field = '') => {
        const errorNotices = this.getErrorNotices();
        let notice = document.createElement('div');
        notice.innerHTML = message;
        errorNotices.appendChild(notice);

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

        const inputs = document.querySelectorAll('.form-input-wrapper input');
        inputs.forEach(input => {
            let inputWrapper = input.parentElement;
            inputWrapper.classList.remove('error');
        });
    }

    // Take action after user click the submit button
    handleSubmit = async event => {
        event.preventDefault();  // Prevent browser reload/refresh after submit.

        // error handling
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
                field: 'campusId',
                message: 'Please select a campus.',
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
            {
                field: 'imageUrl',
                message: 'Please enter a valid URL.',
            }
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
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            campusId: this.state.campusId,
            email: this.state.email,
            imageUrl: this.state.imageUrl,
            gpa: this.state.gpa,
        };

        // Add new student in back-end database
        let newStudent = await this.props.addStudent(student);

        // Update state, and trigger redirect to show the new student
        this.setState({
            firstname: "",
            lastname: "",
            campusId: null,
            email: "",
            redirect: true,
            redirectId: newStudent.id,
            gpa: "",
            imageUrl: "",
        });
    }

    // Unmount when the component is being removed from the DOM:
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
                    <NewStudentView
                        handleChange={this.handleChange}
                        handleSelectChange={this.handleSelectChange}
                        handleSubmit={this.handleSubmit}
                        getCampusesForSelect={this.getCampusesForSelect}
                        allCampuses={this.props.allCampuses}
                        defaultCampus={this.state.defaultCampus}
                    />
                </main>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        allCampuses: state.allCampuses,  // Get the State object from Reducer "allCampuses"
    };
};

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return ({
        addStudent: (student) => dispatch(addStudentThunk(student)),
        fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
    })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(NewStudentContainer);
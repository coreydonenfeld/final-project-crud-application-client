/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { editCampusThunk, fetchCampusThunk } from '../../store/thunks';

import Header from './Header';
import { UpdateCampusView } from '../views';

class EditCampusContainer extends Component {

    // Initialize state
    constructor(props) {
        super(props);
        this.state = {
            campusId: this.props.match.params.id || null,
            name: "",
            address: "",
            description: "",
            imageUrl: "",
            redirect: false,
            redirectId: null,
        };
    }

    // Fetch student data when component mounts
    async componentDidMount() {
        await this.props.fetchCampus(this.props.match.params.id);

        this.setState({
            campusId: this.props.campus.id,
            name: this.props.campus.name,
            address: this.props.campus.address,
            description: this.props.campus.description,
            imageUrl: this.props.campus.imageUrl || "",
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
            name: event.target.name.value,
            address: event.target.address.value,
            description: event.target.description.value,
            imageUrl: event.target.imageUrl.value,
        }, async () => {
            // error handling
            const errors = [
                {
                    field: 'name',
                    message: 'Please enter a name.',
                    validation: 'required',
                },
                {
                    field: 'address',
                    message: 'Please enter an address.',
                    validation: 'required',
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

            let campus = {
                id: this.state.campusId,
                name: this.state.name,
                address: this.state.address,
                description: this.state.description,
                imageUrl: this.state.imageUrl,
            };

            // Add new student in back-end database
            let newCampus = await this.props.editCampus(campus);

            // Update state, and trigger redirect to show the new student
            this.setState({
                name: "",
                address: "",
                description: "",
                imageUrl: "",
                redirect: true,
                redirectId: newCampus.id,
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
            return (<Redirect to={`/campus/${this.state.redirectId}`} />);
        }

        // Display the input form via the corresponding View component
        return (
            <div>
                <Header />
                <main className="new-campus">
                    <UpdateCampusView
                        formTitle="Edit Campus"
                        submitButtonText="Update"

                        handleChange={this.handleChange}
                        handleSelectChange={this.handleSelectChange}
                        handleSubmit={this.handleSubmit}

                        campusName={this.state.name}
                        address={this.state.address}
                        description={this.state.description}
                        imageUrl={this.state.imageUrl}
                    />
                </main>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        campus: state.campus,
    };
};
const mapDispatch = (dispatch) => {
    return ({
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditCampusContainer);
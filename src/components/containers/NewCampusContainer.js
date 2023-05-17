/*==================================================
NewCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import NewCampusView from '../views/NewCampusView';
import { addCampusThunk } from '../../store/thunks';

class NewCampusContainer extends Component {
    // Initialize state
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            description: "",
            imageUrl: "",
            redirect: false,
            redirectId: null,
        };
    }

    // Capture input data when it is entered
    handleChange = event => {
        this.clearErrorNotices();
        this.setState({
            [event.target.name]: event.target.value
        });
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
            name: this.state.name,
            address: this.state.address,
            description: this.state.description,
            imageUrl: this.state.imageUrl,
        };

        // Add new student in back-end database
        let newCampus = await this.props.addCampus(campus);

        // Update state, and trigger redirect to show the new student
        this.setState({
            name: "",
            address: "",
            description: "",
            imageUrl: "",
            redirect: true,
            redirectId: newCampus.id,
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
            return (<Redirect to={`/campus/${this.state.redirectId}`} />);
        }

        // Display the input form via the corresponding View component
        return (
            <div>
                <Header />
                <main className="new-campus">
                    <NewCampusView
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                    />
                </main>
            </div>
        );
    }
}
// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return ({
        addCampus: (campus) => dispatch(addCampusThunk(campus)),
    })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default withRouter(connect(null, mapDispatch)(NewCampusContainer));
/*==================================================
StudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import { Component } from "react";
import { connect } from "react-redux";
import { fetchStudentThunk, deleteStudentThunk } from "../../store/thunks";
import { Redirect, withRouter } from 'react-router-dom';

import Header from './Header';
import { StudentView } from "../views";

class StudentContainer extends Component {
    // Get student data from back-end database
    componentDidMount() {
        // getting student ID from url
        this.props.fetchStudent(this.props.match.params.id);

        // check if delete is at end of pathname
        if (this.props.location.pathname.endsWith('delete') || this.props.location.pathname.endsWith('delete/')) {
            // get campusId and campusName from search query
            const searchParams = new URLSearchParams(this.props.location.search);
            const firstName = searchParams.get('name');
            const referrer = searchParams.get('referrer');
            let redirectTo = false;

            if (typeof referrer === 'string') {
                redirectTo = referrer;

                // set the url in the browser to the referrer
                window.history.replaceState(null, null, redirectTo);
            }

            // delete student
            this.deleteStudentConfirm(this.props.match.params.id, firstName || this.props.student.firstname, redirectTo);
        }
    }

    // Delete a student. Confirms with user before deleting.
    deleteStudentConfirm = (studentId, studentName = '', referrer = false) => {
        if (!studentName) {
            studentName = 'this student';
        } else {
            studentName = "the student " + studentName;
        }
        if (window.confirm(`Are you sure you want to delete ${studentName}?`)) {
            this.props.deleteStudent(studentId);
            // redirecting to all students page after deleting student
            this.setState({ redirect: true });
        } else if (referrer !== false) {
            // go back to referring page
            this.setState({ redirect: true, redirectTarget: referrer });
        }
    }

    // Render Student view by passing student data as props to the corresponding View component
    render() {
        // Redirect to all students page after deleting student
        if (this.state && this.state.redirect) {
            if (this.state.redirectTarget) {
                return <Redirect to={this.state.redirectTarget} />;
            }
            return <Redirect to="/students" />;
        }

        return (
            <div>
                <Header />
                <main>
                    <StudentView
                        student={this.props.student}
                        deleteStudent={this.deleteStudentConfirm}
                    />
                </main>
            </div>
        );
    }
}

// The following 2 input arguments are passed to the "connect" function used by "StudentContainer" to connect to Redux Store.  
// The following 2 input arguments are passed to the "connect" function used by "AllCampusesContainer" component to connect to Redux Store.
const mapState = (state) => {
    return {
        student: state.student,  // Get the State object from Reducer "student"
    };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return {
        fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
        deleteStudent: (studentId) => dispatch(deleteStudentThunk(studentId)),
    };
};

// Export store-connected container by default
// StudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default withRouter(connect(mapState, mapDispatch)(StudentContainer));
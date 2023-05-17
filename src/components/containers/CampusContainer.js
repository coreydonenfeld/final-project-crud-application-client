/*==================================================
CampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampusThunk, deleteCampusThunk } from "../../store/thunks";
import { Redirect, withRouter } from 'react-router-dom';

import { CampusView } from "../views";

class CampusContainer extends Component {
    // Get the specific campus data from back-end database
    componentDidMount() {
        // Get campus ID from URL (API link)
        this.props.fetchCampus(this.props.match.params.id);

        // check if delete is at end of pathname
        if (this.props.location.pathname.endsWith('delete') || this.props.location.pathname.endsWith('delete/')) {
            // get campusId and campusName from search query
            const searchParams = new URLSearchParams(this.props.location.search);
            const campusName = searchParams.get('name');
            const referrer = searchParams.get('referrer');
            let redirectTo = false;

            if (typeof referrer === 'string') {
                redirectTo = referrer;
                
                // set the url in the browser to the referrer
                window.history.replaceState(null, null, redirectTo);
            }

            // delete campus
            this.deleteCampusConfirm(this.props.match.params.id, campusName || this.props.campus.name, redirectTo);
        }
    }

    // Delete a campus. Confirms with user before deleting.
    deleteCampusConfirm = (campusId, campusName = '', referrer = false) => {
        if (!campusName) {
            campusName = 'this campus';
        } else {
            campusName = "the campus " + campusName;
        }
        if (window.confirm(`Are you sure you want to delete ${campusName}?`)) {
            this.props.deleteCampus(campusId);
            // redirecting to all campuses page after deleting campus
            this.setState({ redirect: true });
        } else if (referrer !== false) {
            // go back to referring page
            this.setState({ redirect: true, redirectTarget: referrer });
        }
    }

    // Render a Campus view by passing campus data as props to the corresponding View component
    render() {
        // Redirect to all students page after deleting student
        if (this.state && this.state.redirect) {
            if (this.state.redirectTarget) {
                return <Redirect to={this.state.redirectTarget} />;
            }
            return <Redirect to="/campuses" />;
        }

        return (
            <div>
                <Header />
                <main className="campus">
                    <CampusView campus={this.props.campus} deleteCampus={this.deleteCampusConfirm} />
                </main>
            </div>
        );
    }
}

// The following 2 input arguments are passed to the "connect" function used by "CampusContainer" component to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "campus".
const mapState = (state) => {
    return {
        campus: state.campus,  // Get the State object from Reducer "campus"
    };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return {
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
        deleteCampus: (id) => dispatch(deleteCampusThunk(id)),
    };
};

// Export store-connected container by default
// CampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default withRouter(connect(mapState, mapDispatch)(CampusContainer));
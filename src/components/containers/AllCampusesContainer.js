/*==================================================
/src/components/containers\AllCampusesContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchAllCampusesThunk } from "../../store/thunks";

import Header from './Header';
import { AllCampusesView } from "../views";

class AllCampusesContainer extends Component {
    // Get all campuses data from back-end database
    componentDidMount() {
        this.props.fetchAllCampuses();
    }

    // Render All Campuses view by passing all campuses data as props to the corresponding View component
    render() {
        return (
            <div>
                <Header />
                <main>
                    <AllCampusesView campuses={this.props.allCampuses} />
                </main>
            </div>
        );
    }
}

// Map state and dispatch
const mapState = (state) => {
    return {
        allCampuses: state.allCampuses,  // Get the State object from Reducer "allCampuses"
    };
};
const mapDispatch = (dispatch) => {
    return {
        fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
    };
};

// Type check props using PropTypes
AllCampusesContainer.propTypes = {
    allCampuses: PropTypes.array.isRequired,
    fetchAllCampuses: PropTypes.func.isRequired,
};

// Export store-connected container by default
// AllCampusesContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default withRouter(connect(mapState, mapDispatch)(AllCampusesContainer));
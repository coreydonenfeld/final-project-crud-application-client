/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Button, Container } from '../jazzy-ui';
import CampusList from "../modules/CampusList";

const AllCampusesView = ({ allCampuses }) => {
    // If there is no campus, display a message.
    if (!allCampuses.length) {
        return <Container>There are no campuses. Loading!</Container>;
    }

    // If there is at least one campus, render All Campuses view 
    return (
        <Container>
            <h1>All Campuses <span className="count">({allCampuses.length})</span></h1>
            <CampusList campuses={allCampuses} />
            
            <Button link={`/`} type="primary">Add New Campus</Button>
        </Container>
    );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
    allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
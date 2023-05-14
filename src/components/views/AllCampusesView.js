/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Container } from '../jazzy-ui';

const AllCampusesView = (props) => {
    // If there is no campus, display a message.
    if (!props.allCampuses.length) {
        return <div>There are no campuses.</div>;
    }

    // If there is at least one campus, render All Campuses view 
    return (
        <Container>
            <h1>All Campuses</h1>

            {props.allCampuses.map((campus) => (
                <div key={campus.id}>
                    <Link to={`/campus/${campus.id}`}>
                        <h2>{campus.name}</h2>
                    </Link>
                    <h4>campus id: {campus.id}</h4>
                    <p>{campus.address}</p>
                    <p>{campus.description}</p>
                    <Button link={`/campus/${campus.id}`} type="primary">View Campus</Button>
                    <hr />
                </div>
            ))}
            <Button link={`/`} type="primary">Add New Campus</Button> 
        </Container>
    );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
    allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
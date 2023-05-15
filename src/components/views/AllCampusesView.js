/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Container } from '../jazzy-ui';

const AllCampusesView = ({ allCampuses }) => {
    // If there is no campus, display a message.
    if (!allCampuses.length) {
        return <div>There are no campuses.</div>;
    }

    // If there is at least one campus, render All Campuses view 
    return (
        <Container>
            <h1>All Campuses</h1>

            <ul className="grid">
                {allCampuses.map((campus) => (
                    <li key={campus.id}>

                        {
                            campus.imageUrl !== null &&
                            <img src={campus.imageUrl} alt={campus.name} />
                        }

                        <Link to={`/campus/${campus.id}`}>
                            <h2>{campus.name}</h2>
                        </Link>
                        <p>{campus.address}</p>
                        <p>{campus.description}</p>
                        <Button link={`/campus/${campus.id}`} type="secondary">View Campus</Button>

                        {
                            campus.students.length > 0 &&
                            <div>
                                <h3>Students</h3>
                                <ul>
                                    {campus.students.map((student) => (
                                        <li key={student.id}>
                                            <Link to={`/student/${student.id}`}>
                                                <h4>{student.firstname} {student.lastname}</h4>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        }
                    </li>
                ))}
            </ul>
            <Button link={`/`} type="primary">Add New Campus</Button>
        </Container>
    );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
    allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
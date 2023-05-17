/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Button, Container, Avatar } from '../jazzy-ui';
import { Link } from "react-router-dom";

const AllCampusesView = ({ campuses }) => {
    // If there is no campus, display a message.
    if (!campuses.length) {
        return (
            <Container>
                <h1 className="heading-2">All Campuses <span className="count">({campuses.length})</span></h1>
                <p>There are no campuses.</p>
                <Button link={`/newcampus`} type="primary">Add New Campus</Button>
            </Container>
        );
    }

    // If there is at least one campus, render All Campuses view 
    return (
        <Container>
            <h1 className="heading-2">All Campuses <span className="count">({campuses.length})</span></h1>
            <ul className="grid campus-list">
                {campuses.map((campus) => {
                    // Undefined check
                    if (campus.id === undefined) {
                        return null;
                    }
                    if (campus.students === undefined) {
                        campus.students = [];
                    }

                    let Image = null;
                    if (campus.imageUrl !== '') {
                        Image = (
                            <Link to={`/campus/${campus.id}`} className="image-wrapper">
                                <img src={campus.imageUrl} alt={campus.name} />
                            </Link>
                        );
                    }
                    return (
                        <li key={campus.id} className="campus-item">
                            {Image}
                            <Link to={`/campus/${campus.id}`}>
                                <h3 className="heading-5">{campus.name}</h3>
                            </Link>
                            <p className="address">{campus.address}</p>
                            {
                                campus.description &&
                                <p className="description">{campus.description}</p>
                            }
                            {
                                campus.students.length > 0 &&
                                <aside className="flex students-preview">
                                    <ul className="flex">
                                        {campus.students.map((student) => {
                                            return (
                                                <li className="student-profile" key={student.id}>
                                                    <Avatar student={student} />
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <p>{campus.students.length} students</p>
                                </aside>
                            }

                            <div className="actions flex">
                                <Button link={`/campus/${campus.id}`} type="primary">View Campus</Button>
                                <Button link={`/campus/${campus.id}/edit`} type="secondary" class="edit">Edit</Button>
                                <Button link={`/campus/${campus.id}/delete`} type="secondary" class="delete">Delete</Button>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <Button link={`/`} type="primary">Add New Campus</Button>
        </Container>
    );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
    campuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
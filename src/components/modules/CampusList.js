import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from '../jazzy-ui';

const CampusList = ({ campuses }) => {
    if (!campuses || !campuses.length) {
        return (
            <div>There are no campuses.</div>
        );
    }
    return (
        <ul className="grid campus-list">
            {campuses.map((campus) => {
                let Image = null;
                if (campus.imageUrl !== null) {
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
                        <p className="description">{campus.description}</p>

                        <p>{campus.students.length} students</p>
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

                        <Button link={`/campus/${campus.id}`} type="secondary">View Campus</Button>
                    </li>
                );
            })}
        </ul>
    );
};

// Validate data type of the props passed to component.
CampusList.propTypes = {
    campuses: PropTypes.array.isRequired,
};

export default CampusList;
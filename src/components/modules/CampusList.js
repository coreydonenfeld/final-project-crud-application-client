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
        <ul className="grid">
            {campuses.map((campus) => {
                let Image = null;
                if (campus.imageUrl !== null) {
                    Image = <img src={campus.imageUrl} alt={campus.name} />;
                }
                return (
                    <li key={campus.id}>
                        {Image}
                        <Link to={`/campus/${campus.id}`}>
                            <h3 className="heading-5">{campus.name}</h3>
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
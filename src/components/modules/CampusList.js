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
                        {
                            campus.students.length > 0 &&
                            <aside className="flex students-preview">
                                <ul className="flex">
                                    {campus.students.map((student) => {
                                        let Profile = <h4>{student.firstname.charAt(0)}{student.lastname.charAt(0)}</h4>;
                                        if (student.imageUrl) {
                                            Profile = <img src={student.imageUrl} alt={`${student.firstname} ${student.lastname}`} />;
                                        }

                                        // random dark hex color full opacity
                                        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);


                                        return (
                                            <li key={student.id}>
                                                <Link className="avatar" to={`/student/${student.id}`} style={{ backgroundColor: randomColor }}>
                                                    {Profile}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <p>{campus.students.length} students</p>
                            </aside>
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
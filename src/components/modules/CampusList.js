import { Link } from "react-router-dom";
import { Button } from '../jazzy-ui';
import { getRandomColors } from '../../utils';

const CampusList = ({ campuses }) => {
    if (!campuses || campuses.length === 0) {
        return (
            <div>There are no campuses.</div>
        );
    }
    return (
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
                                        const [ avatarBackground, avatarColor ] = student.avatarColors;
                                        
                                        let Profile = <p>{student.firstname.charAt(0)}{student.lastname.charAt(0)}</p>;
                                        if (student.imageUrl) {
                                            Profile = <img src={student.imageUrl} alt={`${student.firstname} ${student.lastname}`} />;
                                        }

                                        return (
                                            <li className="student-profile" key={student.id}>
                                                <Link to={`/student/${student.id}`}>
                                                    <div className="avatar" style={{ backgroundColor: avatarBackground, color: avatarColor }}>
                                                        {Profile}
                                                    </div>
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

export default CampusList;
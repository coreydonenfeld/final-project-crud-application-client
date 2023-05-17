/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import { Container, Button } from "../jazzy-ui";
import { getRandomColors } from '../../utils';

// Take in props data to construct the component
const CampusView = (props) => {
    const { campus } = props;

    let Image = null;
    if (campus.imageUrl !== null) {
        Image = (
            <div className="image-wrapper">
                <img src={campus.imageUrl} alt={campus.name} />
            </div>
        );
    }

    // Render a single Campus view with list of its students
    return (
        <>
            <Container grid>
                <div className="content-wrapper">
                    <h1 className="heading-xl">{campus.name}</h1>
                    <p className="medium large">{campus.address}</p>
                    <p className="large">{campus.description}</p>
                </div>
                {Image}
            </Container>
            <Container>
                <aside className="students-list">
                    <h2>Students <span className="count">({campus.students.length})</span></h2>
                    {
                        campus.students.length === 0 &&
                        <p>There are no students enrolled in this campus.</p>
                    }
                    <ul className="grid">
                        {campus.students.map((student) => {
                            let Profile = <p>{student.firstname.charAt(0)}{student.lastname.charAt(0)}</p>;
                            if (student.imageUrl) {
                                Profile = <img src={student.imageUrl} alt={`${student.firstname} ${student.lastname}`} />;
                            }
                            let name = student.firstname + " " + student.lastname;

                            const [randomBackgroundColor, randomTextColor] = getRandomColors();

                            return (
                                <li className="student-profile" key={student.id}>
                                    <Link to={`/student/${student.id}`}>
                                        <div className="avatar" style={{ backgroundColor: randomBackgroundColor, color: randomTextColor }}>
                                            {Profile}
                                        </div>
                                        <p>{name}</p>
                                    </Link>
                                    <p className="email">{student.email}</p>
                                    {
                                        student.gpa > 0 &&
                                        <p className="gpa">{student.gpa} GPA</p>
                                    }
                                    <div className="actions flex">
                                        <Button link={`/student/${student.id}`} type="primary">View Student</Button>
                                        <Button link={`/student/${student.id}/edit`} type="secondary" class="edit">Edit</Button>
                                        <Button link={`/student/${student.id}/delete`} type="secondary" class="delete">Delete</Button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="add-new-student flex">
                        <p>Want to add a new student to {campus.name}?</p>
                        <Button link={`/newstudent/?campusId=${campus.id}&campusName=${campus.name}`} type="secondary">Add New Student</Button>
                    </div>
                </aside>
            </Container>
            <div className="actions quick-actions-campus flex">
                <p className="heading-4">Quick Actions</p>
                <Button link="/campuses" type="secondary go-back">Back to Campuses</Button>
                <Button link={`/campus/${campus.id}/edit`} type="secondary edit">Edit Campus</Button>
                <Button link={`/campus/${campus.id}/delete`} type="secondary delete">Delete</Button>
            </div>
        </>
    );
};

export default CampusView;
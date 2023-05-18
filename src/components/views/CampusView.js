/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Container, Button, Avatar } from "../jazzy-ui";

// Take in props data to construct the component
const CampusView = (props) => {
    const { campus, deleteCampus } = props;

    let Image = null;
    if (campus.imageUrl !== '') {
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
                <div className={"content-wrapper" + (campus.imageUrl === '' ? ' full' : '')}>
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
                            return (
                                <li className="student-profile" key={student.id}>
                                    <Avatar student={student} includeName nameHeadingLevel="6" />
                                    <p className="email medium">{student.email}</p>
                                    {
                                        student.gpa > 0 &&
                                        <p className="gpa">{student.gpa} GPA</p>
                                    }
                                    <div className="actions flex">
                                        <Button link={`/student/${student.id}`} type="primary">View Student</Button>
                                        <Button link={`/student/${student.id}/edit`} type="secondary" class="edit">Edit</Button>
                                        <Button link={`/student/${student.id}/delete?name=${student.firstname}&referrer=/campus/${campus.id}`} type="secondary" class="delete">Delete</Button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="add-new-student flex">
                        <p>Want to add a new student to {campus.name}?</p>
                        <Button link={`/newstudent/?campusId=${campus.id}`} type="secondary">Add New Student</Button>
                    </div>
                </aside>
            </Container>
            <div className="actions quick-actions-nav flex">
                <p className="heading-4">Quick Actions</p>
                <Button link="/campuses" type="secondary go-back">Back to Campuses</Button>
                <Button link={`/campus/${campus.id}/edit`} type="secondary edit">Edit Campus</Button>
                <button className="btn secondary delete" onClick={() => deleteCampus(campus.id, campus.name)}>Delete</button>
            </div>
        </>
    );
};

export default CampusView;
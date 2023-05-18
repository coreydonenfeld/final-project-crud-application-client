/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Container, Button, Avatar } from "../jazzy-ui";
const StudentView = (props) => {
    const { student, deleteStudent } = props;

    if (student === null || student === undefined || typeof student.id === "undefined") {
        return (
            <Container>
                <p>Student not found.</p>
                <Button link="/students" type="secondary">Back to Students</Button>
            </Container>
        );
    }

    // Render a single Student view 
    return (
        <>
            <Container variant="student" grid>
                <div className="content-wrapper">
                    <Avatar student={student} variant="xlarge" />
                    <h1 className="heading-xl">{student.firstname + " " + student.lastname}</h1>
                    <p className="medium large">{student.email}</p>
                    <p className="large">{student.gpa} GPA</p>
                </div>
                <aside>
                    <p className="heading-4">Attending</p>
                    {
                        student.campus === null &&
                        <p className="heading-5">Not Enrolled</p>
                    }
                    {
                        student.campus !== null &&
                        <>
                        <p className="heading-5">{student.campus.name}</p>
                        <p className="medium">{student.campus.address}</p>
                        <Button link={`/campus/${student.campus.id}`} type="primary">View Campus</Button>
                        </>
                    }
                </aside>
            </Container>
            <div className="actions quick-actions-nav flex">
                <p className="heading-4">Quick Actions</p>
                <Button link="/students" type="secondary go-back">Back to Students</Button>
                <Button link={`/student/${student.id}/edit`} type="secondary edit">Edit Student</Button>
                <button className="btn secondary delete" onClick={() => deleteStudent(student.id, student.firstname)}>Delete</button>
            </div>
        </>
    );

};

export default StudentView;
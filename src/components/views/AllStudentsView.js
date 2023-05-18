/*==================================================
AllStudentsView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */
import { Button, Container, Avatar } from '../jazzy-ui';

const AllStudentsView = ({ students }) => {
    // If there is no student, display a message
    if (!students.length) {
        return (
            <Container variant="all-students none">
                <h1 className="heading-2">All Students <span className="count">({students.length})</span></h1>
                <p>There are no students.</p>
                <Button link={`/newstudent`} type="primary">Add New Student</Button>
            </Container>
        );
    }

    // If there is at least one student, render All Students view 
    return (
        <Container variant="all-students">
            <h1 className="heading-2">All Students <span className="count">({students.length})</span></h1>
            <ul className="grid">
            {students.map((student) => {
                return (
                    <li className="student-profile large grid" key={student.id}>
                        <Avatar student={student} includeName variant="large" nameHeadingLevel="6" />
                        <p className="email">{student.email}</p>
                        <div className="campus">
                            {
                                student.gpa > 0 &&
                                <p className="gpa">{student.gpa} GPA</p>
                            }
                            {
                                student.campus &&
                                <Button link={`/campus/${student.campus.id}`} type="secondary">{student.campus.name}</Button>
                            }
                        </div>
                        <div className="actions flex">
                            <Button link={`/student/${student.id}`} type="primary">View Student</Button>
                            <Button link={`/student/${student.id}/edit`} type="secondary" class="edit">Edit</Button>
                            <Button link={`/student/${student.id}/delete?name=${student.firstname}&referrer=/students`} type="secondary" class="delete">Delete</Button>
                        </div>
                    </li>
                );
            })}
            </ul>
            <Button link={`/newstudent`} type="primary">Add New Student</Button>
        </Container>
    );
};


export default AllStudentsView;
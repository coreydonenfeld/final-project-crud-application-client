/*==================================================
AllStudentsView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */
import { Button, Container } from '../jazzy-ui';
import { getRandomColors } from '../../utils';

const AllStudentsView = (props) => {
    const { students, deleteStudent } = props;
    // If there is no student, display a message
    if (!students.length) {
        return (
            <Container>
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
                const [ avatarBackground, avatarColor ] = student.avatarColors;
                const studentName = student.firstname + " " + student.lastname;
                let Profile = <p>{student.firstname.charAt(0)}{student.lastname.charAt(0)}</p>;
                if (student.imageUrl) {
                    Profile = <img src={student.imageUrl} alt={`${student.firstname} ${student.lastname}`} />;
                }

                return (
                    <li className="student-profile large grid" key={student.id}>
                        <Button link={`/student/${student.id}`}>
                            <div className="avatar" style={{ backgroundColor: avatarBackground, color: avatarColor }}>
                                {Profile}
                            </div>
                            <p className="heading-5">{studentName}</p>
                        </Button>
                        <p className="email">{student.email}</p>
                        <div className="campus">
                        {
                            student.campus &&
                            <Button link={`/campus/${student.campus.id}`} type="secondary">{student.campus.name}</Button>
                        }
                        {
                            student.gpa > 0 &&
                            <p className="gpa">{student.gpa} GPA</p>
                        }
                        </div>
                        <div className="actions flex">
                            <Button link={`/student/${student.id}`} type="primary">View Student</Button>
                            <Button link={`/student/${student.id}/edit`} type="secondary" class="edit">Edit</Button>
                            <button onClick={() => deleteStudent(student.id)} type="button" className="btn secondary delete">Delete</button>
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
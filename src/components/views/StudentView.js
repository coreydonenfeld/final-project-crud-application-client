/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Container } from "../jazzy-ui";
const StudentView = (props) => {
    const { student } = props;

    // Render a single Student view 
    return (
        <Container>
            <h1>{student.firstname + " " + student.lastname}</h1>
            <h3>{student.campus.name}</h3>
        </Container>
    );

};

export default StudentView;
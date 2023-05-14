/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import { Container } from '../jazzyui';

const NewStudentView = (props) => {
    const { handleChange, handleSubmit } = props;

    // Render a New Student view with an input form
    return (
        <Container>
            <h1>New Student</h1>

            <h2>
                Add a Student
            </h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <label>First Name: </label>
                    <input type="text" name="firstname" onChange={(e) => handleChange(e)} />
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastname" onChange={(e) => handleChange(e)} />
                </div>

                <div className="form-group">
                    <label>Campus Id</label>
                    <input type="text" name="campusId" onChange={(e) => handleChange(e)} />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" onChange={(e) => handleChange(e)} />
                </div>

                <button type="submit" className="btn primary">Submit</button>

                {/* <Jazzy.Button type="primary" form="submit">
                    Submit
                </Jazzy.Button> */}
            </form>
        </Container>
    )
}

export default NewStudentView;
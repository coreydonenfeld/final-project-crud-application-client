/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import * as Jazzy from '../jazzyui';

const NewStudentView = (props) => {
    const { handleChange, handleSubmit } = props;

    // Render a New Student view with an input form
    return (
        <div>
            <h1>New Student</h1>

            <div>
                <div>
                    <div>
                        Add a Student
                    </div>
                    <form style={{ textAlign: 'center' }} onSubmit={(e) => handleSubmit(e)}>
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
                </div>
            </div>
        </div>
    )
}

export default NewStudentView;
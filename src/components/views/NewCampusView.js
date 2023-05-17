/*==================================================
NewCampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new campus page.
================================================== */
import { Button, Container } from '../jazzy-ui';

function NewCampusView(props) {
    const { handleChange, handleSubmit } = props;

    // Render a New Campus view with an input form
    return (
        <Container grid>
            <h1 className="heading-2">Add Campus</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="grid main-form add-campus">
                <div id="error-notices"></div>

                <div className="form-input-wrapper">
                    <label>Name <span className="required">(required)</span></label>
                    <input type="text" name="name" onChange={(e) => handleChange(e)} />
                </div>

                <div className="form-input-wrapper">
                    <label>Address <span className="required">(required)</span></label>
                    <input type="text" name="address" onChange={(e) => handleChange(e)} />
                </div>

                <div className="form-input-wrapper">
                    <label>Description</label>
                    <textarea name="description" onChange={(e) => handleChange(e)}></textarea>
                </div>

                <div className="form-input-wrapper">
                    <label>Image URL</label>
                    <input type="url" name="imageUrl" onChange={(e) => handleChange(e)} />
                </div>

                <Button role="submit" type="primary">Add New Campus</Button>
            </form>
        </Container>
    );
}

export default NewCampusView;
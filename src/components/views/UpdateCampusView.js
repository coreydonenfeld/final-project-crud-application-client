/*==================================================
UpdateCampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new/edit campus page.
================================================== */
import { Button, Container } from '../jazzy-ui';

function UpdateCampusView(props) {
    const { handleChange, handleSubmit } = props;
    const { campusName, address, description, imageUrl } = props;
    const { formTitle, submitButtonText } = props;

    // Render a New Student view with an input form
    return (
        <Container grid>
            <h1 className="heading-2">{formTitle}</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="grid main-form add-student">
                <div id="error-notices"></div>

                <div className="form-input-wrapper">
                    <label>Name <span className="required">(required)</span></label>
                    <input type="text" name="name" value={campusName} onChange={(e) => handleChange(e)} />
                </div>

                <div className="form-input-wrapper">
                    <label>Address <span className="required">(required)</span></label>
                    <input type="text" name="address" value={address} onChange={(e) => handleChange(e)} />
                </div>

                <div className="form-input-wrapper">
                    <label>Description</label>
                    <textarea name="description" value={description} onChange={(e) => handleChange(e)}></textarea>
                </div>

                <div className="form-input-wrapper">
                    <label>Image URL</label>
                    <input type="url" name="imageUrl" value={imageUrl} onChange={(e) => handleChange(e)} />
                </div>

                <Button role="submit" type="primary">{submitButtonText}</Button>
            </form>
        </Container>
    );
}

export default UpdateCampusView;
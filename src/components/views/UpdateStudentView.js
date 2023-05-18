/*==================================================
UpdateStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new/edit student page.
================================================== */
import { Button, Container } from '../jazzy-ui';
import Select from 'react-select';

const SelectStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        borderColor: state.isFocused ? 'black' : 'var(--medium-gray)',
        '&:hover': { borderColor: 'black' },
        borderRadius: '0px',
        padding: '4px 12px',
        font: '400 calc(16rem / 16)/calc(18 / 16) var(--body-font)',
        outline: 'none',
        boxShadow: 'none',
        minHeight: '0px',
    }),
    valueContainer: (baseStyles, state) => ({
        ...baseStyles,
        padding: '4px 0',
    }),
    input: (baseStyles, state) => ({
        ...baseStyles,
        margin: '0',
        color: 'black',
    }),
    singleValue: (baseStyles, state) => ({
        ...baseStyles,
        color: 'black',
    }),
    option: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: state.isFocused ? 'var(--gray)' : 'white',
        color: state.isFocused ? 'var(--black)' : 'var(--black)',
        '&:hover': { backgroundColor: 'var(--dark-gray)', color: 'var(--white)' },
        cursor: 'pointer',
    }),
    indicatorSeparator: (baseStyles, state) => ({
        ...baseStyles,
        display: 'none',
    }),
    dropdownIndicator: (baseStyles, state) => ({
        ...baseStyles,
        padding: '0',
    }),
    menu: (baseStyles, state) => ({
        ...baseStyles,
        marginTop: '0',
        borderRadius: '0',
        backgroundColor: 'var(--white)',
        border: '1px solid var(--medium-gray)',
        borderTop: 'none',
        boxShadow: 'none',
    }),
    menuList: (baseStyles, state) => ({
        ...baseStyles,
        padding: '0',
        borderRadius: '0',
        border: 'none',
    }),
};

function UpdateStudentView(props) {
    const { handleChange, handleSelectChange, handleSubmit, student, campuses } = props;
    const { campusId, firstname, lastname, email, gpa, imageUrl } = props;
    const { formTitle, submitButtonText } = props;

    let selectedCampus = null;
    let campusesOptions = campuses.map((campus) => {
        return {
            value: campus.id,
            label: campus.name,
        };
    });

    // find campus that matches campusId
    if (campusId && !isNaN(campusId)) {
        selectedCampus = campusesOptions.find((campus) => {
            return campus.value === campusId;
        });
    } else {
        if (typeof student === 'object' && student.campus !== null) {
            selectedCampus = {
                value: student.campus.id,
                label: student.campus.name,
            }
        }
    }

    // no campus selected    
    if (selectedCampus === undefined || (selectedCampus !== null && selectedCampus.value === undefined)) {
        selectedCampus = null;
    }

    // Render a New Student view with an input form
    return (
        <Container grid>
            <h1 className="heading-2">{formTitle}</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="grid main-form add-student">
                <div id="error-notices"></div>

                <div className="form-input-wrapper">
                    <label>First Name <span className="required">(required)</span></label>
                    <input type="text" name="firstname" value={firstname} onChange={(e) => handleChange(e)} />
                </div>

                <div className="form-input-wrapper">
                    <label>Last Name <span className="required">(required)</span></label>
                    <input type="text" name="lastname" value={lastname} onChange={(e) => handleChange(e)} />
                </div>

                <div className="form-input-wrapper">
                    <label>Campus <span className="required">(required)</span></label>
                    <Select
                        name="campusId"
                        options={campusesOptions}
                        onChange={(e) => handleSelectChange(e, 'campusId')}
                        placeholder="Select a campus"
                        value={selectedCampus}
                        styles={SelectStyles}
                    />
                </div>

                <div className="form-input-wrapper">
                    <label>Email <span className="required">(required)</span></label>
                    <input type="email" name="email" value={email} onChange={(e) => handleChange(e)} />
                </div>

                <div className="form-input-wrapper">
                    <label>GPA</label>
                    <input type="number" min="0" max="4" step=".1" name="gpa" value={gpa} onChange={(e) => handleChange(e)} />
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

export default UpdateStudentView;
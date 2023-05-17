/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import { Button, Container } from '../jazzy-ui';
import AsyncSelect from 'react-select/async';

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

function NewStudentView(props) {
    const { handleChange, handleSelectChange, handleSubmit, getCampusesForSelect } = props;

    // Render a New Student view with an input form
    return (
        <Container grid>
            <h1 className="heading-2">Add Student</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="grid add-student">
                <div className="form-input-wrapper">
                    <label>First Name</label>
                    <input type="text" name="firstname" required onChange={(e) => handleChange(e)} />
                </div>

                <div className="form-input-wrapper">
                    <label>Last Name</label>
                    <input type="text" name="lastname" required onChange={(e) => handleChange(e)} />
                </div>

                <div className="form-input-wrapper">
                    <label>Campus</label>
                    <AsyncSelect
                        name="campusId"
                        cacheOptions
                        defaultOptions
                        required={true}
                        loadOptions={getCampusesForSelect}
                        onChange={(e) => handleSelectChange(e, 'campusId')}
                        placeholder="Select a campus"
                        styles={SelectStyles}
                    />
                </div>

                <div className="form-input-wrapper">
                    <label>Email</label>
                    <input type="email" name="email"  onChange={(e) => handleChange(e)} />
                </div>

                <div className="form-input-wrapper">
                    <label>GPA</label>
                    <input type="number" min="0" max="4" step=".1" name="gpa" onChange={(e) => handleChange(e)} />
                </div>

                <div className="form-input-wrapper">
                    <label>Image URL</label>
                    <input type="url" name="imageUrl" onChange={(e) => handleChange(e)} />
                </div>

                <Button role="submit" type="primary">Submit</Button>
            </form>
        </Container>
    );
}

export default NewStudentView;
import { Component } from "react";
import { Button } from './index';

class Avatar extends Component {
    // Initialize state
    constructor(props) {
        super(props);
        this.state = {
            student: props.student,
            includeName: props.includeName || false,
            nameHeadingLevel: props.nameHeadingLevel || "",
            variant: props.variant || "",
        };
    }
    
    render() {
        const { student, includeName, variant } = this.state;
        const [ avatarBackground, avatarColor ] = student.avatarColors;
        const studentName = student.firstname + " " + student.lastname;
        
        let Profile = <p>{student.firstname.charAt(0)}{student.lastname.charAt(0)}</p>;
        if (student.imageUrl) {
            Profile = <img src={student.imageUrl} alt={`${student.firstname} ${student.lastname}`} />;
        }

        let nameHeadingLevel = "";
        if (this.state.nameHeadingLevel !== "") {
            nameHeadingLevel = "heading-" + this.state.nameHeadingLevel;
        }

        if (!student) {
            return null;
        }

        return (
            <Button link={`/student/${student.id}`} type={`student-avatar ${variant}`}>
                <div className="avatar" style={{ backgroundColor: avatarBackground, color: avatarColor }}>
                    {Profile}
                </div>
                {
                    includeName &&
                    <p className={nameHeadingLevel}>{studentName}</p>
                }
            </Button>
        )
    }
}

export default Avatar;
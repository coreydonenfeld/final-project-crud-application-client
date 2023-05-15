/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import { Container } from "../jazzy-ui";
import { getRandomColors } from '../../utils';

// Take in props data to construct the component
const CampusView = (props) => {
    const { campus } = props;

    let Image = null;
    if (campus.imageUrl !== null) {
        Image = (
            <Link to={`/campus/${campus.id}`} className="image-wrapper">
                <img src={campus.imageUrl} alt={campus.name} />
            </Link>
        );
    }

    // Render a single Campus view with list of its students
    return (
        <Container>
            {Image}
            
            <h1 class="heading-xl">{campus.name}</h1>
            <p>{campus.address}</p>
            <p>{campus.description}</p>
            {campus.students.map(student => {
                let name = student.firstname + " " + student.lastname;
                return (
                    <div key={student.id}>
                        <Link to={`/student/${student.id}`}>
                            <h2>{name}</h2>
                        </Link>
                    </div>
                );
            })}

            {
            campus.students.length > 0 &&
            <aside className="flex students-preview">
                <ul className="flex">
                    {campus.students.map((student) => {
                        let Profile = <h4>{student.firstname.charAt(0)}{student.lastname.charAt(0)}</h4>;
                        if (student.imageUrl) {
                            Profile = <img src={student.imageUrl} alt={`${student.firstname} ${student.lastname}`} />;
                        }

                        const [ randomBackgroundColor, randomTextColor ] = getRandomColors();

                        return (
                            <li key={student.id}>
                                <Link className="avatar" to={`/student/${student.id}`} style={{ backgroundColor: randomBackgroundColor, color: randomTextColor }}>
                                    {Profile}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <p>{campus.students.length} students</p>
            </aside>
            }
        </Container>
    );
};

export default CampusView;
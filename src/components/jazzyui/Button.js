import { Component } from "react";
import { Link } from 'react-router-dom';

class Button extends Component {
    // Initialize state
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            link: "",
            class: ""
        };
    }

    render() {
        let title = this.props.title || this.props.text;
        let classes = "btn";
        if (this.props.type) {
            classes += " " + this.props.type;
        }
        if (this.props.class) {
            classes += " " + this.props.class;
        }
        return (
            <Link to={this.props.link} className={classes}>{title}</Link>
        );
    }
}

export default Button;
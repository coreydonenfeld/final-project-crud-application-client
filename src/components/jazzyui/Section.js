import { Component } from "react";
import { Container } from './index';

class Section extends Component {
    render() {
        return (
            <section className="section">
                <Container>
                    {this.props.children}
                </Container>
            </section>
        )
    }
}

export default Section;
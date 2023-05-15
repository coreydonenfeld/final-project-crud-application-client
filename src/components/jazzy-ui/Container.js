import { Component } from "react";

class Container extends Component {
    render() {
        const { children, flex, variant } = this.props;
        let className = flex ? "container flex" : "container";
        className += variant ? ` ${variant}` : "";
        return (
            <div className={className}>
                {children}
            </div>
        )
    }
}

export default Container;
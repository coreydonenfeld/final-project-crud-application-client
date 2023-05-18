/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import { Container, Button } from "../jazzy-ui";

const HomePageView = () => {
    // Render Home page view
    return (
        <Container variant="home">
            <h1>Welcome to Campus Learning Labs!</h1>
            <p>You can view all campuses and students.</p>
            <div class="actions flex">
                <Button link="/campuses" type="primary">View Campuses</Button>
                <Button link="/students" type="primary">View Students</Button>
            </div>
        </Container>
    );
}

export default HomePageView;
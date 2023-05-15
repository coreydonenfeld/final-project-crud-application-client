/*==================================================
HomePageContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import HomePageView from '../views/HomePageView';
import { Main } from '../jazzy-ui';

// Render Home page view by the corresponding View component
const HomePageContainer = () => {
    return (
        <div>
            <Header />
            <main>
                <HomePageView />
            </main>
        </div>

    );
};

export default HomePageContainer;
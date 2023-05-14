/*==================================================
Header.js

It contains the Header component to be displayed on every page.
The header contains navigation links to every other page.
================================================== */
import { Container, Button } from '../jazzyui';

// Header component, displayed on every page
// Links to every other page
const Header = () => {
    const navigationItems = [
        {
            text: 'Home',
            link: '/'
        },
        {
            text: 'Campuses',
            link: '/campuses'
        },
        {
            text: 'Students',
            link: '/students'
        }
    ];

    return (
        <header>
            <Container>
                <ul className="flex">
                    {navigationItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <Button type="nav" text={item.text} link={item.link} />
                            </li>
                        );
                    })}
                </ul>
            </Container>
        </header>
    );
}

export default Header;

/*==================================================
Header.js

It contains the Header component to be displayed on every page.
The header contains navigation links to every other page.
================================================== */
import { Container, Button } from '../jazzy-ui';

// Header component, displayed on every page
// Links to every other page
const Header = () => {
    const navigationItems = [
        {
            text: 'Home',
            link: '/',
            type: 'nav'
        },
        {
            text: 'Campuses',
            link: '/campuses',
            type: 'nav'
        },
        {
            text: 'Students',
            link: '/students',
            type: 'nav'
        },
        {
            text: 'Add Campus',
            link: '/newcampus',
            type: 'secondary'
        },
        {
            text: 'Add Student',
            link: '/newstudent',
            type: 'secondary'
        }
    ];

    return (
        <header>
            <Container flex variant="unbounded">
                <Button link="/">Campus Learning Labs</Button>
                <nav>
                    <ul className="flex">
                        {navigationItems.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Button type={item.type} text={item.text} link={item.link} />
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;

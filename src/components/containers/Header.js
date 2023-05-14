/*==================================================
Header.js

It contains the Header component to be displayed on every page.
The header contains navigation links to every other page.
================================================== */
import * as Jazzy from '../jazzyui';

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
            <Jazzy.Container>
                <ul className="flex">
                    {navigationItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <Jazzy.Button type="nav" text={item.text} link={item.link} />
                            </li>
                        );
                    })}
                </ul>
            </Jazzy.Container>
        </header>
    );
}

export default Header;

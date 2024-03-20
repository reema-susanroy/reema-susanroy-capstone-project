import { Link } from "react-router-dom";
import { useState } from "react";
import './Header.scss';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <header>
            <nav className='navbar'>
                <div className='navbar__logo'>
                    <Link to="/">
                        <img className='navbar__logo--image' alt='logo' />
                    </Link>
                </div>
                <div className='navbar__side-container'>
                    <h2 className='navbar__welcome'> Welcome User</h2>
                    <ul className="navbar__menu">
                        <li className="navbar__menu--item">
                            <Link to="/home" className="navbar__menu--link">Home</Link>
                        </li>
                        <li className="navbar__menu--item">
                            <Link to="/about" className="navbar__menu--link">About</Link>
                        </li>
                    </ul>
                    <div className='navbar__dropdown'>
                        <div className="navbar__dropdown--hamburger" onClick={toggleMenu}>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                        <ul className={`navbar__dropdown--links ${isMenuOpen ? 'open' : ''}`}>
                        <li className="navbar-item">
                            <Link to="/home" className="navbar__dropdown--link">Option 1</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/about" className="navbar__dropdown--link">Option 2</Link>
                        </li>
                    </ul>

                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
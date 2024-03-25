import { Link } from "react-router-dom";
import { useState } from "react";
import './Header.scss';
import logo from '../../assets/images/slogan.png';
import { NavLink } from "react-router-dom";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <header>
            <nav className='navbar'>
                <div className='navbar__logo'>
                    <NavLink  to="/">
                        <div className="navbar__logo--cont">
                        <img className='navbar__logo--image' src={logo} alt='logo' />
                        </div>
                    </NavLink >
                </div>
                <div className='navbar__side-container'>
                    <h2 className='navbar__welcome'> Welcome User</h2>
                    <ul className="navbar__menu">
                        <li className="navbar__menu--item">
                            <NavLink  to="/home" className="navbar__menu--link" activeClassName="active">Home</NavLink >
                        </li>
                        <li className="navbar__menu--item">
                            <NavLink  to="/about" className="navbar__menu--link" activeClassName="active">About</NavLink >
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
                            <NavLink  to="/home" className="navbar__dropdown--link">Option 1</NavLink >
                        </li>
                        <li className="navbar-item">
                            <NavLink  to="/about" className="navbar__dropdown--link">Option 2</NavLink >
                        </li>
                    </ul>

                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
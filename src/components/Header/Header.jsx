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
                    <NavLink  to="/services">
                        <div className="navbar__logo--cont">
                        <img className='navbar__logo--image' src={logo} alt='logo' />
                        </div>
                    </NavLink >
                </div>
                <div className='navbar__side-container'>
                    <h2 className='navbar__welcome'> Login</h2>
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
                        <li className="navbar__dropdown--links--list dashboard">
                            <NavLink  to="/dashboard" onClick={toggleMenu} className="navbar__dropdown--links--item">My Dashboard</NavLink >
                        </li>
                        <li className="navbar__dropdown--links--list providers">
                            <NavLink  to="/providers" onClick={toggleMenu} className="navbar__dropdown--links--item">See all Professionals</NavLink >
                        </li>
                    </ul>

                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
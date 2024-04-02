import { useState, useEffect } from "react";
import './Header.scss';
import logo from '../../assets/images/slogan.png';
import { NavLink, useNavigate } from "react-router-dom";
import LoginPopUp from "../LoginPopUp/LoginPopUp";
import { useAuth } from '../../utils/AuthContext';

function Header() {
    let { isLoggedIn, logout } = useAuth(); //to store the login status
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userId, setUserId] = useState();
    const [loggedIn, setLoggedIn] = useState(true);
    const [loggedOut, setLoggedOut] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    useEffect(() => {
        const storedUserId = sessionStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
            setLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        setLoggedIn(false);
    }
    const handleLogout = () => {
        sessionStorage.clear();
        setUserId(null);
        setLoggedOut(true);
        logout();
        setTimeout(() => {
            setLoggedOut(false);
            navigate('/');
        }, 3000)
    }
    const closePopup = () => {
        setLoggedIn(true)
    }
    return (
        <>
            <header>
                <nav className='navbar'>
                    <div className='navbar__logo'>
                        <div className="navbar__logo--cont">
                            <NavLink to="/">
                                <img className='navbar__logo--image' src={logo} alt='logo' />
                            </NavLink >
                        </div>
                    </div>
                    <div className='navbar__side-container'>
                        {!isLoggedIn ? (<h2 onClick={handleLogin} className='navbar__welcome'> Login</h2>) :
                            (<h2 onClick={handleLogout} className='navbar__welcome'> Logout</h2>)
                        }
                        {isLoggedIn &&
                            <div className='navbar__dropdown'>
                                <div className="navbar__dropdown--hamburger" onClick={toggleMenu}>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                </div>
                                <ul className={`navbar__dropdown--links ${isMenuOpen ? 'open' : ''}`}>
                                    <li className="navbar__dropdown--links--list dashboard">
                                        <NavLink to="/dashboard" onClick={toggleMenu} className="navbar__dropdown--links--item">My Dashboard</NavLink >
                                    </li>
                                    {/* <li className="navbar__dropdown--links--list providers">
                                        <NavLink to="/providers" onClick={toggleMenu} className="navbar__dropdown--links--item">See all Professionals (coming)</NavLink >
                                    </li> */}
                                </ul>
                            </div>
                        }
                    </div>
                </nav>
            </header>
            {!loggedIn &&
                <section className='login--popup'>
                    <LoginPopUp onClose={closePopup} />
                </section>
            }
            {loggedOut &&
                <section className='login--popup'>
                    <div className="popup--modal">
                        <h3 className="popup--modal__title">Logged Out Successfully !</h3>
                        <h3 className="popup--modal__title"> Navigating to home page!</h3>
                    </div>
                </section>
            }
        </>
    )
}

export default Header;
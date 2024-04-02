import { useState } from "react";
import axios from "axios";
import './LoginPopUp.scss';
import { useAuth } from '../../utils/AuthContext';

function LoginPopUp({ provider, providerId, onClose }) {
    const { login } = useAuth();
    const [loginSuccess, setLoginSuccess] = useState(true);
    const [userId, setUserId] = useState('');
    const [toLogin, setToLogin] = useState(true);
    const [registerSuccess, setRegisterSuccess] = useState("");
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [message, setMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleNameChange = (value) => { setName(value); setErrorMessage(""); }
    const handleEmailChange = (value) => { setEmail(value); setErrorMessage(""); }
    const handlePasswordChange = (value) => { setPassword(value); setErrorMessage(""); }
    const handleConfirmPasswordChange = (value) => { setConfirmPassword(value); setErrorMessage(""); }

    const validation = () => {
        if (!name || !email || !password) {
            setErrorMessage("Fields cannot be empty");
            setLoginSuccess(false);
            return false;
        }
        return true;
    }
    const handleFormLogin = async (e) => {
        e.preventDefault();
        const formValidate = validation();
        if (formValidate) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/login`, {
                    user_name: name,
                    contact_email: email,
                    password: password,
                });
                setLoginSuccess(true);
                sessionStorage.setItem('userId', response.data.user.id);
                setUserId(response.data.user.id);
                if (response.data.message && response.data.message.includes("Login Successful")) {
                    setLoginSuccess(true);
                    setSuccessMessage(true);
                    login();
                }
            } catch (error) {
                setErrorMessage("User not found");
                setLoginSuccess(false);
                console.error('Registration failed:', error);
            }
        }
        setName('');
        setEmail('');
        setPassword('');
    };

    const Validate = () => {
        if(!name || !email ||!password || !confirmPassword){
            setErrorMessage("Fields cannot be empty");
            return false;
        }else if (password !== confirmPassword) {
            setErrorMessage("Password mismatch!");
            return false;
        } 
        return true;
    }
    const handleFormRegister = async (e) => {
        e.preventDefault();
        const validation = Validate();
        if (!validation) {
            setPasswordValidation(true);
        } else {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/register`, {
                    user_name: name,
                    contact_email: email,
                    password: password,
                });
                setRegisterSuccess(true);
                if (response.data.message && response.data.message.includes("Registered Successful")) {
                    setMessage("Registered Sussessfully");
                    setTimeout(() => {
                        setToLogin(true);
                    }, 3000)
                }
            } catch (error) {
                setRegisterSuccess(false);
                setMessage(error.response.data.message)
                console.error('Registration failed:', error.response.data.message);
            }
        }
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const handleRegister = () => { setToLogin(false); }
    const handleLogin = () => { setToLogin(true) }
    const closePopup = () => { onClose(); }
    return (
        <>
            {toLogin &&
                <section className='popup--modal'>
                    <button onClick={closePopup} className='modal__button'>X</button>
                    <div className="login-container">
                    <h3 className="login-container__heading">Login</h3>
                        <form onSubmit={handleFormLogin} className='login__form'>
                            
                            <section className='login__form__cont'>
                                <div className='login__form__cont--div'>
                                    <label htmlFor="" className='login__form--label'> Name</label>

                                    <input className='login__form--input' type="text" name="user_name" placeholder='user_name' value={name} onChange={(e) => { handleNameChange(e.target.value); }} />
                                </div>

                                <div className='login__form__cont--div'>
                                    <label htmlFor="" className='login__form--label'> Email</label>
                                    <input className='login__form--input' type="email" name="contact_email" placeholder="email" value={email} onChange={(e) => { handleEmailChange(e.target.value); }} />
                                </div>

                                <div className='login__form__cont--div'>
                                    <label htmlFor="" className='login__form--label'> Password</label>
                                    <input className='login__form--input' type="password" name="password" placeholder="password" value={password} onChange={(e) => { handlePasswordChange(e.target.value); }} />
                                </div>
                                {!loginSuccess &&
                                    (<div> <h3 className="errorMessage">{errorMessage} </h3></div>)
                                }
                            </section>
                            <section className='login__form--button'>
                                <button className='login__form--button--item' type="submit" >Login</button>
                                <p onClick={handleRegister} className="login__form--button--next">Register</p>
                            </section>
                        </form>
                        {(successMessage === true) &&
                            <div className="loginSuccess">
                                <p className="loginSuccess--message">Login Success</p>
                                <button onClick={closePopup} className='loginSuccess--button'>Ok</button>
                            </div>
                        }
                    </div>

                </section>
            }

            {!toLogin &&
                <section className="popup--modal">
                    <p onClick={closePopup} className='modal__button'>X</p>
                    <div className="login-container">
                    <h3 className="login-container__heading">Register</h3>
                        <form onSubmit={handleFormRegister} className='login__form'>
                            <section className='login__form__cont'>
                                <div className='login__form__cont--div'>
                                    <label htmlFor="" className='login__form--label'> Name</label>

                                    <input className='login__form--input' type="text" name="user_name" placeholder='user_name' value={name} onChange={(e) => { handleNameChange(e.target.value); }} />
                                </div>

                                <div className='login__form__cont--div'>
                                    <label htmlFor="" className='login__form--label'> Email</label>
                                    <input className='login__form--input' type="email" name="contact_email" placeholder="email" value={email} onChange={(e) => { handleEmailChange(e.target.value); }} />
                                </div>

                                <div className='login__form__cont--div'>
                                    <label htmlFor="" className='login__form--label'> Password</label>
                                    <input className='login__form--input' type="password" name="password" placeholder="password" value={password} onChange={(e) => { handlePasswordChange(e.target.value); }} />
                                </div>
                                <div className='login__form__cont--div'>
                                    <label htmlFor="" className='login__form--label'>Confirm Password</label>
                                    <input className='login__form--input' type="password" name="password" placeholder="re-enter password" value={confirmPassword} onChange={(e) => { handleConfirmPasswordChange(e.target.value); }} />
                                </div>
                            </section>

                            <section className='login__form--button'>
                                <button className='login__form--button--item' type="submit" >Register</button>
                                <p onClick={handleLogin} className="login__form--button--next">Login</p>
                            </section>
                        </form>
                        {passwordValidation &&
                            <div className=''> <p className='register--message'>{errorMessage}</p></div>
                        }
                        {!registerSuccess &&
                            <div className=''> <p className='register--message'>{message}</p></div>
                        }
                        {registerSuccess &&
                            <div className=''> <p className='register--message'>{message}</p><p>Taking you to login... </p></div>
                        }
                    </div>
                </section>
            }
        </>
    )
}
export default LoginPopUp;
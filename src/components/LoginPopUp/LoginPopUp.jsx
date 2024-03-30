import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import '../../pages/Login/Login.scss';
import { useAuth } from '../../utils/AuthContext';
import logo from '../../assets/images/slogan.png'

function LoginPopUp({ provider, providerId, onClose }) {
    const { login } = useAuth();

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_name: '',
        contact_email: '',
        password: ''
    });
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

    const handleNameChange = (value) => { setName(value);setErrorMessage("");  }
    const handleEmailChange = (value) => { setEmail(value);setErrorMessage("");  }
    const handlePasswordChange = (value) => { setPassword(value);setErrorMessage("");  }
    const handleConfirmPasswordChange = (value) => { setConfirmPassword(value);setErrorMessage("");  }

    const validation= ()=>{
        if(!name ||!email||!password ){
            setErrorMessage("Fields cannot be empty");
            return false;
        }
        return true;
    }
    const handleFormLogin = async (e) => {
        e.preventDefault();
        e.target.reset();
        console.log("clicked")
        const formValidate = validation();
        if(formValidate){
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/login`, {
                    user_name: name,
                    contact_email: email,
                    password: password,
                });
                console.log(response.data);
                console.log(response.data.user.id);
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
            setName('');
            setEmail('');
            setPassword('');
        }
    };

    const Validate = () => {
        if (password !== confirmPassword) {
            return false;
        }
        console.log("validation done")
        return true;
    }
    const handleFormRegister = async (e) => {
        e.preventDefault();
        e.target.reset();
        console.log("clicked")
        const validation = Validate();
        if (!validation) {
            console.log("damn vlidation failed")
            setRegisterSuccess(false);
            setPasswordValidation(true);
        } else {
            console.log("inside")
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/register`, {
                    user_name: name,
                    contact_email: email,
                    password: password,
                });
                console.log(response.data);
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
                            <div className=''> <p className='register--message'>Password Mismatch!</p></div>
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
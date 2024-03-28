import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import '../../pages/Login/Login.scss';
function LoginPopUp({ provider, providerId }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_name: '',
        contact_email: '',
        password: ''
    });
    const [loginSuccess, setLoginSuccess] = useState(true);
    const [userId, setUserId] = useState('');
    const [login, setLogin] = useState(true);
    const [registerSuccess, setRegisterSuccess] = useState(true);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [message, setMessage] = useState("");


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormLogin = async (e) => {
        e.preventDefault();
        e.target.reset();
        console.log("clicked")
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/login`, formData);
            console.log(response.data);
            console.log(response.data.user.id);
            setLoginSuccess(true);
            sessionStorage.setItem('userId', response.data.user.id);
            setUserId(response.data.user.id);
            if (response.data.message && response.data.message.includes("Login Successful")) {
                // navigate('/services');
                setLoginSuccess(true);
                navigate(`/booking/${providerId}`, { state: { provider } });
            }
        } catch (error) {
            setLoginSuccess(false);
            console.error('Registration failed:', error);
        }
    };

    const handleNameChange = (value) => {
        setName(value)
    }
    const handleEmailChange = (value) => {
        setEmail(value)
    }
    const handlePasswordChange = (value) => {
        setPassword(value)
    }
    const handleConfirmPasswordChange = (value) => {
        setConfirmPassword(value)
    }

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
                    // setTimeout(()=>{
                    //     navigate('/services');
                    // },2000)
                    setLogin(true);
                    
                }
            } catch (error) {
                setRegisterSuccess(false);
                setMessage(error.response.data.message)
                console.error('Registration failed:', error.response.data.message);
            }
        }
        e.target.reset();
    };


    const handleRegister = () => {
        setLogin(false);
    }
    const handleLogin = () => {
        setLogin(true)
    }

    return (
        <>
            {login &&
                <section className="popup--modal">
                    <h3>Login</h3>
                    <div className="login-container">
                        <form onSubmit={handleFormLogin} className='login__form'>
                            <section className='login__form__cont'>
                                <div className='login__form__cont--div'>
                                    <label htmlFor="" className='login__form--label'> Name</label>

                                    <input className='login__form--input' type="text" name="user_name" placeholder='user_name' value={formData.user_name} onChange={handleChange} />
                                </div>

                                <div className='login__form__cont--div'>
                                    <label htmlFor="" className='login__form--label'> Email</label>
                                    <input className='login__form--input' type="email" name="contact_email" placeholder="email" value={formData.contact_email} onChange={handleChange} />
                                </div>

                                <div className='login__form__cont--div'>
                                    <label htmlFor="" className='login__form--label'> Password</label>
                                    <input className='login__form--input' type="password" name="password" placeholder="password" value={formData.password} onChange={handleChange} />
                                </div>

                                {!loginSuccess &&
                                    <div> <p>Please check your credentials </p></div>
                                }
                            </section>
                            <section className='login__form--button'>
                                <button className='login__form--button--item' type="submit" >Login</button>
                                {/* <p className='login__form--button--text'> New User? <strong><NavLink to={'/register'} className='login__form--button--navink'>Register</NavLink> </strong> instead !</p> */}
                                <p onClick={handleRegister}>Register</p>
                            </section>
                        </form>
                    </div>
                </section>
            }

            {!login &&
                <section className="popup--modal">
                    <h3>Register</h3>
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
                                {/* <p className='login__form--button--text'> New User? <strong><NavLink to={'/register'} className='login__form--button--navink'>Register</NavLink> </strong> instead !</p> */}
                                <p onClick={handleLogin}>Login</p>
                            </section>

                            {!registerSuccess &&
                                <div className='errorMessage'> <p>{message}</p></div>
                            }
                            {registerSuccess &&
                                <div className=''> <p>{message}</p></div>
                            }
                        </form>
                    </div>
                </section>
            }
        </>

    )
}
export default LoginPopUp;
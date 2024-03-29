import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import '../../pages/Login/Login.scss';
function ProfessionalLogin({ onClose }) {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_name: '',
        contact_email: '',
        password: ''
    });

    const [loginSuccess, setLoginSuccess] = useState(true);
    const [providerId, setProviderId] = useState('');
    const [login, setLogin] = useState(true);
    const [isLoading, setIsLoading] =useState(true);
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
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/providers/login`, formData);
            console.log(response.data);
            console.log(response.data.provider.id);
            setLoginSuccess(true);
            sessionStorage.setItem('providerId', response.data.provider.id);
            setProviderId(response.data.provider.id);
            // console.log(providerId)
            if (response.data.message && response.data.message.includes("Login Successful")) {
                setLoginSuccess(true);
                // console.log("hi")
                // console.log(providerId)
                // if(providerId!==""){
                    setLogin(false);
                    navigate(`/providers/dashboard/${response.data.provider.id}`);
                // }
            }
        } catch (error) {
            setLoginSuccess(false);
            console.error('Registration failed:', error);
        }
    };

    const handleLogin = () => { setLogin(true) }
    const closePopup = () => { 
        setLogin(false);
        onClose(); 
    };

    return (
        <>
            {login &&
                <section className='login--popup'>
                    <div className="popup--modal">
                        <section className="popup--modal">
                            <h3>Professional Login</h3>
                            <div className="login-container">
                                <form onSubmit={handleFormLogin} className='login__form'>
                                    <section className='login__form__cont'>
                                        <div className='login__form__cont--div'>
                                            <label htmlFor="" className='login__form--label'> Name</label>

                                            <input className='login__form--input' type="text" name="provider_name" placeholder='user_name' value={formData.provider_name} onChange={handleChange} />
                                        </div>

                                        <div className='login__form__cont--div'>
                                            <label htmlFor="" className='login__form--label'> Email</label>
                                            <input className='login__form--input' type="email" name="contact_email" placeholder="email" value={formData.contact_email} onChange={handleChange} />
                                        </div>

                                        {/* <div className='login__form__cont--div'>
                                    <label htmlFor="" className='login__form--label'> Password</label>
                                    <input className='login__form--input' type="password" name="password" placeholder="password" value={formData.password} onChange={handleChange} />
                                </div> */}

                                        {!loginSuccess &&
                                            <div> <p>Please check your credentials </p></div>
                                        }
                                    </section>
                                    <section className='login__form--button'>
                                        <button className='login__form--button--item' type="submit" >Login</button>
                                        {/* <p className='login__form--button--text'> New User? <strong><NavLink to={'/register'} className='login__form--button--navink'>Register</NavLink> </strong> instead !</p> */}
                                        {/* <p onClick={handleRegister}>Register</p> */}
                                    </section>
                                    {/* <section>
                                <button onClick={closePopup} className='modal__button'>X</button>
                            </section> */}
                                </form>
                                {/* {loginSuccess && */}
                                <section>
                                    <button onClick={closePopup} className='modal__button'>X</button>
                                </section>
                                {/* } */}
                            </div>
                        </section>
                    </div>
                </section>
            }
        </>

    )
}
export default ProfessionalLogin;
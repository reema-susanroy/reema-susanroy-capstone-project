import React, { useState } from 'react';
import axios from 'axios';
// import './Login.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    // const [formData, setFormData] = useState({
    //     user_name: '',
    //     contact_email: '',
    //     password: ''
    // });
    const [success, setSuccess] = useState(true);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [message, setMessage] = useState("");

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

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
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("clicked")
        const validation = Validate();
        if (!validation) {
            console.log("damn vlidation failed")
            setSuccess(false);
        } else {
            console.log("inside")
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/register`, {
                    user_name: name,
                    contact_email: email,
                    password: password,
                });
                console.log(response.data);
                setSuccess(true);
                if (response.data.message && response.data.message.includes("Registered Successful")) {
                    setMessage("Registered Sussessfully");
                    setTimeout(()=>{
                        navigate('/services');
                    },2000)

                }
            } catch (error) {
                setSuccess(false);
                setMessage(error.response.data.message)
                console.error('Registration failed:', error.response.data.message);
            }
        }
    };

    // const handleLogin = () =>{
    //     // Link to='/services'
    // }
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className='login__form'>
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
                    <p className='login__form--button--text'> Already a User? <strong><NavLink to={'/'} className='login__form--button--navink'>Login</NavLink> </strong> instead !</p>
                </section>

                {!success &&
                    <div className='errorMessage'> <p>{message}</p></div>
                }
                {success &&
                    <div className=''> <p>{message}</p></div>
                }
            </form>
        </div>

    );
    // };

}
export default Register;

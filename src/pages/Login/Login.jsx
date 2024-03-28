// import React, { useState } from 'react';
// import axios from 'axios';
// import './Login.scss';
// import { Link, NavLink, useNavigate } from 'react-router-dom';

// function Login() {
//     const navigate = useNavigate();
//     const [userId, setUserId] = useState('');
//     const [formData, setFormData] = useState({
//         user_name: '',
//         contact_email: '',
//         password: ''
//     });
//     const [success, setSuccess] = useState(true);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("clicked")
//         try {
//             const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/login`, formData);
//             console.log(response.data);
//             console.log(response.data.user.id);
//             setSuccess(true);
//             sessionStorage.setItem('userId', response.data.user.id);
//             setUserId(response.data.user.id);
//             if (response.data.message && response.data.message.includes("Login Successful")) {
//                 navigate('/services');

//             }
//         } catch (error) {
//             setSuccess(false);
//             console.error('Registration failed:', error);
//         }
//     };

//     // const handleLogin = () =>{
//     //     // Link to='/services'
//     // }
//     return (
//         <div className="login-container">
//             <form onSubmit={handleSubmit} className='login__form'>
//                 <section className='login__form__cont'>
//                     <div className='login__form__cont--div'>
//                         <label htmlFor="" className='login__form--label'> Name</label>

//                         <input className='login__form--input' type="text" name="user_name" placeholder='user_name' value={formData.user_name} onChange={handleChange} />
//                     </div>

//                     <div className='login__form__cont--div'>
//                         <label htmlFor="" className='login__form--label'> Email</label>
//                         <input className='login__form--input' type="email" name="contact_email" placeholder="email" value={formData.contact_email} onChange={handleChange} />
//                     </div>

//                     <div className='login__form__cont--div'>
//                         <label htmlFor="" className='login__form--label'> Password</label>
//                         <input className='login__form--input' type="password" name="password" placeholder="password" value={formData.password} onChange={handleChange} />
//                     </div>

//                 </section>
//                 <section className='login__form--button'>
//                     <button className='login__form--button--item' type="submit" >Login</button>
//                     <p className='login__form--button--text'> New User? <strong><NavLink to={'/register'} className='login__form--button--navink'>Register</NavLink> </strong> instead !</p>
//                 </section>

//                 {!success &&
//                     <div> <p>Please check your credentials </p></div>
//                 }
//             </form>
//         </div>

//     );
//     // };

// }
// export default Login;

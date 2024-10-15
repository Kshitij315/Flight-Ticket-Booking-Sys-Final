import React from 'react';
import * as Yup from 'yup';
import UserService from '../../services/UserService';
import Swal from 'sweetalert2';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/Login.css';

const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
});

export default function Login(props) {
    const history = useNavigate()

    const service = new UserService();

    const handleSubmit = (values) => {
        service
            .validateUser(values.username, values.password)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    if (response.data.isadmin === 0)
                        history("/booking");
                    else
                        history("/admin");
                }
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Invalid username or password."
                });
            });
    };

    return (
        <div className='home'>
            <div >
                <div className='row'>
                    
                </div>
                    <div className='main-content'>
                                    <div class="login-container">
                                    <div>
                        <h1>
                            Login
                        </h1>
                                    </div>
                                            <Formik initialValues={{
                                                username: "",
                                                password: ""
                                            }}
                                                validationSchema={LoginSchema}
                                                onSubmit={handleSubmit}
                                            >
                                                {({ isSubmitting }) => (
                                                    <Form id ="loginForm">
                                                        <div className='form-group'>
                                                            <label className='my-label' htmlFor="Username">Username</label>
                                                            <Field
                                                                type="text"
                                                                name="username"
                                                                placeholder="Enter your Username"
                                                                className="form-control"

                                                                
                                                            />
                                                            <ErrorMessage
                                                                name='username'
                                                                component="div"
                                                                className='text-danger'
                                                            />
                                                        </div>
                                                        
                                                        <div className='form-group'>
                                                        <label className='my-label' htmlFor="Username">Password</label>
                                                            <Field 
                                                                type="password"
                                                                name="password"
                                                                placeholder="Enter your Password"
                                                                className="form-control"
                                                            />
                                                            <ErrorMessage
                                                                name='password'
                                                                component="div"
                                                                className='text-danger'
                                                            />
                                                        </div>
                                                        <div class="remember-forgot">
                                                 <Link to="/forgetPassword">
                                                    
                                                <a  href="#">Forgot password</a>
                                       
                                                </Link>
                                                </div>

                                                        <div className='card-footer'>
                                                            <button class='login-btn'
                                                                type='submit'
                                                            >Login</button>
                                                        </div>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    
                                       
                                        <div class="signup-link">
                                            Don't have an account? &nbsp;
                                            <Link className='card-link' to="/register">
                                             <a href="#">Sign up</a>
                                             </Link>
                                           </div> 
                                      
                                    
                                </div>
                                <div>
                                    <div>
                                   
                                    </div>
                                </div>
                            </div>
                       
            
        
    )
}


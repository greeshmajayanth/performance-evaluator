import React, { Component } from 'react';  
import axios from 'axios';  
import { withRouter } from '../../withRouter';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../login.css';
import apiUrl from '../../apiConfig';

class LoginPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onLogin = this.onLogin.bind(this)
    }


    handleEmailChange = (e) => {
        this.setState({ email: e.target.value }, this.checkFormValidity);
    };

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value }, this.checkFormValidity);
    };

    onSubmit() {
        const { navigate } = this.props;
        // Navigate to Another Component
        navigate("/registration");
    }

    validateForm = () => {
        const { email, password } = this.state;
        return email && password;
    };

    onLogin = async (event) => {
        event.preventDefault(); 

        if (!this.validateForm()) {
            toast.error('Please fill in all fields');
            return;
        }

        // Create FormData object
        const formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
    
        try {
          const response = await axios.post(apiUrl+'/authentication/login.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set content type to FormData
            },
          });
    
          if (response.status === 200) {
            // Display alert with response message
            window.alert(response.data.message);

            // Set user_data in localStorage
            const user_data_json = JSON.stringify(response.data.user_data);
            localStorage.setItem('user_data', user_data_json);

            // Navigate based on user role
            const userRole = response.data.user_data.role;
            this.props.navigate(`/dashboard?userRole=${userRole}`)
          }
            else {
                    // Handle other status codes, e.g., show an error message to the user
                    console.error('Login failed:', response.data.error);
                }
        } catch (error) {
          // Handle network or other errors
          console.error('Error during login:', error.message);
        }
      };
    

    render() {
        
        return (
            
            <div className="login-form">
                <form>
                    <h1>Login</h1>
                    <div className="content">
                        <div className="input-field">
                            <input
                                type="email"
                                placeholder="Email"
                                autoComplete="nope"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                            />
                        </div>
                        <div className="input-field">
                            <input
                                type="password"
                                placeholder="Password"
                                autoComplete="new-password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                            />
                        </div>
                        <Link to="/forgetpassword" className="link">
                            Forgot Your Password?
                        </Link>
                    </div>
                    <div className="action">
                        <button onClick={this.onLogin} type="submit" className="signin-button">
                            Login
                        </button>
                        <button onClick={this.onSubmit} type="submit" className="signin-button">
                            Register
                        </button>
                    </div>
                </form>
                <ToastContainer />
            </div>
            
        );
    };
}

export default withRouter(LoginPage);

import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from '../../withRouter';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../login.css'; 
import apiUrl from '../../apiConfig';

class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: ''
        };

        this.onSubmit = this.onSubmit.bind(this)
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    handleConfirmPasswordChange = (e) => {
        this.setState({ confirmPassword: e.target.value });
    };

    validateForm = () => {
        const { password, confirmPassword } = this.state;
        return password && confirmPassword;
    };

    validatePassword = () => {
        const passwordRegex = /^(?=.*[A-Za-z]{4,})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        const isPasswordValid = passwordRegex.test(this.state.password);
        return isPasswordValid
    }

    validateConfirmPassword = () => {
        if (this.state.password !== this.state.confirmPassword){
            return false
        } else {
            return true
        }
    }

    onSubmit= async (event) => {
        event.preventDefault(); 

        if (!this.validateForm()) {
            toast.error('Please fill in all fields');
            return;
        }

        if (!this.validatePassword()) {
            toast.error('Password should contain at least 4 alphabets, 1 number and 1 special character');
            return;
        }

        if (!this.validateConfirmPassword()) {
            toast.error('Password does not match confirm password');
            return;
        }

        try {
            // Make an API call 
            const searchParams = new URLSearchParams(window.location.search);
            const email1 = searchParams.get('email')
            console.log(email1)
            const response = await axios.put(apiUrl+'/users/updatepassword.php', {
                
                email: email1,
                password: this.state.confirmPassword
            });

            if (response.status === 200) {
                // Password reset link sent successfully
                window.alert('Password reset successfully.');
                console.log(response)
                this.props.navigate("/login");
            } else {
                // Handle other status codes or show an error message to the user
                console.error('Password reset failed:', response.data.error);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error during password reset:', error.message);
        }
        
    }


    render() {
        return (
            <div className="login-form">
                <form onSubmit={this.handleSubmit}>
                    <h1>Reset</h1>
                    <h4>Enter your new password</h4>
                    <div className="content">
                        <div className="input-field">
                            <input
                                type="password"
                                placeholder="Password"
                                autoComplete="nope"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                            />
                        </div>
                        <div className="input-field">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                autoComplete="new-password"
                                value={this.state.confirmPassword}
                                onChange={this.handleConfirmPasswordChange}
                            />
                        </div>
                    </div>
                    <div className="action">
                        <button onClick={this.onSubmit} type="submit" className="submit-button">
                            Submit
                        </button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        );
    }
}

export default withRouter(ResetPasswordForm);
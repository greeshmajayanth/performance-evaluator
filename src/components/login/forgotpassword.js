import React, { Component } from 'react';
import { withRouter } from '../../withRouter';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../login.css'; 

class ForgotPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };

        this.onSubmit = this.onSubmit.bind(this)
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(this.state.email);
        return isEmailValid
    }

    onSubmit= async (event) => {

        event.preventDefault();

        if (!this.validateEmail()) {
            toast.error('Please enter valid email');
            return;
        }

        const { navigate } = this.props;
        const { email } = this.state;

        try {
            // Make an API call 
            const response = await axios.post('https://gxj4507.uta.cloud/authentication/forgotpassword.php', {
                email: email,
            });

            if (response.status === 200) {
                // Password reset link sent successfully
                window.alert('Password reset link sent successfully. Check your email.');
                // Optionally, you can navigate to another component after sending the reset link
                navigate("/login");
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
                    <h4>Enter your email address associated with your account and we will send you a link to reset your password</h4>
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

export default withRouter(ForgotPasswordForm);

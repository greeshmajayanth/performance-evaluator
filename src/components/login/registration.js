import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from '../../withRouter';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../login.css'; 
import apiUrl from '../../apiConfig';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            userRole: 'Student'
        };

        this.onSubmit = this.onSubmit.bind(this)
    }

    handleFirstNameChange = (e) => {
        this.setState({ firstName: e.target.value });
    };

    handleLastNameChange = (e) => {
        this.setState({ lastName: e.target.value });
    };

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    handleConfirmPasswordChange = (e) => {
        this.setState({ confirmPassword: e.target.value });
    };

    handlephoneNumber = (e) => {
        this.setState({ phoneNumber: e.target.value });
    };''

    handleUserRoleChange = (e) => {
        this.setState({ userRole: e.target.value });
    };

    validateForm = () => {
        const { firstName, lastName, email, confirmPassword, phoneNumber, userRole } = this.state;
        return firstName && lastName && email && confirmPassword && phoneNumber && userRole;
    };

    validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(this.state.email);
        return isEmailValid
    }

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

    validateFirstName = () => {
        const hasNumbersInFirstName = /\d/.test(this.state.firstName);
        const isFirstNameValid = !hasNumbersInFirstName;
        return isFirstNameValid
    }

    validateLastName = () => {
        const hasNumbersInLastName = /\d/.test(this.state.lastName);
        const isLastNameValid = !hasNumbersInLastName;
        return isLastNameValid
    }

    validatePhoneNumber = () => {
        const phoneNumber = this.state.phoneNumber.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        const isPhoneNumberValid = phoneNumber.length === 10;
        return isPhoneNumberValid;
    };    

    onSubmit = async (event) => {
        event.preventDefault(); 

        if (!this.validateForm()) {
            toast.error('Please fill in all fields');
            return;
        }

        if (!this.validateEmail()) {
            toast.error('Please enter valid email');
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

        if (!this.validateFirstName()) {
            toast.error('Name cannot have numbers or special characters');
            return;
        }

        if (!this.validateLastName()) {
            toast.error('Name cannot have numbers or special characters');
            return;
        }

        if (!this.validatePhoneNumber()) {
            toast.error('Phone number cannot have alphabets or special characters');
            return;
        }

        // Create FormData object
        const formData = new FormData();
        formData.append('firstName', this.state.firstName);
        formData.append('lastName', this.state.lastName);
        formData.append('email', this.state.email);
        formData.append('password', this.state.confirmPassword);
        formData.append('phoneNumber', this.state.phoneNumber);
        formData.append('role', this.state.userRole);

        try {
            // Make an API call 
            const response = await axios.post('https://gxj4507.uta.cloud/authentication/verifyemail.php', {
                to: this.state.email,
            });

            if (response.status === 200) {

                try {
                    const response = await axios.post(apiUrl+'/authentication/register.php', formData, {
                      headers: {
                          'Content-Type': 'multipart/form-data', // Set content type to FormData
                      },
                    });
              
                    if (response.status === 200) {
                      window.alert('Registered successfully');
                      this.props.navigate('/login')
                    } else {
                      
                      console.error('Registration failed:', response.data.error);
                    }
                  } catch (error) {
                    // Handle network or other errors
                    window.alert('Email already exists, kindly login.');
                    console.error('Error during Registration:', error.message);
                  }

                
            } else {
                // Handle other status codes or show an error message to the user
                console.error('Email verification failed:', response.data.error);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error during email verification:', error.message);
        }
    
      };

    render() {
        return (
            <div className="login-form">
                <form>
                    <h1>REGISTRATION</h1>
                    <div className="content">
                        <div className="input-field">
                            <input
                                type="text"
                                placeholder="First name"
                                autoComplete="nope"
                                value={this.state.firstName}
                                onChange={this.handleFirstNameChange}
                            />
                        </div>
                        <div className="input-field">
                            <input
                                type="text"
                                placeholder="Last name"
                                autoComplete="nope"
                                value={this.state.lastName}
                                onChange={this.handleLastNameChange}
                            />
                        </div>
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
                        <div className="input-field">
                            <input
                                type="text"
                                placeholder="Phone Number"
                                autoComplete="nope"
                                value={this.state.phoneNumber}
                                onChange={this.handlephoneNumber}
                            />
                        </div>
                        <div className="input-field">
                            <label htmlFor="user">USER:</label>
                            <select id="user" name="USER" value={this.state.userRole} onChange={this.handleUserRoleChange}>
                                <option value="Student">STUDENT</option>
                                <option value="Instructor">INSTRUCTOR</option>
                                <option value="ProgramCO">Program Coordinator</option>
                                <option value="QAofficer">QA</option>
                            </select>
                        </div>
                    </div>
                    <div className="action">
                        <button onClick={this.onSubmit} type="submit" className="submit-button">Submit</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        );
    }
}

export default withRouter(RegistrationForm);

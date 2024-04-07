import React, { Component } from 'react';
import axios from 'axios'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../dashboard.css'; 
import ChatComponent from '../chat/chat.js';
import ReportTable from '../report/report.js';
import apiUrl from '../../apiConfig';

class AdminProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            popupVisible: false,
            popupContent: { title: '', description: '' },
            blurBackground: false,
            isRegistrationModalOpen: false,
            isCoursesModalOpen: false,
            isViewUsersModalOpen: false,
            isViewInstructorsModalOpen: false,
            isViewStudentsModalOpen: false,
            isReportModalOpen: false,
            isChatOpen: false,
            selectedUserType: null,
            userData: {},
            allUsers: [],
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            userRole: 'Student',
            courseName: '',
            courseDescription: ''
        };

    }

    componentDidMount() {

        // Fetch course data when the component mounts
        axios.get(apiUrl+'/users/read.php')
          .then(response => {
            console.log(response.data.course_data)
            
            const allUsers = response.data.user_data
            this.setState({allUsers})
            console.log(this.state.allUsers.length)
            
          })
          .catch(error => {
            console.error('Error during user data fetch:', error.message);
          });
    }

    adminshowPopup = (title, description) => {
        this.setState({
            popupContent: { title, description },
            popupVisible: true,
            blurBackground: true
        });
    };

    adminhidePopup = () => {
        this.setState({
            popupVisible: false,
            blurBackground: false
        });
    };

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

    handleUserRoleChange = (e) => {
        this.setState({ userRole: e.target.value });
    };

    handleOpenRegistrationModal = () => {
        this.setState({ isRegistrationModalOpen: true, blurBackground: true, isViewUsersModalOpen: false });
    };

    handleCloseRegistrationModal = () => {
        this.setState({ isRegistrationModalOpen: false, blurBackground: false });
    };

    validateForm = () => {
        const { firstName, lastName, email, confirmPassword, userRole } = this.state;
        return firstName && lastName && email && confirmPassword && userRole;
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

    handleSubmit = async (event) => {

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

        // Create FormData object
        const formData = new FormData();
        formData.append('firstName', this.state.firstName);
        formData.append('lastName', this.state.lastName);
        formData.append('email', this.state.email);
        formData.append('password', this.state.confirmPassword);
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
                        alert("New user registered.")
                        this.handleCloseRegistrationModal();
                    } else {
                      
                      console.error('Registration failed:', response.data.error);
                    }
                  } catch (error) {
                    // Handle network or other errors
                    alert('Email already exists, kindly login.');
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

    handleOpenCoursesModal = () => {
        this.setState({ isCoursesModalOpen: true, blurBackground: true });
    };

    handleCloseCoursesModal = () => {
        this.setState({ isCoursesModalOpen: false, blurBackground: false });
    };

    onSubmitCreateCourse = async (event) => {

        event.preventDefault();

        // Create FormData object
        const formData = new FormData();
        formData.append('courseName', this.state.courseName);
        formData.append('courseDescription', this.state.courseDescription);

        try {
            const response = await axios.post(apiUrl+'/courses/create.php', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data', // Set content type to FormData
              },
            });
      
            if (response.status === 200) {
                alert("Course details successfully submitted")
                this.setState({ isCoursesModalOpen: false, blurBackground: false });
            } else {
              
              console.error('Adding new course failed:', response.data.error);
            }
          } catch (error) {
            // Handle network or other errors
            console.error('Error during adding new course:', error.message);
          }
       
    }

    handleCourseNameChange = (event) => {
        this.setState({ courseName: event.target.value });
    };

    handleCourseDescriptionChange = (event) => {
        this.setState({ courseDescription: event.target.value });
    };

    handleCourseAssign = () => {
        alert("Course assigned")
    }

    handleOpenViewUsersModal = () => {
        this.setState({ isViewUsersModalOpen: true, blurBackground: true });
    };

    handleCloseViewUsersModal = () => {
        this.setState({ isViewUsersModalOpen: false, selectedUserType: null, blurBackground: false });
    };

    handleOpenInstructorModal = () => {
        this.setState({ isViewInstructorsModalOpen: true, blurBackground: true });
        const filteredUsers = this.state.allUsers.filter(user => user.role === "Instructor");

        if (filteredUsers.length > 0) {
            this.setState({ selectedUserType: "Instructor", filteredUsers });
        } else {
            // Handle case when no users are found for the selected role
            this.setState({ selectedUserType: null, filteredUsers: [] });
        }
    };

    handleCloseInstructorModal = () => {
        this.setState({ isViewInstructorsModalOpen: false, selectedUserType: null, blurBackground: false });
    };

    handleOpenStudentModal = () => {
        this.setState({ isViewStudentsModalOpen: true, blurBackground: true });
        const filteredUsers = this.state.allUsers.filter(user => user.role === "Student");

        if (filteredUsers.length > 0) {
            this.setState({ selectedUserType: "Student", filteredUsers });
        } else {
            // Handle case when no users are found for the selected role
            this.setState({ selectedUserType: null, filteredUsers: [] });
        }
    };

    handleCloseStudentModal = () => {
        this.setState({ isViewStudentsModalOpen: false, selectedUserType: null, blurBackground: false });
    };

    handleViewUserData = (userType) => {
        // Filter users based on the selected role
        const filteredUsers = this.state.allUsers.filter(user => user.role === userType);

        if (filteredUsers.length > 0) {
            this.setState({ selectedUserType: userType, filteredUsers });
        } else {
            // Handle case when no users are found for the selected role
            this.setState({ selectedUserType: null, filteredUsers: [] });
        }
    };

    handleOpenReportModal = () => {
        this.setState({ isReportModalOpen: true, blurBackground: true });
    };

    handleCloseReportModal = () => {
        this.setState({ isReportModalOpen: false, blurBackground: false });
    };

    toggleChat = () => {
        this.setState({ isChatOpen: !this.state.isChatOpen});
    };

    renderUserCard = () => {
        // Replace this with your actual rendering logic for user data
        const { filteredUsers } = this.state;

        return (
            <div>
                {filteredUsers.map((userData, index) => (
                    <div key={index} className="user-card">
                        <div className="user-info">
                            <h3>{userData.firstName} {userData.lastName}</h3>
                            <p>Email: {userData.email}</p>
                            <p>Phone Number: {userData.phoneNumber}</p>
                        </div>
                        <div className="user-actions">
                            <button className="update-button" onClick={() => this.handleOpenRegistrationModal()}>Update</button>
                            <button className="delete-button" onClick={() => this.handleDeleteUser(userData)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    renderAssignCard = () => {
        // Replace this with your actual rendering logic for user data
        const { filteredUsers } = this.state;

        return (
            <div className="card-container">
                {filteredUsers.map((userData, index) => (
                        <div key={index} className="user-card">
                            <div className="user-info">
                                <h3>{userData.firstName} {userData.lastName}</h3>
                                <p>Email: {userData.email}</p>
                                <p>Phone Number: {userData.phoneNumber}</p>
                                <p>Course assigned: Database Management</p>
                            </div>
                            <div className="user-actions">
                                <select id="user" name="COURSES">
                                    <option value="1">Introduction to Programming</option>
                                    <option value="2">Data Structures and Algorithms</option>
                                    <option value="3">Web Development Fundamentals</option>
                                    <option value="4">Database Management</option>
                                </select>
                                <button className="update-button" onClick={() => this.handleCourseAssign()}>Assign Course</button>
                            </div>
                        </div>
                ))}
            </div>
        );
    };

    render() {

        // Retrieve the JSON string from localStorage
        const user_data_json = localStorage.getItem('user_data');

        // Parse the JSON string to get the object
        const user_data = JSON.parse(user_data_json);

        console.log(user_data)

        const { isRegistrationModalOpen } = this.state;
        return (
            <div>
                <div id="AdminProfile" className={`page styled-card ${this.state.blurBackground ? 'blur-background' : ''}`}>
                    <section id="user-permissions">
                        <div className="detail">
                            <h2>Welcome, {user_data.firstName} {user_data.lastName} !</h2>
                        </div>
                    </section>
                    <section id="user-permissions">
                        <div className="create-card">
                            <h2>Create</h2>
                            <div className="create-buttons">
                                <button className="admin_button" onClick={this.handleOpenRegistrationModal}>
                                    User
                                </button>
                                <button
                                    className="admin_button"
                                    onClick={this.handleOpenCoursesModal}
                                >
                                    Courses
                                </button>
                                <button
                                    className="admin_button"
                                    onClick={this.handleOpenCoursesModal}
                                >
                                    Objectives
                                </button>
                            </div>
                        </div>
                    </section>
                    <section id="user-permissions">
                        <div className="create-card">
                            <h2>View</h2>
                            <div className="create-buttons">
                                <button className="admin_button" onClick={this.handleOpenViewUsersModal}>Users</button>
                                <button className="admin_button" onClick={this.handleOpenReportModal}>Generate Report</button>
                            </div>
                        </div>
                    </section>
                    <section id="user-permissions">
                        <div className="create-card">
                            <h2>Assign</h2>
                            <div className="create-buttons">
                                <button className="admin_button" onClick={this.handleOpenInstructorModal}>Instructors</button>
                                <button className="admin_button" onClick={this.handleOpenStudentModal}>Students</button>
                            </div>
                        </div>
                    </section>
                </div>
                <div className={`chat-button ${this.state.isChatOpen ? 'active' : ''}`} onClick={this.toggleChat}>
                    <span>&#9998;</span> Chat
                </div>

                {this.state.isChatOpen && (
                    <div className="chat-window">
                        <p>Chat with Student</p>
                        <ChatComponent />
                    </div>
                )}
                {this.state.popupVisible && (
                    <div id="adminpopup" className="popup">
                        <div className="popup-content">
                            <h2 id="admin-popup-title">{this.state.popupContent.title}</h2>
                            <p id="admin-popup-description">{this.state.popupContent.description}</p>
                            <button onClick={this.adminhidePopup}>Close</button>
                        </div>
                    </div>
                )}
                {isRegistrationModalOpen && (
                    <div id="popup" className="popup" style={{ width: '36%' }}>
                        <div className="popup-content">
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
                                        <label htmlFor="user">USER:</label>
                                        <select id="user" name="USER" value={this.state.userRole} onChange={this.handleUserRoleChange}>
                                            <option value="Student">STUDENT</option>
                                            <option value="Instructor">INSTRUCTOR</option>
                                            <option value="ProgramCO">PROGRAM COORDINATOR</option>
                                            <option value="QAofficer">QA</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="action">
                                    <button type="submit" onClick={this.handleSubmit} className="cancel-button">Submit</button>
                                    <button type="button" onClick={this.handleCloseRegistrationModal} className="cancel-button">Cancel</button>
                                </div>
                            </form>
                            <ToastContainer />
                        </div>
                    </div>
                )}
                {this.state.isCoursesModalOpen && (
                    <div id="courses-popup" className="popup" style={{ width: '36%' }}>
                        <div className="popup-content">
                            <h1>COURSE DETAILS</h1>
                            <br></br>
                            <div className="input-field">
                                <label htmlFor="courseName">Course Name:</label>
                                <input
                                    type="text"
                                    id="courseName"
                                    value={this.state.courseName}
                                    onChange={this.handleCourseNameChange}
                                />
                            </div>
                            <div className="input-field">
                                <label htmlFor="courseDescription">Course Description:</label>
                                <input
                                    type="text"
                                    id="courseDescription"
                                    value={this.state.courseDescription}
                                    onChange={this.handleCourseDescriptionChange}
                                />
                            </div>
                            <div className="action">
                                <button type="submit" onClick={this.onSubmitCreateCourse} className="cancel-button">Submit</button>
                                <button type="button" onClick={this.handleCloseCoursesModal} className="cancel-button">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
                {this.state.isViewUsersModalOpen && (
                    <div id="popup" className="popup" style={{ width: '35%' }}>
                        <div className="popup-content">
                            <h1>VIEW USERS</h1>
                            <div className="cancel-button" style={{ marginBottom: '10px' }}>
                                <button onClick={() => this.handleViewUserData('Student')}>Student</button>
                                <button onClick={() => this.handleViewUserData('ProgramCO')}>Program Coordinator</button>
                                <button onClick={() => this.handleViewUserData('Instructor')}>Instructor</button>
                                <button onClick={() => this.handleViewUserData('QAofficer')}>QA</button>
                            </div>
                            {this.state.selectedUserType && this.renderUserCard()}
                            <div className="action">
                                <button type="button" onClick={this.handleCloseViewUsersModal} className="cancel-button">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {this.state.isViewInstructorsModalOpen && (
                    <div id="popup" className="popup" style={{ width: '35%' }}>
                        <div className="popup-content">
                            <h1>ASSIGN COURSE</h1>
                            <br></br>
                            {this.state.selectedUserType && this.renderAssignCard()}
                            <div className="action">
                                <button type="button" onClick={this.handleCloseInstructorModal} className="cancel-button">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {this.state.isViewStudentsModalOpen && (
                    <div id="popup" className="popup" style={{ width: '35%' }}>
                        <div className="popup-content">
                            <h1>ASSIGN COURSE</h1>
                            <br></br>
                            {this.state.selectedUserType && this.renderAssignCard()}
                            <div className="action">
                                <button type="button" onClick={this.handleCloseStudentModal} className="cancel-button">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {this.state.isReportModalOpen && (
                    <div id="popup" className="popup" style={{ width: '40%' }}>
                        <div className="popup-content">
                        <div>
                            <ReportTable />
                        </div>
                        <div className="action">
                            <button type="button" onClick={this.handleCloseReportModal} className="cancel-button">
                                Close
                            </button>
                        </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default AdminProfile;

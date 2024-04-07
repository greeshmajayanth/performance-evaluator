import React, { Component } from 'react';
import axios from 'axios'; 
import ChatComponent from '../chat/chat.js';
import '../../dashboard.css'; 
import apiUrl from '../../apiConfig';

class Instructor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isChatOpen: false,
            courseName: '',
            courseDescription: ''
        };

    }

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

    toggleChat = () => {
        this.setState({ isChatOpen: !this.state.isChatOpen});
    };

    render() {

        // Retrieve the JSON string from localStorage
        const user_data_json = localStorage.getItem('user_data');

        // Parse the JSON string to get the object
        const user_data = JSON.parse(user_data_json);

        console.log(user_data)

        return (
            <div id="instructor" className="page styled-card">
                <div className="user-details">
                    <h2>Welcome, {user_data.firstName} {user_data.lastName} !</h2>
                </div>
                <section className="exams section">
                    <h2>COURSE DETAILS</h2>
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
                            <button onClick={this.onSubmitCreateCourse} className="update-button">Submit</button>
                        </div>
                </section>

                <section className="exams section">
                    <h2>Create Exam</h2><br />
                    <form id="feedback-form">
                        <strong><label htmlFor="student-name-input">Course Name:</label></strong>
                        <input type="text" id="student-name-input" name="student-name-input" required />

                        <strong><label htmlFor="feedback-input">Exam Name:</label></strong>
                        <textarea id="feedback-input" name="feedback-input" required></textarea>

                        <button className="update-button">Create Exam</button>
                    </form>

                    <table id="feedback-table">
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Exam Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Introduction to Programming</td>
                                <td>IP-1</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="exams section">
                    {/* Student Performance Monitoring */}
                    <div className="performance-monitoring">
                        <h2>Student Performance Monitoring</h2>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Course</th>
                                    <th>Attendance (%)</th>
                                    <th>Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Jahanvi Patel</td>
                                    <td>Introduction to Programming</td>
                                    <td>90%</td>
                                    <td>A</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <div className={`chat-button ${this.state.isChatOpen ? 'active' : ''}`} onClick={this.toggleChat}>
                    <span>&#9998;</span> Chat
                </div>

                {this.state.isChatOpen && (
                    <div className="chat-window">
                        <p>Chat with Admin</p>
                        <ChatComponent />
                    </div>
                )}
            </div>
        );
    }
}

export default Instructor;

import React, { Component } from 'react';
import PCAnalytics from './PCAnalytics';
import InstructorAnalytics from './instructorAnalytics';
import StudentAnalytics from './studentAnalytics';
import ChatComponent from '../chat/chat.js';
import '../../dashboard.css'; 

class QAProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPCAnalytics: false,
            showStudentAnalytics: false,
            showInstructorAnalytics: false,
            blurBackground: false,
            isChatOpen: false
        };

    }

    showPCAnalytics = () => {
        this.setState({
            showPCAnalytics: true,
            blurBackground: true
        });
    };

    showStudentAnalytics = () => {
        this.setState({
            showStudentAnalytics: true,
            blurBackground: true
        });
    };

    showInstructorAnalytics = () => {
        this.setState({
            showInstructorAnalytics: true,
            blurBackground: true
        });
    };
    
    hidePopup = () => {
        this.setState({
            showPCAnalytics: false,
            showStudentAnalytics: false,
            showInstructorAnalytics: false,
            blurBackground: false
        });
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
            <div>
            <div id="QAofficer" className={`page styled-card ${this.state.blurBackground ? 'blur-background' : ''}`}>
                <div className="detail">
                    <h2>Welcome, {user_data.firstName} {user_data.lastName} !</h2>
                </div>

                <div className="exams section">
                    <h2>Student Data</h2>
                    <table id="student_table">
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Student Name</th>
                                <th>Student Analytics</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>588271</td>
                                <td>Jahanvi Patel</td>
                                <td><button className="update-button" onClick={this.showStudentAnalytics}>View</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="exams section">
                    <h2>Instructor Data</h2>
                    <table id="instructor_table">
                        <thead>
                            <tr>
                                <th>Instructor ID</th>
                                <th>Instructor Name</th>
                                <th>Instructor Analytics</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>573231</td>
                                <td>Dhanush Raj</td>
                                <td><button className="update-button" onClick={this.showInstructorAnalytics}>View</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="exams section">
                    <h2>Program Coordinator Data</h2>
                    <table id="coordinator_table">
                        <thead>
                            <tr>
                                <th>Coordinator ID</th>
                                <th>Coordinator Name</th>
                                <th>Coordinator Analytics</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>759639</td>
                                <td>Akhilesh Mosale</td>
                                <td><button className="update-button" onClick={this.showPCAnalytics}>View</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={`chat-button ${this.state.isChatOpen ? 'active' : ''}`} onClick={this.toggleChat}>
                    <span>&#9998;</span> Chat
                </div>

                {this.state.isChatOpen && (
                    <div className="chat-window">
                        <p>Chat with Admin</p>
                        <ChatComponent />
                    </div>
                )}
                {this.state.showPCAnalytics && 
                    <div id="popup" className="popup">
                        <div className="popup-content">
                            <PCAnalytics />
                            <button onClick={this.hidePopup}>Close</button>
                        </div>
                    </div>
                }

                {this.state.showInstructorAnalytics && 
                    <div id="popup" className="popup">
                        <div className="popup-content">
                            <InstructorAnalytics />
                            <button onClick={this.hidePopup}>Close</button>
                        </div>
                    </div>
                }

                {this.state.showStudentAnalytics && 
                    <div id="popup" className="popup">
                        <div className="popup-content">
                            <StudentAnalytics />
                            <button onClick={this.hidePopup}>Close</button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default QAProfile;

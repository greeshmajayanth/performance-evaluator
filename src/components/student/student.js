import React, { Component } from 'react';
import '../../dashboard.css'; 
import ChatComponent from '../chat/chat.js';
import ExamReportTable from '../report/examReport.js';

class StudentProfile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            popupVisible: false,
            popupContent: { title: '', description: '' },
            blurBackground: false,
            isChatOpen: false,
            isReportModalOpen: false,
        };

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

    handleOpenReportModal = () => {
        this.setState({ isReportModalOpen: true, blurBackground: true });
    };

    handleCloseReportModal = () => {
        this.setState({ isReportModalOpen: false, blurBackground: false });
    };

    handleStartExam = () => {
        alert("Exam started")
    }

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
            <div id="Student" className={`page styled-card ${this.state.blurBackground ? 'blur-background' : ''}`}>
                <div className="user-details">
                    <div className="detail">
                        <h2>Welcome, {user_data.firstName} {user_data.lastName} !</h2>
                    </div>
                </div>
                <br />

                <section className="exams section">
                    <h2 style={{ color: '#007BFF' }}>Courses</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Course ID</th>
                                <th>Instructor</th>
                                <th>Progress</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Introduction to Programming</td>
                                <td>12345</td>
                                <td>Dhanush Raj</td>
                                <td>Started</td>
                                
                            </tr>
                            <tr>
                                <td>Data Structures and Algorithms</td>
                                <td>67891</td>
                                <td>Elizabeth Diaz</td>
                                <td>Started</td>
                                
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="exams section">
                    <h2 style={{ color: '#007BFF' }}>Exams</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Exam Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Data Structures and Algorithms - 1</td>
                                <td><button className="update-button" onClick={this.handleStartExam}>Start</button></td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="reports section">
                    <h2 style={{ color: '#007BFF' }}>Results</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Exam Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Introduction to Programming</td>
                                <td><button className="update-button" onClick={this.handleOpenReportModal}>View result</button></td>
                            </tr>
                        </tbody>
                    </table>
                </section>
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
                {this.state.popupVisible && (
                    <div id="adminpopup" className="popup">
                        <div className="popup-content">
                            <h2 id="admin-popup-title">{this.state.popupContent.title}</h2>
                            <p id="admin-popup-description">{this.state.popupContent.description}</p>
                            <button onClick={this.adminhidePopup}>Close</button>
                        </div>
                    </div>
                )}
                {this.state.isReportModalOpen && (
                    <div id="popup" className="popup" style={{ width: '40%' }}>
                        <div className="popup-content">
                        <div>
                            <ExamReportTable />
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

export default StudentProfile;

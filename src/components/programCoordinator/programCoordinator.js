import React, { Component } from 'react';
import ChatComponent from '../chat/chat.js';
import '../../dashboard.css'; 

class ProgramCoordinator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isChatOpen: false
        };

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
            <div id="programCO" className="page styled-card">
                <div className="user-details">
                    <h1>Welcome, {user_data.firstName} {user_data.lastName} !</h1>
                </div>
                <br />
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

                                <tr>
                                    <td>Achal</td>
                                    <td>Data Structures and Algorithms</td>
                                    <td>77%</td>
                                    <td>B</td>
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

export default ProgramCoordinator;

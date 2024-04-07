import React, { Component } from 'react';
import '../../analytics.css';

class StudentAnalytics extends Component {
    render() {
        return (
            <div className="container">
                <h2>Course Details</h2>
                <div className="analytics">
                    <div className="metric">
                        <h3>Total Enrollments</h3>
                        <p>2</p>
                    </div>
                    <div className="metric">
                        <h3>Average Rating</h3>
                        <p>4</p>
                    </div>
                    <div className="metric">
                        <h3>Completion Rate</h3>
                        <p>80%</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentAnalytics;

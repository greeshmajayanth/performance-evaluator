import React, { Component } from 'react';
import '../../analytics.css';

class InstructorAnalytics extends Component {
    render() {
        return (
            <div className="container">
                <h2>Dhanush's Performance</h2>
                <div className="analytics">
                    <div className="metric">
                        <h3>Course Completion Rate</h3>
                        <p>80%</p>
                    </div>
                    <div className="metric">
                        <h3>Student Ratings</h3>
                        <p>4.6</p>
                    </div>
                    <div className="metric">
                        <h3>Feedback Responses</h3>
                        <p>50</p>
                    </div>
                    <div className="metric">
                        <h3>Average Assignment Score</h3>
                        <p>82%</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default InstructorAnalytics;

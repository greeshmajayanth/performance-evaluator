import React, { Component } from 'react';
import '../../analytics.css'; // Import your CSS file

class PCAnalytics extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h2>Akhilesh's Performance</h2>
                    <div className="analytics">
                        <div className="metric">
                            <h3>Total Students</h3>
                            <p>1000</p>
                        </div>
                        <div className="metric">
                            <h3>Total Courses</h3>
                            <p>10</p>
                        </div>
                        <div className="metric">
                            <h3>Enrollment Rate</h3>
                            <p>80%</p>
                        </div>
                        <div className="metric">
                            <h3>Average Student Rating</h3>
                            <p>4.5</p>
                        </div>
                        <div className="metric">
                            <h3>Completion Rate</h3>
                            <p>65%</p>
                        </div>
                        <div className="metric">
                            <h3>Program Revenue</h3>
                            <p>$50,000</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PCAnalytics;

import React, { Component } from 'react';
import axios from 'axios'; 
import '../../dashboard.css';
import apiUrl from '../../apiConfig';

class CourseComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            popupVisible: false,
            blurBackground: false,
            popupContent: { title: '', description: '' }
        };
    }

    componentDidMount() {

        // Fetch course data when the component mounts
        axios.get(apiUrl+'/courses/read.php')
          .then(response => {
            console.log(response.data.course_data)
            
            const courses = response.data.course_data
            this.setState({courses})
            
          })
          .catch(error => {
            console.error('Error during course data fetch:', error.message);
          });
      }

    showPopup = (title, description) => {
        this.setState({
            popupContent: { title, description },
            popupVisible: true,
            blurBackground: true
        });
    };
    
    hidePopup = () => {
        this.setState({
            popupVisible: false,
            blurBackground: false
        });
    };    

    render() {
        const courses = this.state.courses;
        return (
            <div id="course" className="page styled-card">
               
               {courses.length > 0 ? (
                <div className={`card-container ${this.state.blurBackground ? 'blur-background' : ''}`}>
                    {courses.map((course, index) => (
                        <div className="card" key={`${course.courseID}-${index}`} onClick={() => this.showPopup(course.courseDescription)}>
                            <h3>{course.courseName}</h3>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
                {this.state.popupVisible && 
                        <div id="popup" className="popup">
                            <div className="popup-content">
                                <h2 id="popup-title">{this.state.popupContent.title}</h2>
                                <p id="popup-description">{this.state.popupContent.description}</p>
                                <button onClick={this.hidePopup}>Close</button>
                            </div>
                        </div>
                    }
            </div>
        );
    }
}

export default CourseComponent;

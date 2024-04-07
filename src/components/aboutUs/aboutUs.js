import React, { Component } from 'react';
import '../../dashboard.css'; // Import your CSS file

class AboutUs extends Component {

  render() {

    return (
               
        <div id="about" class="page styled-card">
            <h2>About Us</h2>
            <p>Welcome to our academic program dedicated to the enhancement and measurement of performance in
                various fields of study.
                At the heart of our educational endeavor is the commitment to nurturing excellence, continuous
                improvement, and the
                development of skills that lead to tangible outcomes.

                Our program places a strong emphasis on the critical role of performance measurement and assessment
                in the educational
                landscape. We understand that assessing students' performance is not only about grades; it's a
                comprehensive approach that
                allows us to gauge their progress, identify areas of growth, and empower them to reach their full
                potential.</p>
            <p></p>
            <h2>Program objectives</h2>
            <h4>1. Enhance Academic achievement:</h4>
            <p>Our primary objective is to elevate academic achievement among our students.
                We strive to provide an environment where learning flourishes, knowledge is applied
                effectively, and students excel in their chosen fields of study. </p>

            <h4>2. Foster critical thinking:</h4>
            <p>We aim to cultivate critical thinking skills that empower our students to analyze
                complex problems, make informed decisions, and contribute positively to their respective industries.
            </p>

            <h4>3. Promote continuous learning:</h4>
            <p>Our program is designed to instill a passion for lifelong learning. We encourage our students to
                stay curious, adapt to evolving trends, and continually refine their skills.</p>

            <h4>4. Prepare for real world success:</h4>
            <p>We prepare our students not only for academic success but also for success in the real world. Our
                program equips them with practical knowledge, problem-solving abilities, and the adaptability needed
                to excel in their careers. </p>
        </div>
                        
    );
  }
}

export default AboutUs;
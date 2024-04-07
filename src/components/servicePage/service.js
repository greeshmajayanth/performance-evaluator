import React, { Component } from 'react';
import '../../dashboard.css'; // Import your CSS file

class Services extends Component {

  render() {

    return (
               
        <div id="service" class="page styled-card">
            <h2>Services offered by us</h2>
            <h4>1. Performance Metrics and Analytics:</h4>
            <p>The website can offer tools and services to collect, analyze, and visualize performance metrics for
                businesses
                or individuals. This might include tracking website traffic and user engagement, monitoring server
                and application
                performance, or assessing the efficiency of marketing campaigns. Users can access </p>

            <h4>2. Online Exam Hosting:</h4>
            <p>The website provides a platform for educators, trainers, or organizations to host online exams and
                assessments.
                Users can create and customize exams, set time limits, and define grading criteria.
            </p>

            <h4>3. Automated Grading:</h4>
            <p>The website includes automated grading features, which can save time and reduce human error. It can
                handle multiple-choice questions,
                true/false questions, and even certain types of open-ended questions using AI-based grading
                algorithms.</p>

            <h4>4. Human Grading:</h4>
            <p>For assignments that require subjective evaluation, such as essays or projects, the website can
                facilitate human grading.
                Experienced educators or experts in the field review and grade the submissions according to specific
                rubrics and guidelines. </p>

            <h4>4.Performance Improvement Recommendations:</h4>
            <p>Based on the data collected and analyzed, the website can offer tailored recommendations for
                performance improvement. These recommendations might
                include optimizing website load times, suggesting content changes to increase user engagement, or
                advising on cost-saving measures for infrastructure
                and operations. Users can receive actionable insights to enhance their performance. </p>

        </div>
                        
    );
  }
}

export default Services;
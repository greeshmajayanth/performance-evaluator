import React, { Component } from 'react';
import '../../dashboard.css'; // Import your CSS file

class HomePage extends Component {

  render() {

    return (
               
            <div id="home" class="page styled-card">

                    <section class="overview">
                        <h2>Academic Program Overview</h2>
                        <p>
                            The Master of Science in Computer Science program is designed to provide students with
                            advanced knowledge and skills in various areas of computer science. Our program covers
                            a wide range of topics, including algorithms, data structures, artificial intelligence,
                            and software development.
                        </p>
                        <p>
                            Our dedicated faculty and cutting-edge curriculum ensure that students are well-prepared
                            for the challenges and opportunities in the field of computer science.
                        </p>
                    </section>
                    <section class="importance">
                        <h2>Importance of Performance Measurement and Assessment</h2>
                        <p>
                            Performance measurement and assessment play a critical role in our program. We believe
                            that evaluating students' performance is essential for continuous improvement and
                            ensuring that they acquire the necessary skills and knowledge.
                        </p>
                        <p>
                            Through regular assessments and feedback, we help our students identify their strengths
                            and areas for improvement. This process not only enhances their academic experience but
                            also prepares them for success in their careers.
                        </p>
                    </section>
                    <footer>
                        <p>&copy; 2023 Computer Science Performance of MSC</p>
                    </footer>

            </div>
                        
    );
  }
}

export default HomePage;

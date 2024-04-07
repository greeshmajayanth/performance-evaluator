import React, { Component } from 'react';

class ReportTable extends Component {
  constructor(props) {
    super(props);

    // Sample data for demonstration
    this.state = {
      courses: [
        {
          courseName: 'Introduction to Programming',
          numStudents: 2,
          instructor: 'Dhanush Raj',
          classAverage: 85,
          progress: 'In Progress',
        },
        {
          courseName: 'Data Structures and Algorithms',
          numStudents: 3,
          instructor: 'Elizabeth Diaz',
          classAverage: 92,
          progress: 'Completed',
        }
      ],
    };
  }

  render() {
    const { courses } = this.state;

    return (
      <div>
        <h2>Program Report</h2>
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Number of Students</th>
              <th>Instructor</th>
              <th>Class Average</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>{course.courseName}</td>
                <td>{course.numStudents}</td>
                <td>{course.instructor}</td>
                <td>{course.classAverage}</td>
                <td>{course.progress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ReportTable;

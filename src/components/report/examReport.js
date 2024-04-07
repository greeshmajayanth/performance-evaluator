import React, { Component } from 'react';

class ExamReportTable extends Component {
  constructor(props) {
    super(props);

    // Sample data for demonstration
    this.state = {
      courses: [
        {
          courseName: 'Introduction to Programming',
          marks: 85/100,
          grade: 'B',
          classAverage: 82
        }
      ],
    };
  }

  render() {
    const { courses } = this.state;

    return (
      <div>
        <h2>Exam Report</h2>
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Class Average</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>{course.courseName}</td>
                <td>{course.marks}</td>
                <td>{course.grade}</td>
                <td>{course.classAverage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ExamReportTable;
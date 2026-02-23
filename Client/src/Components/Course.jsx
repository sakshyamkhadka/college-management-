import React from 'react'
import '../Styles/Course.css'

const Course = () => {
    return (
        <div className="coursemain">


            <div className="courseimage">
                <img src="https://tse2.mm.bing.net/th/id/OIP.LlSUKvKujxn32Q-uNNQ9tgHaFj?rs=1&pid=ImgDetMain&o=7&rm=3" alt="" />
            </div>
            <div className="coursetext">
                <h1>Our Courses</h1>
                <h2>BCA (Bachelor Of Computer Application)</h2>
                <p>It is an academic 4-year, eight-semester course recently launched by Tribhuvan University.
                    The main mission of this course here at PNC is to prosper the student with sound theoretical concept of computer science and application keeping the latest research and innovation in mind.</p>
                <p>The course structure of BCA is one of Nepal's most updated and dynamic courses.
                    It consists of a semester project in the 4th, 5th, and 8th semesters. These projects
                    will be carried out in collaboration with IT industry and academia. There is an on-the-job training opportunity
                    for the student in the final semester in the form of Internship.</p>
              
    <div className="course-structure-container">
      <h2 className="course-heading">Course Structure</h2>

      <table className="course-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Credit Hours</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Core Courses</td>
            <td>71 Cr. Hr.</td>
          </tr>
          <tr>
            <td>Elective Courses</td>
            <td>12 Cr. Hr.</td>
          </tr>
          <tr>
            <td>Mathematics & Statistical Courses</td>
            <td>9 Cr. Hr.</td>
          </tr>
          <tr>
            <td>Project & Internship</td>
            <td>13 Cr. Hr.</td>
          </tr>
        </tbody>
      </table>
    </div>
  

            </div>
        </div>
    )
}

export default Course









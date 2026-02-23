import React from "react";
import "../Styles/Grades.css";

const StudentGrades = () => {
    const grades = [
        {
            id: 1,
            subject: "Numerical Methods",
            code: "MTH-204",
            credit: 3,
            grade: "A",
            gradePoint: 4.0,
        },
        {
            id: 2,
            subject: "Operating Systems",
            code: "CSC-205",
            credit: 3,
            grade: "B+",
            gradePoint: 3.3,
        },
        {
            id: 3,
            subject: "Software Engineering",
            code: "CSC-206",
            credit: 3,
            grade: "A-",
            gradePoint: 3.7,
        },
        {
            id: 4,
            subject: "Scripting Language",
            code: "CSC-207",
            credit: 3,
            grade: "B",
            gradePoint: 3.0,
        },
        {
            id: 5,
            subject: "Database Management System",
            code: "CSC-208",
            credit: 3,
            grade: "A",
            gradePoint: 4.0,
        },
    ];

    const calculateGPA = () => {
        let totalPoints = 0;
        let totalCredits = 0;

        grades.forEach((g) => {
            totalPoints += g.gradePoint * g.credit;
            totalCredits += g.credit;
        });

        return (totalPoints / totalCredits).toFixed(2);
    };

    return (
        <div className="grades-container">
            <h1>BCA 4th Semester Grades</h1>

            <table className="grades-table">
                <thead>
                    <tr>
                        <th>Subject Code</th>
                        <th>Subject</th>
                        <th>Credit</th>
                        <th>Grade</th>
                        <th>Grade Point</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.map((g) => (
                        <tr key={g.id}>
                            <td>{g.code}</td>
                            <td>{g.subject}</td>
                            <td>{g.credit}</td>
                            <td className="grade">{g.grade}</td>
                            <td>{g.gradePoint}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="gpa-box">
                <h3>Semester GPA</h3>
                <p>{calculateGPA()}</p>
            </div>
        </div>
    );
};

export default StudentGrades;

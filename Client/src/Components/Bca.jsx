import React, { useState } from "react";
import "../Styles/bca.css";
import { FaBook } from "react-icons/fa";

const Bca = () => {
  const [activeYear, setActiveYear] = useState(1);

  const syllabusData = {
    1: [
      {
        name: "Semester 1",
        subjects: [
          { name: "Computer Fundamentals & Applications", type: "Core" },
          { name: "Society and Technology", type: "Social Science & Management" },
          { name: "English I", type: "Language" },
          { name: "Mathematics I", type: "Mathematics & Statistics" },
          { name: "Digital Logic", type: "Core" },
        ],
      },
      {
        name: "Semester 2",
        subjects: [
          { name: "C Programming", type: "Core" },
          { name: "Financial Accounting", type: "Social Science & Management" },
          { name: "English II", type: "Language" },
          { name: "Mathematics II", type: "Mathematics & Statistics" },
          { name: "Microprocessor and Computer Architecture", type: "Core" },
        ],
      },
    ],
    2: [
      {
        name: "Semester 3",
        subjects: [
          { name: "Data Structures and Algorithms", type: "Core" },
          { name: "Probability and Statistics", type: "Mathematics & Statistics" },
          { name: "System Analysis and Design", type: "Core" },
          { name: "OOP in Java", type: "Core" },
          { name: "Web Technology", type: "Core" },
        ],
      },
      {
        name: "Semester 4",
        subjects: [
          { name: "Operating System", type: "Core" },
          { name: "Numerical Methods", type: "Mathematics & Statistics" },
          { name: "Software Engineering", type: "Core" },
          { name: "Scripting Language", type: "Core" },
          { name: "Database Management System", type: "Core" },
          { name: "Project I", type: "Project & Internship" },
        ],
      },
    ],
    3: [
      {
        name: "Semester 5",
        subjects: [
          { name: "MIS and E‑Business", type: "Core" },
          { name: "DotNet Technology", type: "Core" },
          { name: "Computer Networking", type: "Core" },
          { name: "Introduction to Management", type: "Social Science & Management" },
          { name: "Computer Graphics and Animation", type: "Elective" },
        ],
      },
      {
        name: "Semester 6",
        subjects: [
          { name: "Mobile Programming", type: "Core" },
          { name: "Distributed System", type: "Core" },
          { name: "Applied Economics", type: "Social Science & Management" },
          { name: "Advanced Java Programming", type: "Core" },
          { name: "Network Programming", type: "Elective" },
          { name: "Project II", type: "Project & Internship" },
        ],
      },
    ],
    4: [
      {
        name: "Semester 7",
        subjects: [
          { name: "Cyber Law and Professional Ethics", type: "Core" },
          { name: "Cloud Computing", type: "Core" },
          { name: "Internship", type: "Project & Internship" },
          { name: "Elective I", type: "Elective" },
          { name: "Elective II", type: "Elective" },
        ],
      },
      {
        name: "Semester 8",
        subjects: [
          { name: "Operations Research", type: "Core" },
          { name: "Project III", type: "Project & Internship" },
          { name: "Elective III", type: "Elective" },
          { name: "Elective IV", type: "Elective" },
        ],
      },
    ],
  };

  return (
    <div className="bca-container">
      <h1 className="bca-title">Bachelor of Computer Applications (BCA)</h1>

      <div
        className="bca-about-section"
        style={{ display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "30px", flexWrap: "wrap" }}
      >
        <div className="bca-about-image">
          <img
            src="/Images/lab1.png"
            alt="Computer Lab"
            style={{ width: "300px", borderRadius: "8px" }}
          />
        </div>
        <div className="bca-about-text">
          <p className="bca-description">
            The Bachelor of Computer Applications (BCA) at Tribhuvan University (TU) is a
            comprehensive four-year undergraduate program designed to produce skilled IT
            professionals who are well-versed in both theory and practical applications.
          </p>
          <p className="bca-description">
            The BCA program emphasizes a solid foundation in programming, computer
            science fundamentals, and software development practices. It also covers
            modern computing technologies and prepares students to adapt to rapid
            changes in the IT industry.
          </p>
        </div>
      </div>

      <h2 className="bca-heading">Credit Hours Distribution</h2>
      <ul className="bca-list">
        <li>Core Courses: 71 Cr. Hr.</li>
        <li>Elective Courses: 12 Cr. Hr.</li>
        <li>Mathematics & Statistics Courses: 9 Cr. Hr.</li>
        <li>Language Courses: 6 Cr. Hr.</li>
        <li>Social Science & Management Courses: 15 Cr. Hr.</li>
        <li>Project & Internship: 13 Cr. Hr.</li>
      </ul>

      <h2 className="bca-heading">BCA Syllabus (TU)</h2>
      <div className="bca-year-tabs">
        {[1, 2, 3, 4].map((year) => (
          <button
            key={year}
            className={`bca-year-btn ${activeYear === year ? "active" : ""}`}
            onClick={() => setActiveYear(year)}
          >
            Year {year}
          </button>
        ))}
      </div>

      {syllabusData[activeYear].map((sem, index) => (
        <div className="bca-sem-card open" key={index}>
          <div className="bca-sem-header">
            <h4>{sem.name}</h4>
          </div>
          <div className="bca-sem-body">
            <ul>
              {sem.subjects.map((sub, i) => (
                <li key={i}>
                  <span className="icon"><FaBook /></span> {sub.name}{" "}
                  <span className="bca-sub-type">({sub.type})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bca;

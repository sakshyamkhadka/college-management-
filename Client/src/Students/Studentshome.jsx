import React from "react";
import "../Styles/studentHome.css";

const StudentHome = () => {

  /* ===== STATIC DATA (BACKEND READY) ===== */

  const studentInfo = {
    name: "Sakshyam Khadka",
    semester: "BCA 4th Semester",
    gpa: "3.4",
    attendance: "82%",
    subjects: 5,
  };

  const upcomingTasks = [
    { title: "DBMS Assignment", date: "15 Aug" },
    { title: "Operating System Exam", date: "22 Aug" },
  ];

  const announcements = [
    "Internal exam starts from next week",
    "Project proposal submission deadline approaching",
  ];

  const gradeSummary = [
    { label: "A", percent: 40, color: "#4caf50" },
    { label: "B", percent: 40, color: "#2196f3" },
    { label: "C", percent: 20, color: "#ffc107" },
  ];

  /* ====================================== */

  return (
    <div className="home-dashboard">

      {/* Welcome */}
      <div className="welcome-card">
        <h2>Welcome back, {studentInfo.name}</h2>
        <p>{studentInfo.semester}</p>
      </div>

      {/* Quick Stats */}
      <div className="cards">
        <div className="card">
          <h3>Subjects</h3>
          <p>{studentInfo.subjects}</p>
        </div>

        <div className="card">
          <h3>GPA</h3>
          <p>{studentInfo.gpa}</p>
        </div>

        <div className="card">
          <h3>Attendance</h3>
          <p>{studentInfo.attendance}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="home-grid">

        {/* Upcoming */}
        <div className="section-card">
          <h3>Upcoming</h3>
          <ul>
            {upcomingTasks.map((task, index) => (
              <li key={index}>
                <strong>{task.title}</strong>
                <span>{task.date}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Grade Overview */}
        <div className="section-card">
          <h3>Grade Overview</h3>

          <div className="grade-bars">
            {gradeSummary.map((grade, index) => (
              <div key={index} className="grade-row">
                <span>{grade.label}</span>
                <div className="bar-bg">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${grade.percent}%`,
                      background: grade.color,
                    }}
                  ></div>
                </div>
                <span>{grade.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="section-card">
          <h3>Announcements</h3>
          <ul>
            {announcements.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default StudentHome;

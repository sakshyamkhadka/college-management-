import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../Styles/studentDashboard.css";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2> Students Dashboard</h2>
        <ul>
          <li><NavLink to="/student-dashboard/" end>Home</NavLink></li>
          <li><NavLink to="/student-dashboard/profile">Profile</NavLink></li>
          <li><NavLink to="/student-dashboard/assignments">Assignments</NavLink></li>
          <li><NavLink to="/student-dashboard/attendance">Attendance</NavLink></li>
          <li><NavLink to="/student-dashboard/exam">Exam</NavLink></li>
          <li><NavLink to="/student-dashboard/course">Course</NavLink></li>
          <li><NavLink to="/student-dashboard/examresult">Result</NavLink></li>
          <li><NavLink to="/student-dashboard/event">Event</NavLink></li>
          {/* <li><NavLink to="/student-dashboard/fee">Fee</NavLink></li> */}
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>

      </aside>
      <main className="main-content">
        {/* <Home/> */}
        <Outlet />
      </main>
    </div>
  );
};

export default StudentDashboard;

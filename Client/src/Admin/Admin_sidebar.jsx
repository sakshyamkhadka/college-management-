import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/sidebar.css"

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); 
  };
  

  return (
    <div className="admin-sidebar">
      <h2 className="logo">College Admin</h2>

      <nav>
        <Link to="/admin-dashboard">
     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqN6issDQYzEDO7hFseg8_EXGts0xbWRMPFw&s" alt="" />

        </Link>
        <Link to="/admin-dashboard/courses">Courses</Link>
        <Link to="/admin-dashboard/assignments">Assignments</Link>
        <Link to="/admin-dashboard/users">Users</Link>
        <Link to="/admin-dashboard/exams">Exams</Link>
        <Link to="/admin-dashboard/attendance">Attendance</Link>
        <Link to="/admin-dashboard/admadmission">Admission</Link>
        <Link to="/admin-dashboard/examresult">Result</Link>
        <Link to="/admin-dashboard/enrollement">Enrollments</Link>
        <Link to="/admin-dashboard/event">Event</Link>
 

      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;

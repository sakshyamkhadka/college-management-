import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./Admin_sidebar";
import CoursesPage from "../Pages/CoursesPage";
import AssignmentsPage from "../Pages/AssignmentsPage";
import UsersPage from "./UsersPage";
import AttendancePage from "../Pages/AttendencePage";
import ExamPage from "../Pages/ExamPage";
import Admin_admission from "./Admin_admission";
import ExamResults from "../Pages/ExamResults";
import FeesPayments from "../Pages/FeesPaymentsPage";
import Enrollments from "./Enrollments";
import Events from "../Pages/Events";


const AdminDashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <div style={{ marginLeft: "220px", padding: "20px", width: "100%" }}>
        <Routes>
          <Route path="/" element={<h1>Welcome Admin 👋</h1>} />

          <Route path="courses" element={<CoursesPage />} />
          <Route path="event" element={<Events />} />
          <Route path="assignments" element={<AssignmentsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="exams" element={<ExamPage />} />
           <Route path="admadmission" element={<Admin_admission />} />
           <Route path="examresult" element={<ExamResults />} />
           <Route path="admfee" element={<FeesPayments />} />
           <Route path="enrollement" element={<Enrollments />} />

        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;

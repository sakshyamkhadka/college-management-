import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./Components/Layout";
import Homepage from "./Pages/Homepage";
import Events from "./Pages/Events";
import Aboutus from "./Pages/Aboutus";
import Admission from "./Pages/Admission";
import Contact from "./Pages/Contact";
import Bca from "./Components/Bca";
import LoginPage from "./Pages/Login";

import StudentDashboard from "./Students/Studentsdashboard";
import StudentProfile from "./Students/StudentProfile";
import StudentCourse from "./Pages/CoursesPage";
import AdminDashboard from "./Admin/AdminDashboard";
import AssignmentsPage from "./Pages/AssignmentsPage";
import ExamPage from "./Pages/ExamPage";
import AttendancePage from "./Pages/AttendencePage";
import CoursesPage from "./Pages/CoursesPage";
import StudentHome from "./Students/StudentHome";
import ExamResults from "./Pages/ExamResults";
import FeesPayments from "./Pages/FeesPaymentsPage";
import EventsPnc from "./Components/EventsPnc";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
        <Route path="assignments" element={<AssignmentsPage />} />

        <Route path="/student-dashboard/*" element={<StudentDashboard />}>
          <Route path="" element={<StudentHome />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="course" element={<StudentCourse />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="assignments" element={<AssignmentsPage />} />
          <Route path="exam" element={<ExamPage />} />
          <Route path="examresult" element={<ExamResults />} /> 
          <Route path="event" element={<EventsPnc />} /> 
          {/* <Route path="fee" element={<FeesPayments />} />  */}
        </Route>

        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="about" element={<Aboutus />} />
          <Route path="admission" element={<Admission />} />
          <Route path="contact" element={<Contact />} />
          <Route path="event" element={<Events />} />
          <Route path="bca" element={<Bca />} />
          <Route path="course" element={<CoursesPage />} />
          <Route path="exam" element={<ExamPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

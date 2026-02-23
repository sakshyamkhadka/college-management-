import React, { useEffect, useState } from "react";
import "../Styles/studentHome.css";
import { getMyProfile, getCourses, getAssignments, getMyAttendance, getMyExamResults } from "../config/Api";

const StudentHome = () => {
  const [profile, setProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const [profileData, coursesData, assignmentsData, attendanceData, resultsData] = await Promise.all([
          getMyProfile(),
          getCourses(),
          getAssignments(),
          getMyAttendance(user.user_id),
          getMyExamResults(user.user_id)
        ]);

        setProfile(profileData);
        setCourses(coursesData || []);
        setAssignments(assignmentsData || []);
        setAttendance(attendanceData || []);
        setResults(resultsData || []);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  // Attendance percentage
  const attendancePercentage = attendance.length
    ? ((attendance.filter(a => a.status === "Present").length / attendance.length) * 100).toFixed(2)
    : "N/A";

  // GPA calculation
  const gpa = results.length
    ? (results.reduce((sum, r) => sum + Number(r.GPA || 0), 0) / results.length).toFixed(2)
    : "N/A";

  return (
    <div className="home-container">
      {/* Welcome */}
      <section className="welcome-card">
        <div>
          <h1>Welcome back, {profile?.first_name || "Student"} 👋</h1>
          <p>Track your progress, manage courses, and stay ahead.</p>
        </div>
        <div className="welcome-badge">
          Semester: {profile?.semester || "N/A"}
        </div>
      </section>

      {/* Stats */}
      <section className="stats-grid">
        <div className="stat-card">
          <h3>📚 Courses</h3>
          <span>{courses.length}</span>
        </div>

        <div className="stat-card">
          <h3>📝 Assignments</h3>
          <span>{assignments.length}</span>
        </div>

        <div className="stat-card">
          <h3>🎯 Attendance</h3>
          <span>{attendancePercentage}%</span>
        </div>

        <div className="stat-card">
          <h3>🏆 GPA</h3>
          <span>{gpa}</span>
        </div>
      </section>

      {/* Progress & Upcoming Tasks */}
      <section className="home-grid">
        <div className="progress-card">
          <h2>📈 Learning Progress</h2>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${profile?.progress || 75}%` }} />
          </div>
          <p>You're doing great — keep it up!</p>
        </div>

        <div className="upcoming-card">
          <h2>📅 Tasks</h2>
          <ul>
            {assignments.slice(0, 3).map((a) => (
              <li key={a.id}>
                {a.title} <span>{a.due_in}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="announcement-card">
          <h2>🔔 Announcements</h2>
          <p>
            Midterm exams start from <strong>15th March</strong>. Prepare well!
          </p>
        </div>
      </section>
    </div>
  );
};

export default StudentHome;

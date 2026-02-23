import { useState, useEffect } from "react";
import {
  getAttendance,
  getMyAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
  getUsers,
  getCourses
} from "../config/Api";
import "../Styles/AttendancePage.css";

export default function AttendancePage() {
  const [attendance, setAttendance] = useState([]);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    user_id: "",
    course_id: "",
    date: "",
    status: "Present"
  });
  const [editingId, setEditingId] = useState(null);
  const [role, setRole] = useState({});

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    if (userDetails) setRole(userDetails);
  }, []);

  useEffect(() => {
    if (role.role_id) {
      fetchAttendance();
      fetchUsers();
      fetchCourses();
    }
  }, [role]);

  const fetchAttendance = async () => {
    const data =
      [1, 2].includes(role.role_id)
        ? await getAttendance()
        : await getMyAttendance();
    setAttendance(data);
  };

  const fetchUsers = async () => {
    const data = await getUsers();
    const studentUsers = data.filter(u => u.role_id === 5);
    setUsers(studentUsers);
  };

  const fetchCourses = async () => {
    const data = await getCourses();
    setCourses(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (![1, 2].includes(role.role_id)) return;

    if (editingId) {
      await updateAttendance(editingId, form);
      setEditingId(null);
    } else {
      await createAttendance(form);
    }

    setForm({ user_id: "", course_id: "", date: "", status: "Present" });
    fetchAttendance();
  };

  const handleEdit = (att) => {
    setForm({
      user_id: att.user_id,
      course_id: att.course_id,
      date: att.date, 
      status: att.status
    });
    setEditingId(att.attendance_id);
  };

  const handleDelete = async (id) => {
    if (![1, 2].includes(role.role_id)) return;
    await deleteAttendance(id);
    fetchAttendance();
  };

  const calculateAttendancePercentage = () => {
    if (!role.user_id) return 0;
    const myAttendance = attendance.filter(att => att.user_id === role.user_id);
    if (myAttendance.length === 0) return 0;
    const presentCount = myAttendance.filter(att => att.status === "Present").length;
    return ((presentCount / myAttendance.length) * 100).toFixed(2);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="attendance-page">
      <h1 className="page-title">Attendance</h1>

      {role.user_id && ![1, 2].includes(role.role_id) && (
        <div className="attendance-percentage">
          <strong>My Attendance Percentage:</strong>{" "}
          {calculateAttendancePercentage()}%
        </div>
      )}

      {[1, 2].includes(role.role_id) && (
        <div className="attendance-form-card">
          <h2>{editingId ? "Edit Attendance" : "Add Attendance"}</h2>

          <form onSubmit={handleSubmit} className="attendance-form">
            <select
              value={form.user_id}
              onChange={(e) =>
                setForm({ ...form, user_id: e.target.value })
              }
              required
            >
              <option value="">Select Student</option>
              {users.map(u => (
                <option key={u.user_id} value={u.user_id}>
                  {u.username}
                </option>
              ))}
            </select>

            <select
              value={form.course_id}
              onChange={(e) =>
                setForm({ ...form, course_id: e.target.value })
              }
              required
            >
              <option value="">Select Course</option>
              {courses.map(c => (
                <option key={c.course_id} value={c.course_id}>
                  {c.course_name}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              required
            />

            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingId ? "Update Attendance" : "Add Attendance"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      user_id: "",
                      course_id: "",
                      date: "",
                      status: "Present"
                    });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div className="attendance-grid">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Date</th>
              <th>Status</th>
              {[1, 2].includes(role.role_id) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {attendance.map(att => (
              <tr key={att.attendance_id}>
                <td>{att.username}</td>
                <td>{att.course_name}</td>
                <td>{formatDate(att.date)}</td>
                <td>{att.status}</td>
                {[1, 2].includes(role.role_id) && (
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(att)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(att.attendance_id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

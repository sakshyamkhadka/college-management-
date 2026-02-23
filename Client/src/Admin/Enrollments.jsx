import { useEffect, useState } from "react";
import {
  getEnrollments,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
  getUsers,
  getCourses,
} from "../config/Api";
import "../Styles/Enrollments.css";

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  const [formData, setFormData] = useState({
    username: "",
    course_name: "",
    year: "",
    semester: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mapping Year -> Semesters
  const semestersByYear = {
    "Year 1": ["Semester 1", "Semester 2"],
    "Year 2": ["Semester 3", "Semester 4"],
    "Year 3": ["Semester 5", "Semester 6"],
    "Year 4": ["Semester 7", "Semester 8"],
  };

  // Helper to derive year from semester
  const getYearFromSemester = (semester) => {
    for (let year in semestersByYear) {
      if (semestersByYear[year].includes(semester)) return year;
    }
    return "";
  };

  // Fetch all data
  const fetchAll = async () => {
    try {
      setLoading(true);
      const [enrollmentsData, usersData, coursesData] = await Promise.all([
        getEnrollments(),
        getUsers(),
        getCourses(),
      ]);

      setEnrollments(enrollmentsData);
      setUsers(usersData);
      setCourses(coursesData);
    } catch (err) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...formData, [name]: value };

    // Reset semester if year changes
    if (name === "year") {
      updatedForm.semester = "";
    }

    setFormData(updatedForm);
    setError("");
  };

  // Submit form (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Prepare payload for backend
    const payload = {
      username: formData.username,
      course_name: formData.course_name,
      semester: formData.semester,
    };

    try {
      if (editingId) {
        await updateEnrollment(editingId, payload);
      } else {
        await createEnrollment(payload);
      }

      setFormData({ username: "", course_name: "", year: "", semester: "" });
      setEditingId(null);
      fetchAll();
    } catch (err) {
      setError(err.message || "Operation failed");
    }
  };

  // Edit
  const handleEdit = (enrollment) => {
    setEditingId(enrollment.enrollment_id);
    setFormData({
      username: enrollment.username,
      course_name: enrollment.course_name,
      year: getYearFromSemester(enrollment.semester),
      semester: enrollment.semester,
    });
    setError("");
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this enrollment?")) return;

    try {
      await deleteEnrollment(id);
      fetchAll();
    } catch (err) {
      setError(err.message || "Delete failed");
    }
  };

  // Get semesters for selected year
  const semesterOptions = formData.year ? semestersByYear[formData.year] : [];

  return (
    <div className="container">
      <h2>Enrollments</h2>

      {error && <div className="error">{error}</div>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="form-card">
        <h3>{editingId ? "Update Enrollment" : "Create Enrollment"}</h3>

        <label>User:</label>
        <select
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        >
          <option value="">Select User</option>
          {users.map((u) => (
            <option key={u.user_id} value={u.username}>
              {u.first_name} {u.last_name}
            </option>
          ))}
        </select>

        <label>Course:</label>
        <select
          name="course_name"
          value={formData.course_name}
          onChange={handleChange}
          required
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.course_id} value={c.course_name}>
              {c.course_name}
            </option>
          ))}
        </select>

        <label>Year:</label>
        <select
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
        >
          <option value="">Select Year</option>
          {Object.keys(semestersByYear).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <label>Semester:</label>
        <select
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          required
          disabled={!formData.year}
        >
          <option value="">Select Semester</option>
          {semesterOptions.map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>

        <button type="submit" disabled={loading}>
          {editingId ? "Update Enrollment" : "Create Enrollment"}
        </button>
      </form>

      {/* Table */}
      {loading ? (
        <p>Loading enrollments...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Course</th>
              <th>Year</th>
              <th>Semester</th>
              <th>Enrolled On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No enrollments found
                </td>
              </tr>
            ) : (
              enrollments.map((e, index) => (
                <tr key={`enrollment-${e.enrollment_id}`}>
                  <td>{index + 1}</td>
                  <td>{e.username}</td>
                  <td>{e.course_name}</td>
                  <td>{getYearFromSemester(e.semester)}</td>
                  <td>{e.semester}</td>
                  <td>
                    {new Date(e.enrollment_date).toLocaleDateString()}
                  </td>
                  <td>
                    <button onClick={() => handleEdit(e)}>Edit</button>
                    <button onClick={() => handleDelete(e.enrollment_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Enrollments;

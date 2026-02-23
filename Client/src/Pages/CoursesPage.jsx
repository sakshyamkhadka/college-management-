import { useState, useEffect } from "react";
import { getCourses, createCourse, updateCourse, deleteCourse,getMyProfile } from "../config/Api";
import "../Styles/CoursesPage.css";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    course_name: "",
    department: "",
    course_description: "",
    credits: "",
    semester:""
  });
  const [editingId, setEditingId] = useState(null);
  const [role, setRole] = useState({});

  useEffect(() => {
    const storedRole = localStorage.getItem("user");
    if (storedRole) setRole(storedRole.toLowerCase());
    fetchCourses();
  }, []);
    const user_details = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
  if (user_details?.role_id) {
    setRole(user_details);
  }
}, []);


  console.log("Role", role.role_id)

  const fetchCourses = async () => {
    const data = await getCourses();
    setCourses(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role.role_id !== 1) return alert("Not authorized");

    if (editingId) {
      await updateCourse(editingId, form);
      setEditingId(null);
    } else {
      await createCourse(form);
    }

    setForm({
      course_name: "",
      department: "",
      course_description: "",
      credits: ""
    });
    fetchCourses();
  };

  const handleEdit = (course) => {
    setForm(course);
    setEditingId(course.course_id);
  };

  const handleDelete = async (id) => {
    if (role.role_id !== 1) return alert("Not authorized");
    await deleteCourse(id);
    fetchCourses();
  };

  return (
    <div className="courses-page">
      <h1 className="page-title">📘 Courses</h1>

      {role.role_id === 1 && (
        <div className="course-form-card">
          <h2>{editingId ? "Edit Course" : "Add New Course"}</h2>

          <form onSubmit={handleSubmit} className="course-form">
            
            <input
              placeholder="Course Name"
              value={form.course_name}
              onChange={(e) =>
                setForm({ ...form, course_name: e.target.value })
              }
              required
            />

            <select
              value={form.department}
              onChange={(e) =>
                setForm({ ...form, department: e.target.value })
              }
              required
            >
              <option value="">Select Department</option>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
              <option value="CSIT">CSIT</option>
            </select>

            <textarea
              placeholder="Course Description"
              value={form.course_description}
              onChange={(e) =>
                setForm({ ...form, course_description: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Credits"
              value={form.credits}
              min="1"
              max="20"
              onChange={(e) =>
                setForm({ ...form, credits: e.target.value })
              }
              required
            />

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingId ? "Update Course" : "Add Course"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      course_name: "",
                      department: "",
                      course_description: "",
                      credits: ""
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

      <div className="courses-grid">
        {courses.map((c) => (
          <div className="course-card" key={c.course_id}>
            <h3>{c.course_name}</h3>
            <span className="badge">{c.department}</span>

            <p className="description">{c.course_description}</p>

            <div className="course-footer">
              <span className="credits">🎓 {c.credits} Credits</span>

              {role.role_id === 1 && (
                <div className="actions">
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(c.course_id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
  
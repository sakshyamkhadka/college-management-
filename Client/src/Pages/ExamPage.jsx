import { useState, useEffect } from "react";
import {
  getCourses,
  getExams,
  createExam,
  updateExam,
  deleteExam,
} from "../config/Api";
import "../Styles/ExamPage.css";

export default function ExamPage() {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    course_id: "",
    exam_name: "",
    exam_date: "",
    max_marks: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [role, setRole] = useState({});
  const [selectedExamType, setSelectedExamType] = useState(""); 
  const EXAM_NAMES = ["Mid Term Exam", "Pre Board", "Final Board"];
  const MAX_MARKS = [60];

  useEffect(() => {
    const user_details = JSON.parse(localStorage.getItem("user"));
    if (user_details?.role_id) setRole(user_details);
    fetchCourses();
    fetchExams();
  }, []);

  const fetchCourses = async () => {
    const data = await getCourses();
    setCourses(data);
  };

  const fetchExams = async () => {
    const data = await getExams();
    setExams(data);
    setFilteredExams(data); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (![1, 2].includes(role.role_id)) return alert("Not authorized");

    if (editingId) {
      await updateExam(editingId, form);
      setEditingId(null);
    } else {
      await createExam(form);
    }

    setForm({
      course_id: "",
      exam_name: "",
      exam_date: "",
      max_marks: "",
    });

    fetchExams();
  };

  const handleEdit = (exam) => {
    setForm({
      course_id: exam.course_id,
      exam_name: exam.exam_name,
      exam_date: exam.exam_date,
      max_marks: exam.max_marks,
    });
    setEditingId(exam.exam_id);
  };

  const handleDelete = async (id) => {
    if (![1, 2].includes(role.role_id)) return alert("Not authorized");
    await deleteExam(id);
    fetchExams();
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const handleExamTypeChange = (e) => {
    const type = e.target.value;
    setSelectedExamType(type);

    if (!type) {
      setFilteredExams(exams);
    } else {
      setFilteredExams(exams.filter((exam) => exam.exam_name === type));
    }
  };

  return (
    <div className="admin-page">
      <h1>📚 Exams</h1>

      {[1, 2].includes(role.role_id) && (
        <div className="form-card">
          <h2>{editingId ? "Edit Exam" : "Add New Exam"}</h2>
          <form onSubmit={handleSubmit}>
            <select
              value={form.course_id}
              onChange={(e) => setForm({ ...form, course_id: e.target.value })}
              required
            >
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c.course_id} value={c.course_id}>
                  {c.course_name}
                </option>
              ))}
            </select>

            <select
              value={form.exam_name}
              onChange={(e) => setForm({ ...form, exam_name: e.target.value })}
              required
            >
              <option value="">Select Exam Name</option>
              {EXAM_NAMES.map((name, i) => (
                <option key={i} value={name}>
                  {name}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={form.exam_date}
              onChange={(e) => setForm({ ...form, exam_date: e.target.value })}
              required
            />

            <select
              value={form.max_marks}
              onChange={(e) => setForm({ ...form, max_marks: e.target.value })}
              required
            >
              <option value="">Select Max Marks</option>
              {MAX_MARKS.map((marks, i) => (
                <option key={i} value={marks}>
                  {marks}
                </option>
              ))}
            </select>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingId ? "Update Exam" : "Add Exam"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      course_id: "",
                      exam_name: "",
                      exam_date: "",
                      max_marks: "",
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

      <div className="filter-container" style={{ margin: "20px 0" }}>
        <label htmlFor="examType">Filter by Exam Type: </label>
        <select
          id="examType"
          value={selectedExamType}
          onChange={handleExamTypeChange}
        >
          <option value="">All Exams</option>
          {EXAM_NAMES.map((name, i) => (
            <option key={i} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {filteredExams.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Exam Name</th>
                <th>Date</th>
                <th>Max Marks</th>
                {[1, 2].includes(role.role_id) && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredExams.map((exam) => (
                <tr key={exam.exam_id}>
                  <td>{exam.course_name}</td>
                  <td>{exam.exam_name}</td>
                  <td>{formatDate(exam.exam_date)}</td>
                  <td>{exam.max_marks}</td>
                  {[1, 2].includes(role.role_id) && (
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(exam)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(exam.exam_id)}
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
      ) : (
        <div
          style={{
            textAlign: "center",
            marginTop: "50px",
            fontSize: "1.5rem",
            fontStyle: "italic",
            color: "#555",
          }}
        >
          📌 No exams found
        </div>
      )}
    </div>
  );
}

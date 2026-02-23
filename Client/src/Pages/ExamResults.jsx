import { useState, useEffect } from "react";
import {
  getExamResults,
  getMyExamResults,
  createExamResult,
  updateExamResult,
  deleteExamResult,
  getExams,
  getUsers,
} from "../config/Api";
import "../Styles/ExamResults.css";

export default function ExamResults() {
  const [results, setResults] = useState([]);
  const [exams, setExams] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    course_name: "",
    username: "",
    marks_obtained: "",
    grade: "",
    GPA: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setRole(user);
  }, []);

  useEffect(() => {
    if (role) fetchData();
  }, [role]);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const examsData = await getExams();
      setExams(examsData);

      if ([1, 2].includes(role.role_id)) {
        const usersData = await getUsers();
        setUsers(usersData);
        const resultsData = await getExamResults();
        setResults(resultsData);
      } else {
        const resultsData = await getMyExamResults(role.user_id);
        setResults(resultsData);
      }
    } catch (err) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;
    let updatedForm = { ...form, [e.target.name]: value };

    if (e.target.name === "marks_obtained") {
      const marks = parseFloat(value);
      if (!isNaN(marks)) {
        if (marks >= 90) updatedForm.grade = "A+";
        else if (marks >= 80) updatedForm.grade = "A";
        else if (marks >= 70) updatedForm.grade = "B+";
        else if (marks >= 60) updatedForm.grade = "B";
        else if (marks >= 50) updatedForm.grade = "C";
        else if (marks >= 40) updatedForm.grade = "D";
        else updatedForm.grade = "F";

        if (marks >= 90) updatedForm.GPA = 4.0;
        else if (marks >= 80) updatedForm.GPA = 3.0;
        else if (marks >= 70) updatedForm.GPA = 2.0;
        else if (marks >= 60) updatedForm.GPA = 1.0;
        else updatedForm.GPA = 0.0;
      } else {
        updatedForm.grade = "";
        updatedForm.GPA = "";
      }
    }

    setForm(updatedForm);
  };

  const resetForm = () => {
    setForm({ course_name: "", username: "", marks_obtained: "", grade: "", GPA: "" });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (![1, 2].includes(role.role_id)) return;
    try {
      if (editingId) {
        await updateExamResult(editingId, form);
      } else {
        await createExamResult(form);
      }
      resetForm();
      fetchData();
    } catch (err) {}
  };

  const handleEdit = (r) => {
    setForm({
      course_name: r.course_name,
      username: r.username,
      marks_obtained: r.marks_obtained,
      grade: r.grade,
      GPA: Number(r.GPA),
    });
    setEditingId(r.result_id);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteExamResult(deleteId);
      fetchData();
    } catch (err) {} finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const calculateGPA = () => {
    if (!results.length) return 0;
    const total = results.reduce((sum, r) => sum + Number(r.GPA || 0), 0);
    return (total / results.length).toFixed(2);
  };

  const getGPAClass = (gpa) => {
    if (gpa >= 4) return "exam-results-gpa-4";
    if (gpa >= 3.5) return "exam-results-gpa-3-5";
    if (gpa >= 3) return "exam-results-gpa-3";
    if (gpa >= 2) return "exam-results-gpa-2-5";
    if (gpa >= 1) return "exam-results-gpa-2";
    return "exam-results-gpa-0";
  };

  if (loading) return <p>Loading exam results...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="exam-results-container">
      <h1>📊 Exam Results</h1>

      {[1, 2].includes(role.role_id) && (
        <div className="exam-results-form-card">
          <h2>{editingId ? "Edit Result" : "Add Result"}</h2>
          <form onSubmit={handleSubmit}>
            <select
              name="course_name"
              value={form.course_name}
              onChange={handleChange}
              required
            >
              <option value="">Select Course</option>
              {exams.map((e) => (
                <option key={e.course_id} value={e.course_name}>
                  {e.course_name}
                </option>
              ))}
            </select>

            <select
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            >
              <option value="">Select Student</option>
              {users.map((u) => (
                <option key={u.user_id} value={u.username}>
                  {u.first_name} {u.last_name}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="marks_obtained"
              placeholder="Marks"
              value={form.marks_obtained}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="grade"
              placeholder="Grade"
              value={form.grade}
              readOnly
            />

            <input
              type="text"
              name="GPA"
              placeholder="GPA"
              value={form.GPA !== "" ? Number(form.GPA).toFixed(2) : ""}
              readOnly
            />

            <button type="submit">{editingId ? "Update Result" : "Add Result"}</button>
          </form>
        </div>
      )}

      {results.length ? (
        <>
          <table className="exam-results-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Course</th>
                {role.role_id !== 5 && <th>Student</th>}
                <th>Marks</th>
                <th>Grade</th>
                <th>GPA</th>
                {[1, 2].includes(role.role_id) && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.result_id}>
                  <td>{r.result_id}</td>
                  <td>{r.course_name}</td>
                  {role.role_id !== 5 &&
                    <td>{r.first_name ? `${r.first_name} ${r.last_name}` : r.username}</td>}
                  <td>{r.marks_obtained}</td>
                  <td>
                    <span className={`exam-results-gpa-badge ${getGPAClass(Number(r.GPA))}`}>
                      {r.grade}
                    </span>
                  </td>
                  <td>{Number(r.GPA).toFixed(2)}</td>
                  {[1, 2].includes(role.role_id) && (
                    <td>
                      <button className="exam-results-edit" onClick={() => handleEdit(r)}>Edit</button>
                      <button className="exam-results-delete" onClick={() => confirmDelete(r.result_id)}>Delete</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {role.role_id === 5 && (
            <p className="exam-results-total-gpa">🎓 Your GPA is: {calculateGPA()}</p>
          )}
        </>
      ) : (
        <p>📌 No Exam Results</p>
      )}

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this result?</p>
            <button onClick={handleDelete}>Yes, Delete</button>
            <button onClick={() => { setShowDeleteModal(false); setDeleteId(null); }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

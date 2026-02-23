import React, { useEffect, useState } from "react";
import {
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  downloadAssignmentFile,
  getCourses,
} from "../config/Api";
import "../Styles/AssignmentsPage.css";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [role, setRole] = useState({});
  const [form, setForm] = useState({
    course_id: "",
    title: "",
    description: "",
    assigned_date: "",
    due_date: "",
    max_marks: "",
  });
  const [formFile, setFormFile] = useState(null);

  useEffect(() => {
    const user_details = JSON.parse(localStorage.getItem("user"));
    if (user_details?.role_id) setRole(user_details);
    fetchAssignments();
    fetchCourses();
  }, []);

  const fetchAssignments = async () => {
    const data = await getAssignments();
    setAssignments(data);
  };

  const fetchCourses = async () => {
    const data = await getCourses();
    setCourses(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role.role_id !== 1) return alert("Not authorized");

    const formData = new FormData();
    formData.append("course_id", form.course_id);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("assigned_date", form.assigned_date);
    formData.append("due_date", form.due_date);
    formData.append("max_marks", form.max_marks);
    if (formFile) formData.append("file", formFile);

    if (editingId) {
      await updateAssignment(editingId, formData);
      setEditingId(null);
    } else {
      await createAssignment(formData);
    }

    setForm({
      course_id: "",
      title: "",
      description: "",
      assigned_date: "",
      due_date: "",
      max_marks: "",
    });
    setFormFile(null);
    fetchAssignments();
  };

  const handleEdit = (a) => {
    setEditingId(a.assignment_id);
    setForm({
      course_id: a.course_id,
      title: a.title,
      description: a.description,
      assigned_date: a.assigned_date?.slice(0, 10),
      due_date: a.due_date?.slice(0, 10),
      max_marks: a.max_marks,
    });
  };

  const handleDelete = async (id) => {
    if (role.role_id !== 1) return alert("Not authorized");
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      await deleteAssignment(id);
      fetchAssignments();
    }
  };

  const handleDownload = async (id) => {
    try {
      const response = await downloadAssignmentFile(id);
      const fileBlob = response.data;
      const headers = response.headers;

      let filename = `assignment_${id}`;
      const contentDisposition = headers["content-disposition"];
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/);
        if (match && match[1]) filename = match[1];
      }

      const url = window.URL.createObjectURL(fileBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <div className="assignments-page">
      <h1 className="page-title">📄 Assignments</h1>

      {role.role_id === 1 && (
        <div className="assignment-form-card">
          <h2>{editingId ? "Edit Assignment" : "Add Assignment"}</h2>
          <form onSubmit={handleSubmit} className="assignment-form">
            <select
              name="course_id"
              value={form.course_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c.course_id} value={c.course_id}>
                  {c.course_name}
                </option>
              ))}
            </select>

            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />
            <input type="file" onChange={handleFileChange} />
            <input
              type="date"
              name="assigned_date"
              value={form.assigned_date}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="due_date"
              value={form.due_date}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="max_marks"
              placeholder="Max Marks"
              value={form.max_marks}
              onChange={handleChange}
              required
            />
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingId ? "Update Assignment" : "Add Assignment"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      course_id: "",
                      title: "",
                      description: "",
                      assigned_date: "",
                      due_date: "",
                      max_marks: "",
                    });
                    setFormFile(null);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <table className="assignments-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Title</th>
            <th>Description</th>
            <th>Assigned Date</th>
            <th>Due Date</th>
            <th>Max Marks</th>
            <th>File</th>
            {role.role_id === 1 && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a.assignment_id}>
              <td>
                {courses.find((c) => c.course_id === a.course_id)?.course_name || a.course_id}
              </td>
              <td>{a.title}</td>
              <td>{a.description}</td>
              <td>{a.assigned_date?.slice(0, 10)}</td>
              <td>{a.due_date?.slice(0, 10)}</td>
              <td>{a.max_marks}</td>
              <td>
                {a.file_path ? (
                  <button className="btn-download" onClick={() => handleDownload(a.assignment_id)}>
                    📥 Download
                  </button>
                ) : (
                  "No File"
                )}
              </td>
              {role.role_id === 1 && (
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(a)}>
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(a.assignment_id)}
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
  );
}

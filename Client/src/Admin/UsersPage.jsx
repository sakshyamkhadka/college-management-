import React, { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../config/Api";
import "../Styles/userpage.css";

const departmentOptions = ["BCA", "CSIT", "BBA"];

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    roll_no: "",
    role_id: 5,
    first_name: "",
    last_name: "",
    dob: "",
    gender: "",
    address: "",
    department: "",
    enrollment_year: "",
    phone_number: "",
    semester: 1
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };
    if (name === "username" || name === "role_id") {
      const role = name === "role_id" ? Number(value) : Number(form.role_id);
      const username = name === "username" ? value : form.username;
      if (username) {
        const domain = role === 1 ? "adm" : "stu";
        updatedForm.email = `${username}@pnc.${domain}`;
      }
    }
    setForm(updatedForm);
  };

  const resetForm = () => {
    setForm({
      username: "",
      email: "",
      password: "",
      roll_no: "",
      role_id: 5,
      first_name: "",
      last_name: "",
      dob: "",
      gender: "",
      address: "",
      department: "",
      enrollment_year: "",
      phone_number: "",
      semester: 1
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nepaliPhoneRegex = /^(984|985|986|974|975|976|977|980|981|982|983)\d{7}$/;
    if (!nepaliPhoneRegex.test(form.phone_number)) {
      alert("Invalid Nepali phone number.");
      return;
    }
    const payload = { ...form, role_id: Number(form.role_id) };
    if (editId && !payload.password) delete payload.password;
    try {
      if (editId) {
        await updateUser(editId, payload);
        setUsers(users.map(u => (u.user_id === editId ? { ...u, ...payload } : u)));
      } else {
        const res = await createUser(payload);
        setUsers([...users, { user_id: res.user_id, ...payload }]);
      }
      resetForm();
    } catch (err) {
      alert(err?.response?.data?.error || "Error saving user");
    }
  };

  const handleEdit = (user) => {
    setEditId(user.user_id);
    setForm({
      username: user.username,
      email: user.email,
      password: "",
      roll_no: user.roll_no || "",
      role_id: user.role_id,
      first_name: user.first_name,
      last_name: user.last_name,
      dob: user.dob ? user.dob.substring(0, 10) : "",
      gender: user.gender,
      address: user.address,
      department: user.department,
      enrollment_year: user.enrollment_year,
      phone_number: user.phone_number,
      semester: user.semester
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      setUsers(users.filter(u => u.user_id !== id));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="users-container">
      <h2>User Management</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="user-form-grid">
          <div className="form-group">
            <label>Username</label>
            <input name="username" value={form.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Roll Number</label>
            <input name="roll_no" value={form.roll_no} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder={editId ? "New Password (optional)" : "Password"}
              required={!editId}
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select name="role_id" value={form.role_id} onChange={handleChange}>
              <option value={1}>Admin</option>
              <option value={5}>Student</option>
            </select>
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input name="first_name" value={form.first_name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input name="last_name" value={form.last_name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>DOB</label>
            <input type="date" name="dob" value={form.dob} onChange={handleChange} min="1950-01-01" max="2022-12-31" />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Department</label>
            <select name="department" value={form.department} onChange={handleChange}>
              <option value="">Select Department</option>
              {departmentOptions.map(dep => <option key={dep} value={dep}>{dep}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Enrollment Year</label>
            <input name="enrollment_year" value={form.enrollment_year} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Semester</label>
            <input name="semester" value={form.semester} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input name="phone_number" value={form.phone_number} onChange={handleChange} />
          </div>
          <div className="form-group full-width">
            <label>Address</label>
            <textarea name="address" value={form.address} onChange={handleChange} />
          </div>
          <div className="form-group full-width">
            <button type="submit">{editId ? "Update User" : "Create User"}</button>
          </div>
        </div>
      </form>

      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Roll No</th>
              <th>Email</th>
              <th>Role</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Department</th>
              <th>Enrollment</th>
              <th>Semester</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.user_id}>
                <td>{u.username}</td>
                <td>{u.roll_no}</td>
                <td>{u.email}</td>
                <td>{u.role_id === 1 ? "Admin" : "Student"}</td>
                <td>{u.first_name} {u.last_name}</td>
                <td>{formatDate(u.dob)}</td>
                <td>{u.department}</td>
                <td>{u.enrollment_year}</td>
                <td>{u.semester}</td>
                <td>{u.phone_number}</td>
                <td>
                  <button className="action-btn edit" onClick={() => handleEdit(u)}>Edit</button>
                  <button className="action-btn delete" onClick={() => handleDelete(u.user_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;

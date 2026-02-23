import React, { useState } from "react";
import { submitAdmission } from "../config/Api";
import "../Styles/AdmissionForm.css";

const courses = ["BCA", "CSIT", "BBA"];

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    course: "",
    gender: ""
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");

  const nepaliPhoneRegex = /^(984|985|986|974|975|976|977|980|981|982|983)\d{7}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = "First name required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name required";
    if (!formData.email.trim() || !emailRegex.test(formData.email))
      newErrors.email = "Valid email required";
    if (!formData.phone_number.trim() || !nepaliPhoneRegex.test(formData.phone_number))
      newErrors.phone_number = "Valid Nepali phone required";
    if (!formData.address.trim()) newErrors.address = "Address required";
    if (!formData.course) newErrors.course = "Select a course";
    if (!formData.gender) newErrors.gender = "Select gender";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setSuccess("");
    setServerError("");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await submitAdmission(formData);
      setSuccess("Admission form submitted successfully. Admin will contact you soon.");
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        address: "",
        course: "",
        gender: ""
      });
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to submit admission form. Try again later.";
      setServerError(msg);
    }
  };

  return (
    <div className="admission-container">
      <h2>College Admission Form</h2>
      <form className="admission-form" onSubmit={handleSubmit}>
        <input
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
        />
        {errors.first_name && <span className="error">{errors.first_name}</span>}

        <input
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
        />
        {errors.last_name && <span className="error">{errors.last_name}</span>}

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
        />
        {errors.phone_number && <span className="error">{errors.phone_number}</span>}

        <textarea
          name="address"
          placeholder="Address"
          rows="3"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <span className="error">{errors.address}</span>}

        <select name="course" value={formData.course} onChange={handleChange}>
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.course && <span className="error">{errors.course}</span>}

        <div className="gender">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === "Other"}
              onChange={handleChange}
            />
            Other
          </label>
        </div>
        {errors.gender && <span className="error">{errors.gender}</span>}

        <button type="submit">Submit Admission</button>

        {success && <p className="success-text">{success}</p>}
        {serverError && <p className="error">{serverError}</p>}
      </form>
    </div>
  );
};

export default AdmissionForm;

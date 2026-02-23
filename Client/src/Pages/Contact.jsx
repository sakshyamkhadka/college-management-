import React, { useState } from "react";
import "../Styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setSuccess(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    console.log(formData);
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
        <input type="tel" name="phone" placeholder="Phone Number" maxLength="10" required onChange={handleChange} />
        <textarea name="message" placeholder="Your Message" rows="4" required onChange={handleChange} />

        <button type="submit">Send Message</button>

        {success && <p className="success-text">Message sent successfully ✔</p>}
      </form>
    </div>
  );
};

export default Contact;

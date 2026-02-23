import React from "react";
import "../Styles/footer.css";
import { CiFacebook } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <img src="https://media.collegeinfonepal.com/college/dp/Pascal_National_College_Logo.jpg" alt="" />
          <h4>Pascel National College</h4>
          <p>
            PNC College of Technology<br />
            Satdobato,Lalitpur<br />
          </p>
        </div>

        <div className="footer-column">
          <h4>Academics</h4>
          <ul>
            <li><a href="/">Undergraduate Programs</a></li>
            <li><a href="/">Graduate Programs</a></li>
            <li><a href="/">Research</a></li>
            <li><a href="/departments">Departments</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/admission">Admissions</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/event">Event</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:info@abccollege.edu">Email:info@pascalcollege.edu.np</a></li>
            <li><a href="tel:+11234567890">Phone: (123) 456-7890</a></li>
            <li>
              <a href="https://www.facebook.com/pascal.national.college" target="_blank" rel="noopener noreferrer">Facebook:Pascel National College</a> 
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Pascel National College of Technology. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

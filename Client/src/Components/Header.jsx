import React, { useState } from "react";
import "../Styles/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">

      {/* NAVBAR */}
      <nav className="navbar">
            <img src="https://www.pascalcollege.edu.np/images/pascal-logo-h.jpg" alt="" />
        

        <div 
          className="menu-icon" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        <ul className={menuOpen ? "nav-links open" : "nav-links"}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/event">Events</Link></li>
          <li><Link to="/admission">Admissions</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="http://localhost:5173/login">LOGIN</Link></li>
         

        </ul>
      </nav>

    </header>
  );
};
export default Header;

import React from "react";
import { Link } from "react-router-dom";
import "../Styles/CourseCard.css";
import { FaArrowRight, FaClock, FaGraduationCap } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";


const courses = [
  {
    id: 1,
    category: "ENGINEERING",
    title: "Bachelor in Computer Application (BCA)",
    description:
      "This program provides a strong foundation in computer applications, programming languages, and software development. Students gain practical skills in database management, web development, and basic artificial intelligence concepts.",
    duration: "4 Years",
    degree: "Bachelor's",
    enrolled: 320,
    topRated: true,
    image:
      "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    category: "BUSINESS",
    title: "Bachelor in Account (BBA)",
    description:
      "The Bachelor of Business Administration program equips students with knowledge in accounting, finance, and management, graduates for corporate careers.",
    duration: "3 Years",
    degree: "Bachelor's",
    image:
      "https://plus.unsplash.com/premium_photo-1661772661721-b16346fe5b0f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    category: "Computer Science",
    title: "CSIT",
    description:
      "CSIT (Computer Science and Information Technology) program focuses on software development, combining technical knowledge with problem-solving skills.",
    duration: "5 Years",
    degree: "Bachelor's",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhHv389y7l6-ZHG7FrKJlR2VM7mKoDfYVsfQ&s",
  },
];

export default function Hero_course() {
  return (
    <div className="hero-wrapper">
      {/* Header */}
      <div className="hero-header">
        <h1>Featured Program</h1>
        <p>
          Explore our top-rated programs designed to give you practical skills
          and knowledge for a successful career.
        </p>
      </div>

      {/* Courses */}
      <div className="course-container">
        <div className="main-course-card">
          <div className="image-wrapper">
            {courses[0].topRated && (
              <div className="top-rated-badge">★ Top Rated</div>
            )}
            <img src={courses[0].image} alt={courses[0].title} />
          </div>
          <div className="course-details">
            <span className="category">{courses[0].category}</span>
            <h2>{courses[0].title}</h2>
            <p>{courses[0].description}</p>
            <div className="info-row">
              <div className="duration"><FaClock />{courses[0].duration}</div>
              <div className="degree"><FaGraduationCap />{courses[0].degree}</div>
            </div>
            <div className="learn-more">
              <Link to="/bca" className="learn-more-link">
                <strong>Learn More</strong>
              </Link>
              <div className="enrolled">
                <div className="iconenrolled">
                <BsPeopleFill/>
                </div>

                      <p>{courses[0].enrolled} enrolled</p>
              </div>
            </div>
          </div>
        </div>

        {/* Side course cards */}
        <div className="side-cards">
          {courses.slice(1).map((course) => (
            <div key={course.id} className="side-card">
              <img src={course.image} alt={course.title} />
              <div className="side-details">
                <span className="category small">{course.category}</span>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="info-row small">
                  {course.duration && (
                    <div className="duration">
                     <div className="clock"><FaClock /></div> 
                      <p>{course.duration}</p></div>
                  )}
                  {course.degree && <div className="degree">
                    <FaGraduationCap />
                    <p>{course.degree}</p></div>}
                </div>
              </div>
              <div className="arrow">
                <FaArrowRight />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

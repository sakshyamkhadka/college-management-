import React from 'react';
import '../Styles/CoreValues.css';
import { FaLightbulb, FaUsers, FaHandshake, FaGlobe } from 'react-icons/fa';

const CoreValues = () => {
  const values = [
    {
      icon: <FaLightbulb />,
      title: "Innovation",
      description: "We foster creativity and encourage innovative solutions in all academic and extracurricular endeavors."
    },
    {
      icon: <FaUsers />,
      title: "Community",
      description: "Building a supportive, inclusive, and collaborative environment for students, staff, and alumni."
    },
    {
      icon: <FaHandshake />,
      title: "Integrity",
      description: "Maintaining honesty, ethics, and accountability in every action and decision."
    },
    {
      icon: <FaGlobe />,
      title: "Global Outlook",
      description: "Preparing students to succeed in a diverse, interconnected world."
    }
  ];

  return (
    <section className='Core-container'>

    <div className="core-values">
      <h2>Our Core Values</h2>
      <div className="values-container">
        {values.map((value, index) => (
          <div key={index} className="value-card">
            <div className="value-icon">{value.icon}</div>
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </div>
        ))}
      </div>
    </div>
    </section>

  );
};

export default CoreValues;

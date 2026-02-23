import React from 'react';
import '../Styles/MissionVision.css';

const MissionVision = () => {
  return (
    <div className="mission-vision-page">
      <section className="mv-section">
        <h2>Our Mission</h2>
        <p>
          At Pascel National College, our mission is to provide a transformative educational experience that empowers students to achieve academic excellence, develop critical thinking, and contribute positively to society.
        </p>
      </section>

      <section className="mv-section vision">
        <h2>Our Vision</h2>
        <p>
          We envision Pascel National College as a leading institution recognized globally for innovation in education, fostering a vibrant community, and nurturing leaders who shape a better future.
        </p>
      </section>
    </div>
  );
};

export default MissionVision;

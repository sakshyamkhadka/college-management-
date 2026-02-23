import React from 'react';
import "../Styles/aboutpnc.css";

const AboutPNC = () => {
  return (
    <div className="about">
      <div className="about-img">
        <img src="/Images/College.jpg" alt="College Image" />
      </div>
      <div className="about-text">
        <h1>About Pascal National College (PNC)</h1>
        <p>
          Pascal National College (PNC) was established to meet the global challenge of 21st-century education and research trends.
          It has a team of leading academicians, IT professionals, and education experts to provide holistic development of students and
          prepare them to compete in the global market of Information Technology. PNC was established with the mission of producing graduates
          with a highly competitive mindset and professionals.
          The college offers a unique combination of activity-focused pedagogy with laboratory, field, project, and research work.<br />
          Pascal National College offers a four-year Bachelor of Computer Applications (BCA) program affiliated with Tribhuvan University, commonly known as TU.
          This program primarily emphasizes application development, enabling students to pursue careers as software developers after graduation.
          Additionally, graduates can explore many other fields including design and multimedia, networking, network security, and systems administration.<br />
          While the basic computer science curriculum is in line with other computer science-related degrees, the distinguishing feature of the BCA program at Pascal
          National College lies in its strong focus on programming. During your journey with Pascal National College in BCA, you will learn multiple programming languages,
          and you will be required to complete multiple projects in different programming languages. Students in their final semester will also have the opportunity to pursue internships
          in IT industries based on their specific interests.
        </p>
      </div>
    </div>
  );
};

export default AboutPNC;

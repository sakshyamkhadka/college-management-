import React from 'react';
import "../Styles/DepartmentPnc.css"

const DepartmentPnc = () => {
  const departments = [
    {
      id: 1,
      name: 'Bachelor in Computer Application (BCA)',
      image: 'https://tse1.mm.bing.net/th/id/OIP.3Y5nLrLTxKRf_OEWOTTh7wHaDx?rs=1&pid=ImgDetMain&o=7&rm=3',
      description: `The BCA program provides a strong foundation in computer programming, software development, and information technology. Students learn about database management, networking, web development, and cybersecurity. The course is designed to prepare students for careers as software developers, system analysts, IT consultants, and more.`
    },
    {
      id: 2,
      name: 'Bachelor of Business Administration (BBA)',
      image: 'https://advanced.edu.in/wp-content/uploads/2016/04/bba.jpg',
      description: `The BBA program equips students with knowledge of business management, marketing, finance, human resources, and entrepreneurship. It emphasizes practical learning through case studies, internships, and real-world projects.`
    },
    {
      id: 3,
      name: 'Computer Science and Information Technology (CSIT)',
      image: 'https://tse3.mm.bing.net/th/id/OIP.2qsD3xQlxeiBtvCmLjPjZAHaD2?rs=1&pid=ImgDetMain&o=7&rm=3',
      description: `CSIT combines core concepts of computer science with practical IT applications. Students learn programming, software engineering, networking, data analytics, and cloud computing.`
    },
  ];

  return (
    <div className="departmentpnc-container">
      <h1>Our Faculty</h1>
      <div className="timeline">
        {departments.map((dept, index) => (
          <div key={dept.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
            <div className="timeline-content">
              <img src={dept.image} alt={dept.name} className="departmentpnc-image" />
              <h2 className=" departmentpnc-heading">{dept.name}</h2>
              <p className="departmentpnc-paragraph">{dept.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentPnc;

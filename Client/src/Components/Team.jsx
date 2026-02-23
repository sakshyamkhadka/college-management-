import React from "react";
import "../Styles/team.css";

const teamMembers = [
  { name: "Ashok k. Pant", role: "Principle", img: "https://ashokpant.github.io/images/personal/3.jpg" },
  { name: "Bimala Rai", role: "Receptionist", img: "https://www.euroschoolindia.com/blogs/wp-content/uploads/2023/08/role-and-importance-of-teacher-in-students-life-jpg.webp" },
  { name: "Ramesh Thapa", role: "Vice Principle", img: "https://cdn.sanity.io/images/i2z87pbo/production/73a34e119777535eb89ecdfd07ecc10f9efa0ecd-1440x1079.jpg" },
  { name: "Sita Gurung", role: "Teacher", img: "https://www.euroschoolindia.com/blogs/wp-content/uploads/2023/08/role-and-importance-of-teacher-in-students-life-jpg.webp" },
  { name: "Kiran Lama", role: "Receptionist", img: "https://www.euroschoolindia.com/blogs/wp-content/uploads/2023/08/role-and-importance-of-teacher-in-students-life-jpg.webp" },
];

const Team = () => {
  return (
    <div className="team-container">
      <h1>Our Team</h1>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img src={member.img} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;

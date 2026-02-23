import React from 'react';
import "../Styles/Herocard.css"

const card = [
  { 
    icon: "Images/Globe.svg",
    title: "Excellence in Education",
    text: "Our college provides world-class programs designed to equip students with the skills and knowledge for future success."
  },
  { 
    icon: "Images/People.svg",
    title: "Vibrant Campus Community",
    text: "Experience a welcoming campus where collaboration, mentorship, and lifelong friendships thrive."
  },
  { 
    icon: "Images/Bachlorhat.svg",
    title: "Career-Ready Graduates",
    text: "With practical experience and expert guidance, our students are prepared to excel in their chosen careers."
  }
];



const Herocard = () => {
  return (
    <div className="container">

    <div className="herocard">
      {card.map((item, index) => (
        <div className="card" key={index}>
          <img src={item.icon} alt={item.title} />
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </div>


<div className="event-card">
    <div className="card-event">
        <div className="event-date">
            <span className="month">Nov</span>
            <span className="day">20</span>
        </div>

        <div className="event-details">
            <h2>Open College Day</h2>
            <p>Join us for campus tours, demonstrations, and Q&A sessions.</p>
        </div>

        <button className="event-btn">Learn More</button>
    </div>
</div>

</div>  

  );
};

export default Herocard;

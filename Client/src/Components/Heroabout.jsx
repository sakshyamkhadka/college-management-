import React from 'react'
import '../Styles/heroabout.css'
import { Link } from "react-router-dom";


const Heroabout = () => {
    return (
        <div className="heroabout">
            <div className="heroabout_text">
                <h1>Empowering Minds, Shaping Futures</h1>
                <p>For over three decades, we have been committed to providing exceptional education that prepares students for success in an ever-changing world. Our innovative approach combines traditional academic excellence with cutting-edge technology and personalized learning experiences.</p>
                <section class="stats-section">
                    <div class="stat">
                        <h2>5,000+</h2>
                        <p>Students Enrolled</p>
                    </div>
                    <div class="stat">
                        <h2>98%</h2>
                        <p>Graduation Rate</p>
                    </div>
                    <div class="stat">
                        <h2>3+</h2>
                        <p>Expert Faculty</p>
                    </div>
                </section>

                <div className="text">
                    <h4><q>Our mission is to foster intellectual curiosity, critical thinking, and lifelong learning while nurturing compassionate leaders who will positively impact their communities and the world.</q></h4>
                </div>
                  <Link to="/about" className="herobutton">
                    Learn More About Us
                </Link>
            </div>
            <div className="heroabout_image">
                <img src="/Images/collegeimage.jpg" alt="" />
            </div>





        </div>
    )
}

export default Heroabout
    
import React, { useEffect, useState } from "react";
import "../Styles/StudentProfile.css";
import { getMyProfile } from "../config/Api";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setProfile(data);
      } catch (err) {
        setError("Failed to load profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;

  const formatDate = (dob) => {
    if (!dob) return "-";
    const date = new Date(dob);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getInitials = (firstName, lastName) => {
    const first = firstName ? firstName[0].toUpperCase() : "";
    const last = lastName ? lastName[0].toUpperCase() : "";
    return first + last;
  };

  return (
    <div className="student-profile">
      <div className="profile-card">
        <div className="profile-header">
          <h2 className="student-name">{profile.first_name} {profile.last_name}</h2>
          <p className="course">{profile.department}</p>
          <p className="semester">
            Semester: {profile.semester ? (<>{profile.semester}<sup>th</sup></>) : (<>4<sup>th</sup></>)}
          </p>
        </div>

        <div className="profile-section">
          <h3>Basic Information</h3>
          <div className="profile-details">
            <div className="detail">
              <span>Roll No</span>
              <p>{profile.roll_no || "-"}</p>
            </div>
            <div className="detail">
              <span>Date of Birth</span>
              <p>{formatDate(profile.dob)}</p>
            </div>
            <div className="detail">
              <span>Gender</span>
              <p>{profile.gender || "-"}</p>
            </div>
            <div className="detail">
              <span>Address</span>
              <p>{profile.address || "-"}</p>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Academic Information</h3>
          <div className="profile-details">
            <div className="detail">
              <span>Department</span>
              <p>{profile.department || "-"}</p>
            </div>
            <div className="detail">
              <span>Attendance</span>
              <p className="attendance">{profile.attendance || "100%"}</p>
            </div>
            <div className="detail">
              <span>Enrollment Year</span>
              <p>{profile.enrollment_year || "-"}</p>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Contact Information</h3>
          <div className="profile-details">
            <div className="detail">
              <span>Email</span>
              <p>{profile.email || "-"}</p>
            </div>
            <div className="detail">
              <span>Phone</span>
              <p>{profile.phone_number || "-"}</p>
            </div>
            <div className="detail">
              <span>University</span>
              <p>Tribhuvan University (TU)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
    
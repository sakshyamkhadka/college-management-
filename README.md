# College Management System

A comprehensive web-based college management system that streamlines administrative tasks, student information management, academic processes, and communication between administrators, students, and faculty members.

---

## Features

### Admin Module
- Admission Management: Student admission form with validation, document upload, and status tracking
- User Management: Create, view, update, delete users with role assignment (Admin, Student, Professor)
- Enrollment Management: Course enrollment for students with batch-wise tracking
- Dashboard: Full access to all management features

### Student Module
- Student Dashboard: Personalized welcome page with quick access to features
- Profile Management: View and update personal information
- Grades & Results: View examination results and performance tracking
- Assignments: View and download assignment files
- Attendance: View attendance records with percentage calculation
- Fees & Payments: View fee structure, payment history, and online payment integration (eSewa, Khalti)

### Academic Management
- Courses Management: Course listing, curriculum information
- Examinations: Exam schedule and results publication
- Events: College event listings and registration

### Institutional Information
- About Us: College history, mission, vision, core values
- Departments: Department listings and faculty information
- Faculty/Team: Professor listings and specializations

### Communication
- Contact Form: Form with validation and query submission

---

## Tech Stack

**Frontend:** React.js, Vite, React Router, Axios, React Icons, CSS3  
**Backend:** Node.js, Express.js, RESTful API  
**Database & Authentication:** MySQL, JWT, Bcrypt  
**Additional:** Multer, Nodemailer, CORS, Dotenv  

---

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)  
- MySQL (v5.7 or higher)  
- npm or yarn  

### Backend Setup
```bash
cd Server
npm install



##### .env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=college_management
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password




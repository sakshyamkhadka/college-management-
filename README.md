# College Management System

A comprehensive web-based college management system that streamlines administrative tasks, student information management, academic processes, and communication between administrators, students, and faculty members.

## 🚀 Features

### Admin Module
- **Admission Management** - Student admission form with validation, document upload, and status tracking
- **User Management** - Create, view, update, delete users with role assignment (Admin, Student, Professor)
- **Enrollment Management** - Course enrollment for students with batch-wise tracking
- **Dashboard** - Full access to all management features

### Student Module
- **Student Dashboard** - Personalized welcome page with quick access to features
- **Profile Management** - View and update personal information
- **Grades & Results** - View examination results and performance tracking
- **Assignments** - View and download assignment files
- **Attendance** - View attendance records with percentage calculation
- **Fees & Payments** - View fee structure, payment history, and online payment integration (eSewa, Khalti)

### Academic Management
- Courses Management - Course listing, curriculum information
- Examinations - Exam schedule and results publication
- Events - College event listings and registration

### Institutional Information
- About Us - College history, mission, vision, core values
- Departments - Department listings and faculty information
- Faculty/Team - Professor listings and specializations

### Communication
- Contact form with validation and query submission

## 🛠️ Tech Stack

### Frontend
- **React.js** - JavaScript framework for building user interfaces
- **Vite** - Build tool for faster development
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library
- **CSS3** - Styling and responsive design

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **RESTful API** - Architecture

### Database & Authentication
- **MySQL** - Relational database management system
- **JSON Web Tokens (JWT)** - Authentication
- **Bcrypt** - Password hashing

### Additional Technologies
- **Multer** - File upload middleware
- **Nodemailer** - Email notification system
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## 📁 Project Structure

```
College Management/
├── Client/                    # Frontend React Application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── Admin/           # Admin components
│   │   ├── Components/      # Reusable components
│   │   ├── Pages/           # Page components
│   │   ├── Students/        # Student components
│   │   ├── Styles/          # CSS files
│   │   └── config/          # API configuration
│   ├── package.json
│   └── vite.config.js
│
├── Server/                   # Backend Node.js Application
│   ├── config/              # Database & email configuration
│   ├── controllers/         # Business logic
│   ├── middleware/          # Auth & upload middleware
│   ├── routes/              # API routes
│   ├── Assignments/         # Uploaded assignment files
│   ├── server.js            # Entry point
│   └── package.json
│
└── documentation/           # Project documentation
    └── README.md            # This file
```

## 🏃‍♂️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the Server directory:
   ```bash
   cd Server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the Server directory:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=college_management
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```

4. Import the database schema (create MySQL database and tables)

5. Start the backend server:
   ```bash
   npm run dev
   # or
   npm start
   ```

### Frontend Setup

1. Navigate to the Client directory:
   ```bash
   cd Client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## 🔑 Default Credentials

After setting up, you can access the system with:

- **Admin Account:**
  - Email: admin@pnc.edu.np
  - Password: admin123

- **Student Account:**
  - Email: student@pnc.edu.np
  - Password: student123

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Admissions
- `GET /api/admissions` - Get all admissions
- `POST /api/admissions` - Submit admission
- `PUT /api/admissions/:id` - Update admission status

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Enrollments
- `GET /api/enrollments` - Get all enrollments
- `POST /api/enrollments` - Create enrollment

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance

### Assignments
- `GET /api/assignments` - Get all assignments
- `POST /api/assignments` - Upload assignment

### Exams
- `GET /api/exams` - Get all exams
- `POST /api/exams` - Create exam
- `GET /api/exam-results` - Get exam results
- `POST /api/exam-results` - Add exam result

### Fees & Payments
- `GET /api/fees` - Get fee records
- `POST /api/fees` - Create fee record
- `POST /api/payments` - Process payment

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event
- `POST /api/events/register` - Register for event

## 🗄️ Database Schema

### Main Tables
- `users` - User accounts with roles
- `students` - Student personal information
- `admissions` - Admission applications
- `courses` - Course listings
- `enrollments` - Course enrollments
- `attendance` - Daily attendance records
- `assignments` - Assignment files and details
- `exams` - Exam schedules
- `exam_results` - Student exam results
- `fees` - Fee structure and records
- `payments` - Payment transactions
- `events` - College events

## 📱 Responsive Design

The system is fully responsive and works on:
- Desktop (1024px and above)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes.

## 🙏 Acknowledgments

- College administration for the project opportunity
- All contributors and team members
- Open source community for the tools used

---

Built with ❤️ using React.js, Node.js, and MySQL


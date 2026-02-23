import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRoutes from "./routes/users.js";
import rolesRoutes from "./routes/roles.js";
import authRoutes from "./routes/auth.js";
import admissionsRoutes from "./routes/admissions.js";
import coursesRoutes from "./routes/courses.js";
import assignmentsRoutes from "./routes/assignments.js";
import examRoutes from "./routes/examRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import examResult from "./routes/examResult.js";
import studentsRoutes from "./routes/studentRoutes.js";
import feeRoutes from "./routes/feeRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import event from "./routes/Event.js";
import eventregister from "./routes/Eventregister.js";



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admissions", admissionsRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/assignments", assignmentsRoutes);
app.use("/api/examsresult", examResult);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/students", studentsRoutes );
app.use("/api/enrollements", enrollmentRoutes );
app.use("/api/fee", feeRoutes);
app.use("/api/event", event);
app.use("/api/eventregister", eventregister);
app.use("/api/payments", paymentRoutes );

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

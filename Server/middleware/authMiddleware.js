import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  console.log("where:",req.headers)
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token)
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user.role_id !== 1) return res.status(403).json({ message: "Admin access only" });
  next();
};

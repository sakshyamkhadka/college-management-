import express from "express";
import { getUsers, createUser, updateUser, deleteUser } from "../controllers/usersController.js";
import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, adminOnly, getUsers);
router.post("/", verifyToken, adminOnly, createUser);
router.put("/:id", verifyToken, adminOnly, updateUser);
router.delete("/:id", verifyToken, adminOnly, deleteUser);

export default router;

import express from "express";
import {
  createRegistration,
  
  getRegistrationById,
  getRegistrationsByEvent,
  updateRegistration,
  deleteRegistration,
  getRegistrations,
} from "../controllers/EventRegister.js";

const router = express.Router();

router.post("/", createRegistration);
router.get("/", getRegistrations);
router.get("/:id", getRegistrationById);
router.get("/event/:event_id", getRegistrationsByEvent);
router.put("/:id", updateRegistration);
router.delete("/:id", deleteRegistration);

export default router;

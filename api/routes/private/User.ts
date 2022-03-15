import { Router } from "express";
import { findContacts, update } from "../../controllers/UserController";

const router = Router();

router.post("/users/findContacts", findContacts);
router.post("/users/update", update);

export default router;

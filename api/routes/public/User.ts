import { Router } from "express";
import { register } from "../../controllers/UserController";

const router = Router();

router.post("/users/register", register);

export default router;

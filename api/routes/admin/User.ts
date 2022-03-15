import { Router } from "express";
import { findAll, findOne } from "../../controllers/UserController";

const router = Router();

router.get("/users/all", findAll);
router.get("/users", findOne);

export default router;

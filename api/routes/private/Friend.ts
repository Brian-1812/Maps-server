import { Router } from "express";
import {
  findAll,
  findOne,
  create,
  update,
  usersFriends,
} from "../../controllers/FriendController";

const router = Router();

router.get("/friends/all", findAll);
router.get("/friends", findOne);
router.get("/friends/user", usersFriends);
router.post("/friends/create", create);
router.post("/friends/update", update);

export default router;

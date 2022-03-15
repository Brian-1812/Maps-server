import { Router } from "express";
import {
  findAll,
  findOne,
  create,
  destroy,
  update,
} from "../../controllers/RoadsignController";

const router = Router();

router.get("/roadsigns/all", findAll);
router.get("/roadsigns", findOne);
router.post("/roadsigns/create", create);
router.delete("/roadsigns/delete", destroy);
router.put("/roadsigns/update", update);

export default router;

import express from "express";
import { referralSourceController } from "../controllers/referralSourceController.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";
import { ROLE } from "../utils/constants.js";

const router = express.Router();
const { ADMIN } = ROLE;

router.post("/", checkRoleMiddleware([ADMIN]), referralSourceController.add);
router.put(
  "/:id",
  checkRoleMiddleware([ADMIN]),
  referralSourceController.update
);
router.get("/", referralSourceController.getAll);
router.get(
  "/:id",
  checkRoleMiddleware([ADMIN]),
  referralSourceController.getById
);
router.delete(
  "/:id",
  checkRoleMiddleware([ADMIN]),
  referralSourceController.delete
);

export default router; 
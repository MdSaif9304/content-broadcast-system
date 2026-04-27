import express from "express"
import { authenticate } from "../middlewares/authMiddleware"
import { authorize } from "../middlewares/roleMiddleware"

import { scheduleContent } from "../controllers/scheduleController"
import { createSlot } from "../controllers/slotController"

const router = express.Router()

router.post(
  "/slot",
  authenticate,
  authorize("principal"),
  createSlot
)

router.post(
  "/assign",
  authenticate,
  authorize("principal"),
  scheduleContent
)

export default router
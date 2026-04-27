import express from "express"
import { authenticate } from "../middlewares/authMiddleware"
import { authorize } from "../middlewares/roleMiddleware"
import { approveContent, uploadContent } from "../controllers/contentController"

const router = express.Router()

router.post(
  "/upload",
  authenticate,
  authorize("teacher"),
  uploadContent
)

router.post(
  "/approve/:id",
  authenticate,
  authorize("principal"),
  approveContent
)

export default router
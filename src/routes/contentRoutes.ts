import express from "express"
import { authenticate } from "../middlewares/authMiddleware"
import { authorize } from "../middlewares/roleMiddleware"
import { approveContent, getAllContent, uploadContent } from "../controllers/contentController"
import { upload } from "../middlewares/uploadMiddleware"

const router = express.Router()

router.post(
  "/upload",
  authenticate,
  authorize("teacher"),
  upload.single("file"),
  uploadContent
)

router.post(
  "/approve/:id",
  authenticate,
  authorize("principal"),
  approveContent
)

router.get(
  "/",
  authenticate,
  authorize("principal"),
  getAllContent
)

export default router
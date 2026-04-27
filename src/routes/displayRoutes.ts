import express from "express"
import { getDisplayContent } from "../controllers/displayController"

const router = express.Router()

router.get("/:slotId", getDisplayContent)

export default router
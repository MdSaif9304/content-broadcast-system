import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from "../config/cloudinary"

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "content-broadcast",
    resource_type: "image",
    format: file.mimetype.split("/")[1]
  })
})

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedFormats = ["image/jpeg", "image/png", "image/gif"]

    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Only JPG, PNG, GIF formats are allowed"))
    }
  }
})
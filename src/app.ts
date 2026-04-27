import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes"
import contentRoutes from "./routes/contentRoutes"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes);
app.use("/content", contentRoutes);

app.get("/", (req, res) => {
  res.send("Content Broadcasting API Running")
})

export default app
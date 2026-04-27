import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes"
import contentRoutes from "./routes/contentRoutes"
import scheduleRoutes from "./routes/scheduleRoutes"
import displayRoutes from "./routes/displayRoutes"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes);
app.use("/content", contentRoutes);
app.use("/schedule", scheduleRoutes)
app.use("/display", displayRoutes);

app.get("/", (req, res) => {
  res.send("Content Broadcasting API Running")
})

export default app
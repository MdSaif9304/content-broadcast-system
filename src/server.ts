import app from "./app"
import dotenv from "dotenv"
import { pool } from "./config/db"

dotenv.config()

const PORT = process.env.PORT || 5000

async function startServer() {
  try {
    await pool.connect()
    console.log("Database connected")

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error(err)
  }
}

startServer()
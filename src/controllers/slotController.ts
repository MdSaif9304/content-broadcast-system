import { Request, Response } from "express"
import { pool } from "../config/db"

export const createSlot = async (req: Request, res: Response) => {

  try {

    const { subject } = req.body

    const result = await pool.query(
      `
      INSERT INTO content_slots (subject)
      VALUES ($1)
      RETURNING *
      `,
      [subject]
    )

    res.json({
      message: "Slot created",
      data: result.rows[0]
    })

  } catch (error) {

    console.error(error)
    res.status(500).json({ message: "Server error" })

  }

}
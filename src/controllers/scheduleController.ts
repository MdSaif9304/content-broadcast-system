import { Request, Response } from "express"
import { pool } from "../config/db"

export const scheduleContent = async (req: Request, res: Response) => {

  try {

    const { content_id, slot_id, rotation_order, duration } = req.body

    const result = await pool.query(
      `
      INSERT INTO content_schedule
      (content_id, slot_id, rotation_order, duration)
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [content_id, slot_id, rotation_order, duration]
    )

    res.json({
      message: "Content scheduled successfully",
      data: result.rows[0]
    })

  } catch (error) {

    console.error(error)
    res.status(500).json({ message: "Server error" })

  }

}
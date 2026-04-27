import { Request, Response } from "express"
import { pool } from "../config/db"

export const getDisplayContent = async (req: Request, res: Response) => {
  try {
    const slotId = req.params.slotId

    const result = await pool.query(
      `
      SELECT
        c.id,
        c.title,
        c.file_path,
        cs.duration,
        cs.rotation_order
      FROM content_schedule cs
      JOIN content c ON cs.content_id = c.id
      WHERE cs.slot_id = $1
      AND c.status = 'approved'
      ORDER BY cs.rotation_order ASC
      `,
      [slotId]
    )

    return res.json({
      slot: slotId,
      content: result.rows
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Server error" })
  }
}
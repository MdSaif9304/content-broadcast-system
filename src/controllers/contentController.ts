import { Request, Response } from "express"
import { pool } from "../config/db"

export const uploadContent = async (req: any, res: Response) => {

  try {

    const { title, description, subject, file_path } = req.body

    const userId = req.user.id

    const result = await pool.query(
      `
      INSERT INTO content
      (title, description, subject, file_path, uploaded_by)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [title, description, subject, file_path, userId]
    )

    res.json({
      message: "Content uploaded successfully",
      data: result.rows[0]
    })

  } catch (error) {

    console.error(error)
    res.status(500).json({ message: "Server error" })

  }

}


export const approveContent = async (req: any, res: Response) => {

  try {

    const contentId = req.params.id
    const principalId = req.user.id

    const result = await pool.query(
      `
      UPDATE content
      SET status='approved',
      approved_by=$1,
      approved_at=NOW()
      WHERE id=$2
      RETURNING *
      `,
      [principalId, contentId]
    )

    res.json({
      message: "Content approved",
      data: result.rows[0]
    })

  } catch (error) {

    console.error(error)
    res.status(500).json({ message: "Server error" })

  }

}
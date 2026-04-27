import { Request, Response } from "express"
import { pool } from "../config/db"

export const uploadContent = async (req: any, res: Response) => {

  try {

    const { title, description, subject, file_path } = req.body
    const fileUrl = req.file.path

    const userId = req.user.id

    const result = await pool.query(
      `
      INSERT INTO content
      (title, description, subject, file_path, uploaded_by)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [title, description, subject, fileUrl, userId]
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

export const getAllContent = async (req: Request, res: Response) => {

  try {

    const {
      subject,
      status,
      teacher,
      page = 1,
      limit = 10
    } = req.query

    const offset = (Number(page) - 1) * Number(limit)

    let query = `
      SELECT c.*, u.name as teacher
      FROM content c
      JOIN users u ON c.uploaded_by = u.id
      WHERE 1=1
    `

    const values: any[] = []

    if (subject) {
      values.push(subject)
      query += ` AND c.subject = $${values.length}`
    }

    if (status) {
      values.push(status)
      query += ` AND c.status = $${values.length}`
    }

    if (teacher) {
      values.push(teacher)
      query += ` AND c.uploaded_by = $${values.length}`
    }

    values.push(limit)
    values.push(offset)

    query += `
      ORDER BY c.created_at DESC
      LIMIT $${values.length - 1}
      OFFSET $${values.length}
    `

    const result = await pool.query(query, values)

    res.json(result.rows)

  } catch (error) {

    console.error(error)
    res.status(500).json({ message: "Server error" })

  }

}
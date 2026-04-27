import { Request, Response } from "express"
import { pool } from "../config/db"
import { redis } from "../config/redis"

export const getDisplayContent = async (req: Request, res: Response) => {

    try {

        const slotId = req.params.slotId
        const cacheKey = `display_slot_${slotId}`

        const cachedData = await redis.get(cacheKey)
        if (cachedData) {
            console.log("Serving from Redis cache")

            return res.json(JSON.parse(cachedData))
        }
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

        const response = {
            slot: slotId,
            content: result.rows
        }

        await redis.set(
            cacheKey,
            JSON.stringify(response),
            "EX",
            30
        )
        res.json(response)

    } catch (error) {

        console.error(error)
        res.status(500).json({ message: "Server error" })

    }

}
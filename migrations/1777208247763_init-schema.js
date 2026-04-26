exports.up = (pgm) => {

  pgm.createTable("users", {
    id: "id",
    name: { type: "varchar(100)", notNull: true },
    email: { type: "varchar(150)", unique: true, notNull: true },
    password_hash: { type: "text", notNull: true },
    role: { type: "varchar(20)", notNull: true },
    created_at: {
      type: "timestamp",
      default: pgm.func("current_timestamp")
    }
  })

  pgm.createTable("content", {
    id: "id",
    title: { type: "varchar(255)", notNull: true },
    description: "text",
    subject: { type: "varchar(100)", notNull: true },

    file_path: { type: "text", notNull: true },
    file_type: "varchar(20)",
    file_size: "integer",

    uploaded_by: {
      type: "integer",
      references: "users"
    },

    status: {
      type: "varchar(20)",
      default: "pending"
    },

    rejection_reason: "text",

    approved_by: {
      type: "integer",
      references: "users"
    },

    approved_at: "timestamp",
    start_time: "timestamp",
    end_time: "timestamp",

    created_at: {
      type: "timestamp",
      default: pgm.func("current_timestamp")
    }
  })

  pgm.createTable("content_slots", {
    id: "id",
    subject: { type: "varchar(100)", notNull: true },
    created_at: {
      type: "timestamp",
      default: pgm.func("current_timestamp")
    }
  })

  pgm.createTable("content_schedule", {
    id: "id",

    content_id: {
      type: "integer",
      references: "content",
      onDelete: "cascade"
    },

    slot_id: {
      type: "integer",
      references: "content_slots"
    },

    rotation_order: {
      type: "integer",
      notNull: true
    },

    duration: {
      type: "integer",
      notNull: true
    },

    created_at: {
      type: "timestamp",
      default: pgm.func("current_timestamp")
    }
  })
}

exports.down = (pgm) => {

  pgm.dropTable("content_schedule")
  pgm.dropTable("content_slots")
  pgm.dropTable("content")
  pgm.dropTable("users")

}
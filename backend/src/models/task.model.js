import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxLength: [50, "Name cannot be longer than 50 characters"],
    },

    task: {
      type: String,
      required: [true, "Task is required"],
      trim: true,
      maxLength: [200, "Task cannot be longer than 200 characters"],
    },

    role: {
      type: String,
      required: [true, "Role is required"],
      enum: {
        values: ["admin", "user"],
        message: "Role must be admin or user, received '{VALUE}'",
      },
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: {
        values: ["male", "female", "none"],
        message: "Gender must be male, female or none, received '{VALUE}'",
      },
    },
    addons: {
      overtime: { type: Boolean, default: false },
      lunch: { type: Boolean, default: false },
      coffee: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;

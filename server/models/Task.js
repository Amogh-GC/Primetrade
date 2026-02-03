const mongoose = require('mongoose');

/**
 * Task Schema
 * Defines the structure of task documents in MongoDB
 */
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      minlength: [3, 'Task title must be at least 3 characters long'],
      maxlength: [100, 'Task title cannot exceed 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Task description cannot exceed 500 characters'],
      default: ''
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'in-progress', 'completed'],
        message: 'Status must be either pending, in-progress, or completed'
      },
      default: 'pending'
    },
    priority: {
      type: String,
      enum: {
        values: ['low', 'medium', 'high'],
        message: 'Priority must be either low, medium, or high'
      },
      default: 'medium'
    },
    dueDate: {
      type: Date,
      default: null
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Task must belong to a user']
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

/**
 * Index on user field for faster queries
 * Tasks are always queried by user, so this improves performance
 */
taskSchema.index({ user: 1, createdAt: -1 });

/**
 * Virtual property to check if task is overdue
 */
taskSchema.virtual('isOverdue').get(function () {
  if (!this.dueDate || this.status === 'completed') return false;
  return this.dueDate < new Date();
});

/**
 * Ensure virtuals are included when converting to JSON
 */
taskSchema.set('toJSON', { virtuals: true });
taskSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Task', taskSchema);

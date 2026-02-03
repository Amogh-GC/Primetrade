const express = require('express');
const { body, param, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const Task = require('../models/Task');

const router = express.Router();

/**
 * @route   GET /api/v1/tasks
 * @desc    Get all tasks for authenticated user with optional filtering
 * @access  Private
 * @query   status - Filter by task status (pending, in-progress, completed)
 * @query   priority - Filter by priority (low, medium, high)
 * @query   search - Search in title and description
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, priority, search } = req.query;

    // Build query filter
    const filter = { user: req.user._id };

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    // Add search functionality (case-insensitive)
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Fetch tasks sorted by creation date (newest first)
    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks
    });
  } catch (error) {
    console.error('Get Tasks Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching tasks. Please try again.'
    });
  }
});

/**
 * @route   GET /api/v1/tasks/:id
 * @desc    Get a single task by ID
 * @access  Private
 */
router.get(
  '/:id',
  [
    authMiddleware,
    param('id').isMongoId().withMessage('Invalid task ID')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const task = await Task.findOne({
        _id: req.params.id,
        user: req.user._id
      });

      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }

      res.status(200).json({
        success: true,
        task
      });
    } catch (error) {
      console.error('Get Task Error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while fetching task. Please try again.'
      });
    }
  }
);

/**
 * @route   POST /api/v1/tasks
 * @desc    Create a new task
 * @access  Private
 */
router.post(
  '/',
  [
    authMiddleware,
    body('title')
      .trim()
      .isLength({ min: 3, max: 100 })
      .withMessage('Task title must be between 3 and 100 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Description cannot exceed 500 characters'),
    body('status')
      .optional()
      .isIn(['pending', 'in-progress', 'completed'])
      .withMessage('Status must be pending, in-progress, or completed'),
    body('priority')
      .optional()
      .isIn(['low', 'medium', 'high'])
      .withMessage('Priority must be low, medium, or high'),
    body('dueDate')
      .optional()
      .isISO8601()
      .withMessage('Due date must be a valid date')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { title, description, status, priority, dueDate } = req.body;

      // Create new task
      const task = await Task.create({
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        user: req.user._id
      });

      res.status(201).json({
        success: true,
        message: 'Task created successfully',
        task
      });
    } catch (error) {
      console.error('Create Task Error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while creating task. Please try again.'
      });
    }
  }
);

/**
 * @route   PUT /api/v1/tasks/:id
 * @desc    Update a task
 * @access  Private
 */
router.put(
  '/:id',
  [
    authMiddleware,
    param('id').isMongoId().withMessage('Invalid task ID'),
    body('title')
      .optional()
      .trim()
      .isLength({ min: 3, max: 100 })
      .withMessage('Task title must be between 3 and 100 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Description cannot exceed 500 characters'),
    body('status')
      .optional()
      .isIn(['pending', 'in-progress', 'completed'])
      .withMessage('Status must be pending, in-progress, or completed'),
    body('priority')
      .optional()
      .isIn(['low', 'medium', 'high'])
      .withMessage('Priority must be low, medium, or high'),
    body('dueDate')
      .optional()
      .isISO8601()
      .withMessage('Due date must be a valid date')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { title, description, status, priority, dueDate } = req.body;

      // Build update object with only provided fields
      const updateFields = {};
      if (title !== undefined) updateFields.title = title;
      if (description !== undefined) updateFields.description = description;
      if (status !== undefined) updateFields.status = status;
      if (priority !== undefined) updateFields.priority = priority;
      if (dueDate !== undefined) updateFields.dueDate = dueDate ? new Date(dueDate) : null;

      // Check if there are fields to update
      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No valid fields provided for update'
        });
      }

      // Update task (only if it belongs to the authenticated user)
      const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        updateFields,
        {
          new: true,
          runValidators: true
        }
      );

      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found or unauthorized'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        task
      });
    } catch (error) {
      console.error('Update Task Error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while updating task. Please try again.'
      });
    }
  }
);

/**
 * @route   DELETE /api/v1/tasks/:id
 * @desc    Delete a task
 * @access  Private
 */
router.delete(
  '/:id',
  [
    authMiddleware,
    param('id').isMongoId().withMessage('Invalid task ID')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      // Delete task (only if it belongs to the authenticated user)
      const task = await Task.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id
      });

      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found or unauthorized'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Task deleted successfully',
        task
      });
    } catch (error) {
      console.error('Delete Task Error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while deleting task. Please try again.'
      });
    }
  }
);

module.exports = router;

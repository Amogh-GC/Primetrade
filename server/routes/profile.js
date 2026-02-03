const express = require('express');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

/**
 * @route   GET /api/v1/me
 * @desc    Get current user profile
 * @access  Private (requires authentication)
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    // req.user is attached by authMiddleware
    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        bio: req.user.bio,
        avatar: req.user.avatar,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt
      }
    });
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile. Please try again.'
    });
  }
});

/**
 * @route   PUT /api/v1/me
 * @desc    Update current user profile
 * @access  Private (requires authentication)
 */
router.put(
  '/',
  [
    authMiddleware,
    // Validation middleware
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    body('bio')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Bio cannot exceed 500 characters'),
    body('avatar')
      .optional()
      .trim()
      .isURL()
      .withMessage('Avatar must be a valid URL')
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      // Extract allowed fields from request body
      const { name, bio, avatar } = req.body;
      const updateFields = {};

      // Only update fields that are provided
      if (name !== undefined) updateFields.name = name;
      if (bio !== undefined) updateFields.bio = bio;
      if (avatar !== undefined) updateFields.avatar = avatar;

      // Check if there are fields to update
      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No valid fields provided for update'
        });
      }

      // Update user profile
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        updateFields,
        {
          new: true, // Return updated document
          runValidators: true // Run model validators
        }
      );

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          bio: updatedUser.bio,
          avatar: updatedUser.avatar,
          createdAt: updatedUser.createdAt,
          updatedAt: updatedUser.updatedAt
        }
      });
    } catch (error) {
      console.error('Update Profile Error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while updating profile. Please try again.'
      });
    }
  }
);

module.exports = router;

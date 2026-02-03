const User = require('../models/User');
const { verifyToken } = require('../utils/jwt');

/**
 * Authentication Middleware
 * Protects routes by verifying JWT token and attaching user to request
 * 
 * Usage: Add this middleware to any route that requires authentication
 * Example: router.get('/profile', authMiddleware, getProfile);
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Get token from Authorization header
    // Expected format: "Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided or invalid format.'
      });
    }

    // Extract token (remove "Bearer " prefix)
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Verify token
    const decoded = verifyToken(token);

    // Find user by ID from token payload
    // Exclude password from the result
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found. Token is invalid.'
      });
    }

    // Attach user to request object for use in route handlers
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    
    // Handle specific JWT errors
    if (error.message === 'Invalid or expired token') {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token. Please login again.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Authentication failed. Please try again.'
    });
  }
};

module.exports = authMiddleware;

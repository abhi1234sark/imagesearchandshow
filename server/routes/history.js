const express = require('express');
const Search = require('../models/Search');
const router = express.Router();
require('dotenv').config();

// Middleware to check authentication
const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Authentication required' });
};

// Get user's search history
router.get('/', requireAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const searches = await Search.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('term timestamp resultCount')
      .lean();

    const totalSearches = await Search.countDocuments({ userId: req.user._id });

    res.json({
      success: true,
      searches,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalSearches / limit),
        totalSearches,
        hasNext: skip + searches.length < totalSearches,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ 
      message: 'Error fetching search history',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get search statistics for user
router.get('/stats', requireAuth, async (req, res) => {
  try {
    const stats = await Search.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: null,
          totalSearches: { $sum: 1 },
          uniqueTerms: { $addToSet: '$term' },
          totalResults: { $sum: '$resultCount' }
        }
      },
      {
        $project: {
          totalSearches: 1,
          uniqueTermsCount: { $size: '$uniqueTerms' },
          totalResults: 1,
          averageResults: { $round: [{ $divide: ['$totalResults', '$totalSearches'] }, 2] }
        }
      }
    ]);

    const result = stats[0] || {
      totalSearches: 0,
      uniqueTermsCount: 0,
      totalResults: 0,
      averageResults: 0
    };

    res.json({
      success: true,
      stats: result
    });

  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ 
      message: 'Error fetching search statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;

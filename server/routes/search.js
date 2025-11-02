const express = require('express');
const axios = require('axios');
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

// Search images
router.post('/', requireAuth, async (req, res) => {
  try {
    const { term } = req.body;
    
    if (!term || term.trim().length === 0) {
      return res.status(400).json({ message: 'Search term is required' });
    }

    // Call Unsplash API
    const unsplashResponse = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: term,
        per_page: 20,
        orientation: 'landscape'
      },
      headers: {
        'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    });

    const images = unsplashResponse.data.results.map(img => ({
      id: img.id,
      url: img.urls.regular,
      thumb: img.urls.thumb,
      alt: img.alt_description || img.description || 'Unsplash image',
      author: img.user.name,
      authorUrl: img.user.links.html,
      likes: img.likes,
      downloadUrl: img.links.download
    }));

    // Save search to database
    const searchRecord = new Search({
      userId: req.user._id,
      term: term.trim(),
      resultCount: images.length
    });
    await searchRecord.save();

    res.json({
      success: true,
      term: term.trim(),
      count: images.length,
      images
    });

  } catch (error) {
    console.error('Search error:', error);
    
    if (error.response?.status === 401) {
      res.status(500).json({ 
        message: 'Unsplash API key is invalid or missing' 
      });
    } else if (error.response?.status === 403) {
      res.status(500).json({ 
        message: 'Unsplash API rate limit exceeded' 
      });
    } else {
      res.status(500).json({ 
        message: 'Error searching images',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
});

// Get top searches across all users
router.get('/top-searches', async (req, res) => {
  try {
    const topSearches = await Search.aggregate([
      {
        $group: {
          _id: '$term',
          count: { $sum: 1 },
          lastSearched: { $max: '$timestamp' }
        }
      },
      {
        $sort: { count: -1, lastSearched: -1 }
      },
      {
        $limit: 5
      },
      {
        $project: {
          term: '$_id',
          count: 1,
          lastSearched: 1,
          _id: 0
        }
      }
    ]);

    res.json({
      success: true,
      topSearches
    });

  } catch (error) {
    console.error('Top searches error:', error);
    res.status(500).json({ 
      message: 'Error fetching top searches',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;

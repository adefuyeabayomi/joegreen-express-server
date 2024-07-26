const express = require('express');
const router = express.Router();
const verifyToken = require('../functions/verifyToken.middleware');
const uploadImages = require('../functions/fileupload.middleware');
const {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost
} = require('../controllers/blog_operations.controller');

// Routes for blog operations
router.post('/', verifyToken, uploadImages, createBlogPost); // Create a blog post
router.get('/', getAllBlogPosts); // Get all blog posts
router.get('/:id', getBlogPostById); // Get a blog post by ID
router.put('/:id', verifyToken, uploadImages, updateBlogPost); // Update a blog post
router.delete('/:id', verifyToken, deleteBlogPost); // Delete a blog post

module.exports = router;
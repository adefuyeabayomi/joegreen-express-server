const Blog = require('../models/blog.model');
const logger = require('../utils/logger');
const verifyToken = require('../functions/verifyToken.middleware');
const uploadImages = require('../functions/fileupload.middleware');
const saveToCloudinary = require('../functions/saveToCloudinary');

// Create a new blog post
const createBlogPost = async (req, res) => {
  console.log('req.files', req.files)
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { title, highlightParagraph, link, published } = req.body;
    let image = null;

    if (req.files) {
      const uploadedImageUrls = await saveToCloudinary(req.files, 'blog_images');
      image = uploadedImageUrls[0];
      console.log(image,uploadedImageUrls)
    }

    const newBlogPost = new Blog({
      title,
      highlightParagraph,
      link,
      image,
      published
    });

    await newBlogPost.save();
    res.status(201).json(newBlogPost);
  } catch (error) {
    logger.errorLogger('Error creating blog post', true);
    logger.errorLogger(error, true);
    res.status(500).json({ message: 'Error creating blog post', error });
  }
}

// Get all blog posts
const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await Blog.find();
    res.status(200).json(blogPosts);
  } catch (error) {
    logger.errorLogger('Error fetching blog posts', true);
    logger.errorLogger(error, true);
    res.status(500).json({ message: 'Error fetching blog posts', error });
  }
};

// Get a blog post by ID
const getBlogPostById = async (req, res) => {
  try {
    const blogPost = await Blog.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    logger.errorLogger('Error fetching blog post', true);
    logger.errorLogger(error, true);
    res.status(500).json({ message: 'Error fetching blog post', error });
  }
};

// Update a blog post by ID
const updateBlogPost = async (req, res) => {
  console.log('req.files', req.files)
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { title, highlightParagraph, link, published } = req.body;
    const updateData = { title, highlightParagraph, link, published };

    if (req.files) {
      const uploadedImageUrls = await saveToCloudinary(req.files, 'blog_images');
      updateData.image = uploadedImageUrls[0];
    }

    const updatedBlogPost = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(updatedBlogPost);
  } catch (error) {
    logger.errorLogger('Error updating blog post', true);
    logger.errorLogger(error, true);
    res.status(500).json({ message: 'Error updating blog post', error });
  }
};

// Delete a blog post by ID
const deleteBlogPost = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const deletedBlogPost = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.log({error})
    logger.errorLogger('Error deleting blog post', true);
    logger.errorLogger(error, true);
    res.status(500).json({ message: 'Error deleting blog post', error });
  }
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost
};

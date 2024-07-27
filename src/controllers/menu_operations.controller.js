const Dish = require('../models/dish.model');
const DishCategory = require('../models/dish_category.model');
const logger = require('../utils/logger');
const saveToCloudinary = require('../functions/saveToCloudinary');
const isAdmin = (req) => req.user && req.user.role === 'admin';
const config = require('../utils/config')

// Get all dishes
const getDishes = async (req, res) => {
  try {
    // Extract query parameters from the request
    const { name, priceMin, priceMax, published, category } = req.query;

    // Build the query object based on provided parameters
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Case-insensitive search for name
    }

    if (priceMin) {
      query.price = { $gte: Number(priceMin) }; // Minimum price filter
    }

    if (priceMax) {
      query.price = query.price || {}; // Ensure `price` object exists
      query.price.$lte = Number(priceMax); // Maximum price filter
    }

    if (published) {
      query.published = published === 'true'; // Convert 'true'/'false' string to boolean
    }

    if (category) {
      query.category = category; // Exact match for category
    }

    // Fetch dishes from the database with the constructed query
    const dishes = await Dish.find(query);

    res.status(200).json(dishes);
  } catch (error) {
    logger.errorLogger('Error fetching dishes', true);
    logger.errorLogger(error, true);
    res.status(500).json({ message: 'Error fetching dishes' });
  }
};


// Get dish by ID 
const getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.status(200).json(dish);
  } catch (error) {
    logger.errorLogger('Error fetching dish', true);
    logger.errorLogger(error, true);
    res.status(500).json({ message: 'Error fetching dish' });
  }
};

// Create a new dish
const createDish = async (req, res) => {
  console.log('user', req.user)
  if (!isAdmin(req)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  try {
    const newDish = new Dish(req.body);
    await newDish.save();
    res.status(201).json(newDish);
  } catch (error) {
    logger.errorLogger('Error creating dish', true);
    logger.errorLogger(error, true);
    res.status(500).json({ message: 'Error creating dish' });
  }
};

// Update a dish
const updateDish = async (req, res) => {
  if (!isAdmin(req)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  try {
    const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.status(200).json(updatedDish);
  } catch (error) {
    logger.errorLogger('Error updating dish', true);
    logger.errorLogger(error, true);
    res.status(500).json({ message: 'Error updating dish' });
  }
};

// Update dish image
const updateDishImage = async (req, res) => {
  if (!isAdmin(req)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    const uploadedImageUrls = await saveToCloudinary(files, 'dish_images');
    const updatedDish = await Dish.findByIdAndUpdate(req.params.id, { image: uploadedImageUrls[0] }, { new: true });
    if (!updatedDish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.status(200).json(updatedDish);
  } catch (error) {
    logger.errorLogger('Error updating dish image', true);
    logger.errorLogger(error, true);
    res.status(500).json({ message: 'Error updating dish image' });
  }
};

// Get all categories
const getAllCategory = async (req, res) => {
  try {
    const categories = await DishCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    logger.errorLogger('Error fetching categories', true);
    logger.errorLogger(error, true);
    res.status(500).json({ message: 'Error fetching categories' });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await DishCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    logger.errorLogger('Error fetching category', true);
    logger.errorLogger(error, true);
    res.status(500).json({ message: 'Error fetching category' });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  console.log('user', req.user)
  if (!isAdmin(req)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  try {
    const newCategory = new DishCategory(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    logger.errorLogger('Error creating category', true);
    logger.errorLogger(error, true);
    res.status(500).json({ message: 'Error creating category' });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  if (!isAdmin(req)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  try {
    const updatedCategory = await DishCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    logger.errorLogger('Error updating category', true);
    logger.errorLogger(error, true);
    res.status(500).json({ message: 'Error updating category' });
  }
};

// Delete a dish or category
const deleteDishOrCategory = async (req, res) => {
  if (!isAdmin(req)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  try {
    const { type, id } = req.params; // 'type' can be 'dish' or 'category'
    if (type === 'dishes') {
      const deletedDish = await Dish.findByIdAndDelete(id);
      if (!deletedDish) {
        return res.status(404).json({ message: 'Dish not found' });
      }
      res.status(200).json({ message: 'Dish deleted successfully' });
    } else if (type === 'categories') {
      const deletedCategory = await DishCategory.findByIdAndDelete(id);
      if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ message: 'Category deleted successfully' });
    } else {
      res.status(400).json({ message: 'Invalid type' });
    }
  } catch (error) {
    logger.errorLogger('Error deleting item', true);
    logger.errorLogger(error, true);
    res.status(500).json({ message: 'Error deleting item' });
  }
};

module.exports = {
  getDishes,
  getDishById,
  createDish,
  updateDish,
  updateDishImage,
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteDishOrCategory,
};

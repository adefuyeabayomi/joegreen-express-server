const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  highlightParagraph: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  link: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  published: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Blog', blogSchema);

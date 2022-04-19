const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    subtitle: {
      type: String,
    },
    image: {
      src: {
        type: String,
      },
      filename: {
        type: String,
      },
    },
    content: {
      type: String,
    },
    published: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);

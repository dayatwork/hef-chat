const Blog = require("../models/blog");
const { cloudinary } = require("../config/cloudinary");

const addBlog = async (req, res) => {
  const { title, subtitle, image, content } = req.body;

  const newBlog = new Blog({
    title,
    subtitle,
    image,
    content,
  });

  try {
    const savedBlog = await newBlog.save();
    res.status(200).json(savedBlog);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        statusCode: 404,
        message: `Blog with id ${req.params.id} is not found`,
      });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateBlog = async (req, res) => {
  const { title, subtitle, image, content } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        statusCode: 404,
        message: `Blog with id ${req.params.id} is not found`,
      });
    }

    blog.title = title || blog.title;
    blog.subtitle = subtitle || blog.subtitle;
    blog.image = image || blog.image;
    blog.content = content || blog.content;

    const savedBlog = await blog.save();

    res.status(200).json(savedBlog);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const data = await Blog.findByIdAndDelete(req.params.id);

    if (data?.image?.filename) {
      await cloudinary.uploader.destroy(data?.image?.filename, {
        resource_type: "image",
      });
    }

    res.status(204).json();
  } catch (error) {
    console.log({ error });
    res.status(500).json(error);
  }
};

module.exports = {
  addBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};

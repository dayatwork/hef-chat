const router = require("express").Router();

const {
  addBlog,
  getBlogs,
  getPublishedBlogs,
  getBlogById,
  getPublishedBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogs");

router.post("/", addBlog);
router.get("/", getBlogs);
router.get("/published", getPublishedBlogs);
router.get("/:id", getBlogById);
router.get("/published/:id", getPublishedBlogById);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;

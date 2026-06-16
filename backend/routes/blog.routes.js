const express = require("express");
const router = express.Router();

const {
  createBlog,
  getBlog,
  getBlogs
} = require("../controllers/blog.controller");

router.post("/create", createBlog);
router.get("/", getBlogs);
router.get("/:slug", getBlog);

module.exports = router;
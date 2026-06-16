const Blog = require("../models/blog.model");

exports.createBlog = async (req, res) => {
  try {
    const { title, image, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    let slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    let baseSlug = slug;
    let counter = 1;

    while (await Blog.findOne({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    const blog = await Blog.create({
      title,
      slug,
      content,
      image,
    });

    res.status(201).json(blog);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// all blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// single blog
exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//includes:
// get route for root level (/blogs), /blogs/:id
// post route for root level (/blogs)
// delete route for /blogs/:id
// put (update) route for /blogs/:id

const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// find all blog posts. Include the username of the writer of the blog. Include blog comments and the 
// usernames of comment writers
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('blog', {
      blogs,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a specific blog based on the blog_id, Include the username of the writer of the blog. Include blog 
// comments and the usernames of comment writers
router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('blog', {
      blogs,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// write blog content, user must be logged in
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a blog by its blog_id, user must be logged in
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a blog by its blog_id, user must be logged in
router.put('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
  });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

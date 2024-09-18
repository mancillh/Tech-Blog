//includes:
// get routes for root level (/dashboard), /update/:id

const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

  router.get('/', withAuth, async (req, res) => {
    try {
      // Get all blogs that logged in user wrote and JOIN with user and comment data
      const blogData = await Blog.findAll({
        where: {
            user_id:req.session.user_id
        },
        include: [
          {
            model: Comment,
            include: {
                model: User,
                attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      });
  
      // Serialize data so the template can read it
      const blogs = blogData.map((blog) => blog.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('dashboard', { 
        blogs, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //fetches content user created and adds it to update form
  router.get('/update/:id', withAuth, async (req, res) => {
    try {
      const blogData = await Blog.findByPk(req.params.id);
  
      if (!blogData) {
        res.status(404).json({ message: 'No blog found with this id' });
        return;
      }
  
      const blog = blogData.get({ plain: true });
  
      res.render('update', { 
        blog, 
        logged_in: true 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;
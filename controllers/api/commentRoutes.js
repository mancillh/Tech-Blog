//includes:
// get route for root level (/comments)
// post route for root level (/comments)

const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all comments
router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const commentData = await Comment.findAll();

    // Serialize data so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('blog', {
      comments,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//create comment, user must be logged in
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//create comment
router.post("/", withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment: req.body.comment,
            user_id: req.body.user_id,
            blog_id: req.body.blog_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
     res.status(400).json(err);
    }
});

//delete comment
router.delete("/:id", async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found!' });
            return;
          }

        res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
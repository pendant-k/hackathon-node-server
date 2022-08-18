const express = require("express");
const Comment = require("../models/comments");
const router = express.Router();

// comments POST
router.post("/comment-create", async (req, res, next) => {
  try {
    const newComment = await Question.create({
      questionType: req.body.questionType,
      writer: req.body.writer,
      content: req.body.content,
      likes: [],
    });
    console.log("Comment created : ", newComment);
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// update && delete comments by id

// ex)
// axios.patch(`/comments/${comment._id}`);
// axios.delete(`/comments/${comment._id}`);
router
  .route("/:id")
  .patch(async (req, res, next) => {
    try {
      const result = await Comment.updateOne(
        {
          _id: req.params.id,
        },
        {
          content: req.body.content,
        }
      );
      console.log(result);
      res.json({ status: "success" });
    } catch (err) {
      console.error(err);
      res.json({ status: "fail" });
    }
  })
  .delete(async (req, res, next) => {
    try {
      // delete Question Schema
      const result = await Comment.findOneAndDelete({
        _id: req.params.id,
      });
      console.log(result);
      res.json({ status: "success" });
    } catch (err) {
      console.error(err);
      res.json({ status: "fail" });
    }
  });

module.exports = router;

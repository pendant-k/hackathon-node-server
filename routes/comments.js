const express = require("express");
const Comment = require("../models/comments");
const router = express.Router();

// comment GET
router.get("/get", async (req, res, next) => {
  try {
    const comment = await Comment.findOne({
      _id: req.body._id,
    });
    console.log(comment);
    const resObject = {
      status: "success",
      result: comment,
    };
    res.json(resObject);
  } catch (err) {
    console.error(err);
    res.json({ status: "fail" });
    next(err);
  }
});

// all comments GET
router.get("/get-all", async (req, res, next) => {
  try {
    const comments = await Comment.find({
      questionId: req.body.questionId,
    });
    console.log(comments);
    const resObject = {
      status: "success",
      result: comments,
    };
    res.json(resObject);
  } catch (err) {
    console.error(err);
    res.json({ status: "fail" });
    next(err);
  }
});

// comments POST
router.post("/create", async (req, res, next) => {
  try {
    const newComment = await Comment.create({
      questionId: req.body.questionId,
      writer: req.body.writerId,
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

// like PATCH
router.route("/like/:id").patch(async (req, res, next) => {
  try {
    const result = await Comment.updateOne(
      {
        _id: req.params.id,
      },
      { $push: { likes: req.body.userId } }
    );
    console.log(result);
    res.json({ status: "success" });
  } catch (err) {
    console.error(err);
    res.json({ status: "fail" });
  }
});

// unlike PATCH
router.route("/unlike/:id").patch(async (req, res, next) => {
  try {
    const result = await Comment.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $pull: { likes: req.body.userId } }
    );
    console.log(result);
    res.json({ status: "success" });
  } catch (err) {
    console.error(err);
    res.json({ status: "fail" });
  }
});

module.exports = router;

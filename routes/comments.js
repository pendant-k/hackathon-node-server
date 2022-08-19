const express = require("express");
const Comment = require("../models/comments");
const Question = require("../models/questions");
const router = express.Router();

// comment GET
router.get("/get", async (req, res, next) => {
    try {
        const comment = await Comment.findOne({
            _id: req.body._id,
        });
        console.log(comment);
        // const resObject = {
        //   status: "success",
        //   result: comment,
        // };
        res.json(comment);
    } catch (err) {
        console.error(err);
        res.json({ status: "fail" });
        next(err);
    }
});

// all comments of one question GET
// need questionId
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
// push to Question
router.post("/create", async (req, res, next) => {
    try {
        const newComment = await Comment.create({
            questionId: req.body.questionId,
            writer: req.body.writer,
            content: req.body.content,
            camp: req.body.camp,
            likes: [],
        });

        console.log("Comment created : ", newComment);
        // insert new comment to Question
        refQuestion = await Question.findOneAndUpdate(
            {
                _id: req.body.questionId,
            },
            { $push: { comments: newComment._id } }
        );
        const resObj = {
            status: "success",
            ...newComment,
        };
        console.log(refQuestion);
        res.status(201).json(resObj);
    } catch (err) {
        console.error(err);
        res.json({ status: "fail" });
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
                    camp: req.body.camp,
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
            const commentId = req.params.id;
            const commentToDelete = await Comment.findOne({ _id: commentId });
            console.log(commentToDelete);
            if (commentToDelete) {
                commentToDelete.remove();
                const questionToDelete = await Question.findOneAndUpdate(
                    {
                        _id: commentToDelete.questionId,
                    },
                    { $pull: { comments: commentToDelete._id } }
                );
                console.log("question remove comment", questionToDelete);

                res.json({ status: "success" });
            } else {
                console.log("no comment to remove");
                res.json({ status: "fail" });
            }
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

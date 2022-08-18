const express = require("express");
const Question = require("../models/questions");
const router = express.Router();

// update && delete question by id

// ex)
// axios.patch(`/questions/${question._id}`);
// axios.delete(`/questions/${question_id}`);
router
    .route("/:id")
    .patch(async (req, res, next) => {
        try {
            const result = await Question.updateOne(
                {
                    _id: req.params.id,
                },
                {
                    title: req.body.title,
                    content: req.body.comment,
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
        } catch (err) {
            console.error(err);
        }
    });

module.exports = router;

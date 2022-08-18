"use strict";

const express = require("express");
const Question = require("../models/questions");
const router = express.Router();

// balance get
router.get("/get-balance", async (req, res, next) => {
    try {
        const balanceQuestions = await Question.find({
            questionType: "balance",
        });
        console.log(balanceQuestions);
        const resObject = {
            status: "success",
            result: balanceQuestions,
        };
        res.json(resObject);
    } catch (err) {
        console.error(err);
        res.json({ status: "fail" });
        next(err);
    }
});
// discuss get
router.get("/get-discuss", async (req, res, next) => {});

router.post("/create", async (req, res, next) => {
    try {
        const newQuestion = await Question.create({
            // current user id
            writer: req.body._id,
            questionType: req.body.questionType,
            subject: req.body.subject,
            prosTitle: req.body.prosTitle,
            prosDesc: req.body.prosDesc,
            consTitle: req.body.consTitle,
            consDesc: req.body.consDesc,
            tags: req.body.tags,
            issue: req.body.issue,
            comments: [],
            pros: [],
            cons: [],
        });
        console.log("Question created : ", newQuestion);
        res.status(201).json({ ...newQuestion, status: "success" });
    } catch (err) {
        console.error(err);
        res.json({ status: "fail" });
        next(err);
    }
});

// update && delete question by id

// ex)
// axios.patch(`/questions/${question._id}`);
// axios.delete(`/questions/${question_id}`);
router
    .route("/:id")
    .patch(async (req, res, next) => {
        try {
            const result = await Question.findOneAndUpdate(
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
            // delete Question Schema
            const result = await Question.findOneAndDelete({
                _id: req.params.id,
            });
            console.log(result);
            res.json(result);
        } catch (err) {
            console.error(err);
            res.json({ status: "fail" });
        }
    });

module.exports = router;

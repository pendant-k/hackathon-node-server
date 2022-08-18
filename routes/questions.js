"use strict";

const express = require("express");
const Question = require("../models/questions");
const router = express.Router();

// get every questions
router.get("/get-all", async (req, res, next) => {
    try {
        const allQuestions = await Question.find({}).populate("writer");
        console.log(allQuestions);
        const resObject = {
            status: "success",
            result: allQuestions,
        };
        res.json(resObject);
    } catch (err) {
        console.error(err);
        res.json({ status: "fail" });
    }
});

// only balance get
// save to user( populates )
router.get("/get-balance", async (req, res, next) => {
    try {
        const balanceQuestions = await Question.find({
            questionType: "balance",
        }).populate("writer");
        console.log(balanceQuestions);
        const resObject = {
            status: "success",
            result: balanceQuestions,
        };
        res.json(resObject);
    } catch (err) {
        console.error(err);
        res.json({ status: "fail" });
    }
});

// only discuss get
router.get("/get-discuss", async (req, res, next) => {
    try {
        const discussQuestions = await Question.find({
            questionType: "discuss",
        }).populate("writer");
        console.log(discussQuestions);
        const resObject = {
            status: "success",
            result: discussQuestions,
        };
        res.json(resObject);
    } catch (err) {
        console.error(err);
        res.json({ status: "fail" });
    }
});

// create new Question
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
        res.status(201).json(newQuestion);
    } catch (err) {
        console.error(err);
        res.json({ status: "fail" });
        next(err);
    }
});

// get detail && update && delete question by id

// ex)
// axios.get(`/questions/${question._id}`);
// axios.put(`/questions/${question._id}`);
// axios.delete(`/questions/${question._id}`);
router
    .route("/:id")
    .get(async (req, res, next) => {
        try {
            const questionDetail = await Question.findOne({
                _id: req.params.id,
            }).populate(["writer", "comments"]);
            console.log(questionDetail);
            res.json(questionDetail);
        } catch (err) {
            console.error(err);
        }
    })
    .put(async (req, res, next) => {
        try {
            const result = await Question.findOneAndUpdate(
                {
                    _id: req.params.id,
                },
                {
                    title: req.body.title,
                    prosTitle: req.body.prosTitle,
                    prosDesc: req.body.prosDesc,
                    consTitle: req.body.consTitle,
                    consDesc: req.body.consDesc,
                    tags: req.body.tags,
                    issue: req.body.issue,
                }
            );
            console.log(result);
            res.json(result);
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

"use strict";

const express = require("express");
const verifyToken = require("../middlewares/auth");
const Question = require("../models/questions");
const User = require("../models/users");
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
router.post("/create", verifyToken, async (req, res, next) => {
    try {
        // get current user id
        const currentUser = await User.findOne({
            username: res.locals.username,
        });
        const newQuestion = await Question.create({
            writer: currentUser._id.toString(),
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
    .put(verifyToken, async (req, res, next) => {
        try {
            const currentUser = await User.findOne({
                username: res.locals.username,
            });
            const question = await Question.findOne({ _id: req.params.id });
            if (question.writer === currentUser) {
                const result = await question.update({
                    title: req.body.title,
                    prosTitle: req.body.prosTitle,
                    prosDesc: req.body.prosDesc,
                    consTitle: req.body.consTitle,
                    consDesc: req.body.consDesc,
                    tags: req.body.tags,
                    issue: req.body.issue,
                });
                res.json(result);
            } else {
                console.log("banned");
                res.json({ status: "fail" });
            }

            // const result = await Question.findOneAndUpdate(
            //     {
            //         _id: req.params.id,
            //     },
            //     {
            //         title: req.body.title,
            //         prosTitle: req.body.prosTitle,
            //         prosDesc: req.body.prosDesc,
            //         consTitle: req.body.consTitle,
            //         consDesc: req.body.consDesc,
            //         tags: req.body.tags,
            //         issue: req.body.issue,
            //     }
            // );
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

// like PATCH
router.route("/like/:id").patch(verifyToken, async (req, res, next) => {
    const currentUser = await User.findOne({
        username: res.locals.username,
    });
    try {
        const result = await User.updateOne(
            {
                _id: currentUser._id.toString(),
            },
            { $push: { bookmark: req.params.id } }
        );
        console.log(result);
        res.json({ status: "success", result: result });
    } catch (err) {
        console.error(err);
        res.json({ status: "fail" });
    }
});

// unlike PATCH
router.route("/unlike/:id").patch(verifyToken, async (req, res, next) => {
    const currentUser = await User.findOne({
        username: res.locals.username,
    });
    try {
        const result = await User.findOneAndUpdate(
            {
                _id: currentUser._id.toString(),
            },
            { $pull: { bookmark: req.params.id } }
        );
        console.log(result);
        res.json({ status: "success" });
    } catch (err) {
        console.error(err);
        res.json({ status: "fail" });
    }
});

// search by keyword
router.get("/search/:keyword", async (req, res, next) => {
    try {
        const keyword = req.params.keyword;
        const result = await Question.find({
            tags: { $regex: keyword, $options: "i" },
        });
        console.log(result);
        res.json({ status: "success", results: result });
    } catch (err) {
        console.error(err);
        res.json({ status: "fail" });
    }
});

module.exports = router;

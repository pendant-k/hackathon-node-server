"use strict";

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Question = require("../models/questions");
const User = require("../models/users");
const {
    Schema: { Types: ObjectId },
} = mongoose;

// add user to question
router.post("/add/:id", async (req, res, next) => {
    const questionId = req.params.id;
    const userId = req.body._id;
    const camp = req.body.camp;
    try {
        const question = await Question.findById(questionId);
        if (
            !question.pros.includes(userId) &&
            !question.cons.includes(userId)
        ) {
            if (camp === "pros") {
                question.pros.push(userId);
                const result = await question.save();
                console.log(result);
                res.json(result);
            }
            question.cons.push(userId);
            const result = await question.save();
            console.log(result);
            res.json(result);
        }
        console.log("already votes!");
        res.json({ status: "duplicated" });
    } catch (err) {
        console.error(err);
    }
});

router.post("/remove/:id", async (req, res, next) => {
    const questionId = req.params.id;
    const userId = req.body._id;
    const camp = req.body.camp;
    try {
        const question = await Question.findById(questionId);
        const user = await User.findById(userId);
        if (camp === "pros") {
            question.pros = question.pros.filter((i) => i !== user._id);
        } else {
            question.cons = question.cons.filter((i) => i !== user._id);
        }
        await question.save();
        console.log(question);
        res.json(question);
    } catch (err) {
        console.error(err);
        res.json({ status: "fail" });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();

const User = require("../models/users");

// duplicated check
router.get("/check-name/:name", async (req, res, next) => {
    const newNickname = req.params.name;
    const existNickname = await User.findOne({ nickname: newNickname });
    if (existNickname) {
        res.json({ status: "duplicated" });
    } else {
        console.log(existNickname);
        res.json({ status: "success" });
    }
});

// create newUser
router.post("/create", async (req, res, next) => {
    const existUser = await User.findOne({ userId: req.body.userId });
    if (existUser) {
        console.log("Exist User : ");
        console.log(existUser);
        res.json({ status: "duplicated" });
    } else {
        try {
            const newUser = await User.create({
                name: req.body.name,
                nickname: req.body.nickname,
                email: req.body.email,
                userId: req.body.userId,
                password: req.body.password,
                bookmark: [],
            });
            console.log("User created : ", newUser);
            res.status(201).json(newUser);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();

const User = require("../models/users");
const { createToken } = require("../controllers/userController");
const verifyToken = require("../middlewares/auth");

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
                nickname: req.body.nickname,
                email: req.body.email,
                username: req.body.username,
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

router.post("/login", createToken);

router.get("/current", verifyToken, async (req, res, next) => {
    try {
        const currentUser = await User.findOne({
            username: res.locals.username,
        });
        console.log(currentUser);
        res.json({ ...currentUser, status: "success" });
    } catch (err) {
        console.error(err);
        res.json({ status: "fail" });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Question = require("../models/questions");
const verifyToken = require("../middlewares/auth");

// TIME LOGGER
router.use((req, res, next) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    console.log(`API TEST CALL, TIME : `, today.toDateString());
    next();
});

// api test routes
// path : /test
router.get("/", (req, res) => {
    console.log("this is test route");
    res.send("API route works");
});

// user 생성 테스트
router.post("/user-create", async (req, res, next) => {
    // console.log(req.body);
    const existUser = await User.findOne({ userId: req.body.userId });
    if (existUser) {
        console.log("Exist User");
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

router.get("/token", verifyToken, async (req, res, next) => {
    try {
        const result = res.locals.username;
        console.log(result);
        res.json(result);
    } catch (err) {
        console.error(err);
    }
});

// user 삭제 테스트
// axios.delete(`/users/${users._id}`);
router.delete("/users/:id", async (req, res, next) => {
    try {
        const result = await User.deleteOne({ _id: req.params.id });
        console.log("User deleted", result);
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;

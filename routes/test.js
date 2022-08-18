const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Question = require("../models/questions");

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

// login GET
router.get("/login", async (req, res) => {
  console.log("welcome");
});

// login POST
router.post("/login", async (req, res, next) => {
  if (existUser) {
    // 유저가 존재한다면
    if (req.body.password == existUser.password) {
      console.log(`welcome ${existUser.nickname}`);
      res.json({ status: "success" });
    } else {
      console.log("password is not correct");
      res.json({ status: "fail" });
    }
  } else {
    console.log("The account isn't exist.");
    res.json({ status: "fail" });
  }
});

// logout POST
router.get("/logout", function (req, res) {
  req.logout();
  res.json({ status: "success" });
});

// questions POST
router.post("/question-create", async (req, res, next) => {
  try {
    const newQuestion = await Question.create({
      writer: req.body.writer,
      questionType: req.body.questionType,
      title: req.body.title,
      content: req.body.content,
      comments: req.body.comments,
      pros: req.body.pros,
      cons: req.body.cons,
    });
    console.log("Question created : ", newQuestion);
    res.status(201).json(newQuestion);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

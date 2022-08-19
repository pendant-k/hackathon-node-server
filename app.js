// dotenv config
require("dotenv").config();

// dotenv test logs
// console.log(process.env.PORT);
// console.log(process.env.DATABASE_URI);

// packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");

const connectDB = require("./config/dbConnect");

// router
const testRouter = require("./routes/test");
const questionsRouter = require("./routes/questions");
const commentsRouter = require("./routes/comments");
const votesRouter = require("./routes/votes");
const usersRouter = require("./routes/users");

const expressSession = require("express-session")({
    secret: "likelion10",
    // session 다시 저장 허용
    resave: false,
    saveUninitialized: false,
});

// connect DB
출처: https: connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

// express 내장 body-parser setting
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession);

// cors setting
app.use(cors({ origin: "*" }));

// passport setting
app.use(passport.initialize());
app.use(passport.session());

// connection test route
// index path
app.get("/", (req, res) => {
    res.send("index route");
});

// test route
app.use("/test", testRouter);

// users route
app.use("/users", usersRouter);

// questions route
app.use("/questions", questionsRouter);

// comments route
app.use("/comments", commentsRouter);

// votes route
app.use("/votes", votesRouter);

// server - db connection
// config/dbConnect 참고
mongoose.connection.once("open", () => {
    console.log("DB Connected!");
    app.listen(PORT, () =>
        console.log(`Server is running on http://localhost:${PORT}`)
    );
});

// server start command : npm run start
// nodemon을 사용했습니다.

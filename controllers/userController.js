const User = require("../models/users");
const jwt = require("jsonwebtoken");

const createToken = async (req, res, next) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password,
        });
        console.log(user);
        if (user) {
            const token = jwt.sign(
                {
                    username: user.username,
                    password: user.password,
                },
                process.env.SECRET_KEY,
                // 토큰 유효 시간 설정
                { expiresIn: "5h" }
            );
            res.cookie("user", token);
            res.status(201).json({ status: "success", token });
        } else {
            res.status(400).json({ status: "fail" });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

module.exports = { createToken };

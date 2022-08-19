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
                process.env.SECRET_KEY ||
                    "WzfdOYaZ5c6YrE+7+pS7Hn8ywz3Pqy1DFFYTMAgLmm6dTPggcfrKXpogZ4wNLZeO2fBo2BXuFJhnyV+WeUWOIVDL/5gYoxpTitaUw9H+5ou6nLr7Z8irlk0FDpsmpzfHdOzioGF8V6KUeqTx8Z6oIJcqtS/j/DbG/Yy7CyrLpHHw7yVTzOgrG6f0BKgxFbo4TyT9Up4WRV6XJpeS7w5Oa08I6PweN+NPV+ElP42XrPEUEYA5BM6712HfHMDgGCQBTubuLDP876c6+gJV8J0OgRL4/g45NJFQblMN7fr+oBEyOnCHPMzEolJ3Nfhi0AtHjX6oq6pyl2la26nwAhYRZA==",
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

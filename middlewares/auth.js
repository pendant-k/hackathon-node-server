const jwt = require("jsonwebtoken");
const SECRET_KEY =
    "WzfdOYaZ5c6YrE+7+pS7Hn8ywz3Pqy1DFFYTMAgLmm6dTPggcfrKXpogZ4wNLZeO2fBo2BXuFJhnyV+WeUWOIVDL/5gYoxpTitaUw9H+5ou6nLr7Z8irlk0FDpsmpzfHdOzioGF8V6KUeqTx8Z6oIJcqtS/j/DbG/Yy7CyrLpHHw7yVTzOgrG6f0BKgxFbo4TyT9Up4WRV6XJpeS7w5Oa08I6PweN+NPV+ElP42XrPEUEYA5BM6712HfHMDgGCQBTubuLDP876c6+gJV8J0OgRL4/g45NJFQblMN7fr+oBEyOnCHPMzEolJ3Nfhi0AtHjX6oq6pyl2la26nwAhYRZA==";

const verifyToken = (req, res, next) => {
    try {
        const clientToken = req.cookies.user;
        console.log(clientToken);
        const decoded = jwt.verify(clientToken, SECRET_KEY);
        console.log(decoded);
        if (decoded) {
            res.locals.username = decoded.username;
            next();
        } else {
            res.status(401).json({ error: "unauthorized" });
        }
    } catch (err) {
        res.status(401).json({ error: "token expired" });
    }
};

module.exports = verifyToken;

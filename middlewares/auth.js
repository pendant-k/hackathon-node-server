const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

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

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

module.exports = router;

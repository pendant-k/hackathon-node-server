"use strict";
const mongoose = require("mongoose");
const { Schema } = mongoose;
const {
    Types: { ObjectId },
} = Schema;

const userSchema = new Schema(
    {
        nickname: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        bookmark: [
            {
                type: ObjectId,
                ref: "Question",
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

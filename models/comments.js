"use strict";
const mongoose = require("mongoose");
const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const commentSchema = new Schema(
  {
    questionId: {
      type: ObjectId,
      ref: "Question",
    },
    writer: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    // length로 총 좋아요 수 check
    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);

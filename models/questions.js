"use strict";
const mongoose = require("mongoose");
const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const questionSchema = new Schema(
  {
    writer: { type: ObjectId, required: true, ref: "User" },
    questionType: {
      type: String,
      enum: ["balance", "discuss"],
      default: "balance",
    },
    subject: { type: String, required: true },
    prosTitle: { type: String, required: true },
    prosDesc: { type: String, required: true },
    consTitle: { type: String, required: true },
    consDesc: { type: String, required: true },
    tags: [{ type: String }],
    issue: { type: Boolean, default: false },
    comments: [{ type: ObjectId, ref: "Comment" }],
    pros: [{ type: ObjectId, ref: "User" }],
    cons: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);

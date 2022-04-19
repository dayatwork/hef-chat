const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    totalMessages: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", conversationSchema);

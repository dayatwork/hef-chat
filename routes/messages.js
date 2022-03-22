const router = require("express").Router();

const {
  addMessage,
  getMessagesByConversationId,
} = require("../controllers/messages");

// Add Message
router.post("/", addMessage);

// Get Message
router.get("/:conversationId", getMessagesByConversationId);

module.exports = router;

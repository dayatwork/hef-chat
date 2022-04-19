const router = require("express").Router();

const {
  addMessage,
  getMessagesByConversationId,
  readMessages,
} = require("../controllers/messages");

// Add Message
router.post("/", addMessage);

// Get Message
router.get("/:conversationId", getMessagesByConversationId);

router.put("/read/:conversationId", readMessages);

module.exports = router;

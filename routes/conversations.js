const router = require("express").Router();

const {
  createConversation,
  getConversationById,
} = require("../controllers/conversations");

// create conversation
router.post("/", createConversation);

router.get("/:id", getConversationById);

// get conversation of user

module.exports = router;

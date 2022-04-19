const router = require("express").Router();

const {
  createConversation,
  getConversationById,
  getAllConversations,
} = require("../controllers/conversations");

router.get("/", getAllConversations);
// create conversation
router.post("/", createConversation);

// get conversation of user
router.get("/:id", getConversationById);

module.exports = router;

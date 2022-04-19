const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

const addMessage = async (req, res) => {
  const { conversationId, text, sender } = req.body;

  const newMessage = new Message({
    conversationId,
    sender,
    text,
  });

  try {
    const savedMessage = await newMessage.save();
    await Conversation.findByIdAndUpdate(conversationId, {
      $inc: {
        totalMessages: 1,
      },
    });

    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMessagesByConversationId = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 50;
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * 5);
    res.status(200).json(messages.reverse());
  } catch (error) {
    res.status(500).json(error);
  }
};

const readMessages = async (req, res) => {
  try {
    await Message.updateMany(
      { conversationId: req.params.conversationId, sender: req.body.sender },
      { $set: { read: true } }
    );
    res.status(200).json({ message: "Ok" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addMessage,
  getMessagesByConversationId,
  readMessages,
};

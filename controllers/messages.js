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
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
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

const Conversation = require("../models/Conversation");

const createConversation = async (req, res) => {
  const alreadyConversation = await Conversation.find({
    members: { $all: [req.body.senderId, req.body.receiverId] },
  });

  if (alreadyConversation.length) {
    return res.status(200).json(alreadyConversation);
  }

  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const getConversationById = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [Number(req.params.id)] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createConversation,
  getConversationById,
};

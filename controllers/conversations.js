const Conversation = require("../models/Conversation");
// const Message = require("../models/Message");

// const createConversation = async (req, res) => {
//   const alreadyConversation = await Conversation.find({
//     members: { $all: [req.body.senderId, req.body.receiverId] },
//   });

//   if (alreadyConversation.length) {
//     return res.status(200).json(alreadyConversation);
//   }

//   const newConversation = new Conversation({
//     members: [req.body.senderId, req.body.receiverId],
//   });

//   try {
//     const savedConversation = await newConversation.save();
//     res.status(200).json(savedConversation);
//   } catch (error) {
//     res.status(500).json({
//       error,
//     });
//   }
// };

const createConversation = async (req, res) => {
  const alreadyConversation = await Conversation.find({
    "members.id": { $all: [req.body.sender.id, req.body.receiver.id] },
  });

  if (alreadyConversation.length) {
    console.log({ alreadyConversation });
    return res.status(200).json(alreadyConversation);
  }

  const newConversation = new Conversation({
    members: [req.body.sender, req.body.receiver],
    newMessage: [
      {
        userId: req.body.sender.id,
        count: 0,
      },
      {
        userId: req.body.receiver.id,
        count: 0,
      },
    ],
  });

  console.log({ newConversation });

  try {
    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const getAllConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({});
    console.log({ conversations });
    res.status(200).json(conversations);
  } catch (error) {}
};

const getConversationById = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      "members.id": { $in: [Number(req.params.id)] },
    }).sort({ updatedAt: -1 });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllConversations,
  createConversation,
  getConversationById,
};

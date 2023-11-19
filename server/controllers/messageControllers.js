const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');
const User = require('../models/User.js');
const Chat = require('../models/chatModel');

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate('sender', 'name pic email')
      .populate('chat');
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
// const sendMessage = asyncHandler(async (req, res) => {
//   const { content, chatId } = req.body;

//   if (!content || !chatId) {
//     console.log("Invalid data passed into request");
//     return res.sendStatus(400);
//   }

//   var newMessage = {
//     sender: req.user._id,
//     content: content,
//     chat: chatId,
//   };

//   try {
//     var message = await Message.create(newMessage);

//     message = await message.populate("sender", "name pic").execPopulate();
//     message = await message.populate("chat").execPopulate();
//     message = await User.populate(message, {
//       path: "chat.users",
//       select: "name pic email",
//     });

//     await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

//     res.json(message);
//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//   }
// });

// const sendMessage = asyncHandler(async (req, res) => {
//   const { content, chatId } = req.body;

//   if (!content || !chatId) {
//     console.log('Invalid data passed into request');
//     return res.sendStatus(400);
//   }

//   var newMessage = {
//     sender: req.user._id,
//     content: content,
//     chat: chatId,
//   };

//   var message = await Message.create(newMessage);

//   message = await message.populate('sender', 'name pic').execPopulate();
//   message = await message.populate('chat').execPopulate();
//   message = await User.populate(message, {
//     path: 'chat.users',
//     select: 'name pic email',
//   });

//   // const updatedChat = await Chat.findByIdAndUpdate(req.body.chatId, {
//   //   latestMessage: message,
//   // });
//   // if (updatedChat) {
//   //   res.json(message);
//   // }
//   console.log({ message: message });
//   const updatedChat = await Chat.findByIdAndUpdate(req.body.chatId, {
//     latestMessage: message,
//   });
//   if (updatedChat) {
//     const response = {
//       message,
//       chat: updatedChat,
//     };
//     res.json(response);
//   }
// });

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log('Invalid data passed into request');
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  console.log({ newMessage: newMessage });
  var message = await Message.create(newMessage);

  console.log({ messageBefore: messageBefore });

  message = await message.populate('sender', 'name pic');
  message = await message.populate('chat').exec();
  message = await User.populate(message, {
    path: 'chat.users',
    select: 'name pic email',
  });

  const updatedChat = await Chat.findByIdAndUpdate(req.body.chatId, {
    latestMessage: message,
  });
  if (updatedChat) {
    res.json(message);
  }
  console.log({ message: message });
  // const updatedChat = await Chat.findByIdAndUpdate(req.body.chatId, {
  //   latestMessage: message,
  // });
  // if (updatedChat) {
  //   const response = {
  //     message,
  //     chat: updatedChat,
  //   };
  //   res.json(response);
  // }
});

const getUserMessagesById2 = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get managers userId from "protect middleware"
  if (user) {
    const messages = await Message.find({ sender: user?._id })
      .populate('sender')
      .exec()
      .populate('chat')
      .exec()
      .populate('readBy')
      .exec();

    if (messages) {
      res.json(messages);
    }

    // let latestMessage = messages[messages.length - 1];
  }
});

const getUserMessagesById = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ sender: req.user._id })
      .populate('sender', 'name pic email')
      .populate('chat');
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage, getUserMessagesById };

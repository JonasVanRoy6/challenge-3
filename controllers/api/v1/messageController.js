const Message = require('../models/Message');
const jsend = require('jsend');

// GET all messages
exports.getMessages = async (req, res) => {
  try {
    const user = req.query.user;
    const filter = user ? { user } : {};
    const messages = await Message.find(filter);
    res.jsend.success({ messages });
  } catch (error) {
    res.jsend.error('Failed to fetch messages');
  }
};

// GET one message by ID
exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.jsend.fail({ message: 'Message not found' });
    }
    res.jsend.success({ message });
  } catch (error) {
    res.jsend.error('Failed to fetch the message');
  }
};

// POST a new message
exports.createMessage = async (req, res) => {
  try {
    const { user, text } = req.body;
    const message = new Message({ user, text });
    await message.save();
    res.jsend.success({ message });
  } catch (error) {
    res.jsend.error('Failed to create message');
  }
};

// PUT (update) a message by ID
exports.updateMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const message = await Message.findByIdAndUpdate(req.params.id, { text }, { new: true });
    if (!message) {
      return res.jsend.fail({ message: 'Message not found' });
    }
    res.jsend.success({ message });
  } catch (error) {
    res.jsend.error('Failed to update message');
  }
};

// DELETE a message by ID
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.jsend.fail({ message: 'Message not found' });
    }
    res.jsend.success({ message: 'Message deleted' });
  } catch (error) {
    res.jsend.error('Failed to delete message');
  }
};

const express = require('express');
const router = express.Router();
const {
  getMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
} = require('../controllers/messageController');

router.get('/v1/messages', getMessages);
router.get('/v1/messages/:id', getMessageById);
router.post('/v1/messages', createMessage);
router.put('/v1/messages/:id', updateMessage);
router.delete('/v1/messages/:id', deleteMessage);

module.exports = router;

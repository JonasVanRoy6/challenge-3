const express = require('express');
const mongoose = require('mongoose');
const jsend = require('jsend');
const bodyParser = require('body-parser');
const messageRoutes = require('./routes/messageRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(jsend.middleware);

// Routes
app.use('/api', messageRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27127/socialmedia');

module.exports = mongoose.connection;
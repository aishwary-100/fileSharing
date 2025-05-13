const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, enum: ['ops', 'client'] },
  verified: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileId: String,
  filename: String,
  uploadedBy: String
});

module.exports = mongoose.model('File', fileSchema);

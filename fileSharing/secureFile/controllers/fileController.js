const File = require('../models/File');
const { generateDownloadToken } = require('../utils/tokenGenerator');

exports.upload = async (req, res) => {
  const file = req.file;
  const fileId = Date.now().toString();

  await File.create({
    fileId,
    filename: file.filename,
    uploadedBy: req.user.id
  });

  res.json({ message: 'File uploaded', fileId });
};

exports.listFiles = async (req, res) => {
  const files = await File.find();
  res.json(files);
};

exports.getDownloadLink = async (req, res) => {
  const file = await File.findOne({ fileId: req.params.fileId });
  if (!file) return res.sendStatus(404);

  const token = generateDownloadToken(file.fileId, req.user.id);
  res.json({
    downloadLink: `${process.env.BASE_URL}/files/download/${token}`,
    message: 'success'
  });
};

exports.downloadFile = async (req, res) => {
  // Basic token simulation
  const files = await File.find();
  const file = files.find(f =>
    generateDownloadToken(f.fileId, req.user.id) === req.params.token
  );

  if (!file) return res.sendStatus(403);
  res.download(`uploads/${file.filename}`);
};

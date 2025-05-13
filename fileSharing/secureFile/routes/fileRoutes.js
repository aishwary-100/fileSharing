const express = require('express');
const multer = require('multer');
const router = express.Router();
const { upload, listFiles, getDownloadLink, downloadFile } = require('../controllers/fileController');
const authenticate = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('officedocument')) cb(null, true);
  else cb(new Error('Only Office files allowed'), false);
};

const uploadMiddleware = multer({ storage, fileFilter });

router.post('/upload', authenticate, authorizeRole('ops'), uploadMiddleware.single('file'), upload);
router.get('/list', authenticate, authorizeRole('client'), listFiles);
router.get('/download-link/:fileId', authenticate, authorizeRole('client'), getDownloadLink);
router.get('/download/:token', authenticate, authorizeRole('client'), downloadFile);

module.exports = router;

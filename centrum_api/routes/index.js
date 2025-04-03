const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController')
const FileController = require('../controllers/FileController')
const CommentController = require('../controllers/CommentController')
const LikeController = require('../controllers/LikeController')
const multer = require("multer");


const upload = multer({
    dest: 'tempuploads/' // Explicit temp directory
  });

router.get('/', AppController.get);
router.get('/bebe', AppController.bebe);
router.get('/read', AppController.read_file);
router.post('/upload_files', upload.array("files"), FileController.uploadFiles)
router.get('/files', FileController.getFiles);
router.get('/files/:id', FileController.read_file);
router.post('/post-comment', CommentController.submitComment);
router.get('/get-comment/:fileId', CommentController.getComments);
router.post('/post-like/', LikeController.submitLike);
router.get('/get-like/:fileId', LikeController.getLikes);


module.exports = router;

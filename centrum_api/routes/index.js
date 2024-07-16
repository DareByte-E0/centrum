const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController')
const FileController = require('../controllers/FileController')
const AiController = require('../controllers/AiController')
const multer = require("multer");


const upload = multer({dest: "uploads/"});

router.get('/', AppController.get);
router.get('/bebe', AppController.bebe);
router.get('/read', AppController.read_file);
router.post('/upload_files', upload.array("files"), FileController.uploadFlies)
router.get('/files', FileController.getFiles);
router.post('/chat', AiController.chat);

module.exports = router;

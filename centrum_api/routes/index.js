const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController')

router.get('/', AppController.get);
router.get('/bebe', AppController.bebe);

module.exports = router;

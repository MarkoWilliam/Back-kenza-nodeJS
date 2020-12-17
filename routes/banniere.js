const express = require('express');
const banniereController = require('../controllers/banniere');
const router = express.Router();

//-------List---------
router.get('/ImageBanniere', banniereController.banniereImg);
module.exports = router;
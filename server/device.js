const express = require('express');
const deviceController = require('../controllers/device');
const router = express.Router();

//-----------------------texte boutton ----------------------
//---------list---------------
router.get('/android', deviceController.list)

//---------list---------------
router.get('/ios', deviceController.listIOS)


//--------------insertion---------------
router.post('/insertion', deviceController.insertion);




module.exports = router;
const express = require('express');
const deviceController = require('../controllers/device');
const router = express.Router();

//-----------------------texte boutton ----------------------
//---------list---------------
router.get('/ListeAndroid', deviceController.list)

//---------list---------------
router.get('/ListeIos', deviceController.listIOS)


//--------------insertion---------------
router.post('/insertion', deviceController.insertion);






module.exports = router;
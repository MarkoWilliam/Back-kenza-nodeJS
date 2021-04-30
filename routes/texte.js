const express = require('express');
const textController = require('../controllers/texte');
const router = express.Router();

//-----------------------texte   ----------------------
//---------list---------------
router.get('/content', textController.list)

//---------list---------------
router.get('/ListeText', textController.ListeText)

//-------------update----------------
router.post('/update', textController.update);


module.exports = router;
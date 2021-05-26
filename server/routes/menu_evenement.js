const express = require('express');
const menuController = require('../controllers/menu_evenement');
const router = express.Router();

//-----------------------texte boutton ----------------------
//---------list---------------
router.get('/listButton', menuController.list)


//--------------insertion---------------
router.post('/insertion', menuController.insertion);

//-------------update----------------
router.post('/update', menuController.update);


//-----------------------titre boutton ----------------------
//---------list---------------
router.get('/listTitre', menuController.listTitre)


//--------------insertion---------------
router.post('/insertionTitre', menuController.insertionTitre);

//-------------update----------------
router.post('/updateTitre', menuController.updateTitre);

//-------------Liste par id----------------
router.get('/listeId/:num', menuController.listeId);


module.exports = router;
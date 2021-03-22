const express = require('express');
const produitController = require('../controllers/produit');
const router = express.Router();

//-------List---------
router.get('/produitList', produitController.produitList);

//-------Upade liste--------
router.patch('/:id', produitController.produitID);

//-------Upade liste--------
router.patch('produits/:id', produitController.produitCheck);


////////////////////////////////
////////////Modif TOJO//////////
////////////////////////////////
//-------insert new ban --------
router.post('/insertban', produitController.insertban);
//------- Recup All banniere
router.patch('/pageelement/:id', produitController.pageElement);
//-------insert new notification
router.post('/insertnotif', produitController.insertnotif);
//------- Recup All notification
router.get('/allnotif', produitController.allnotif);
//lecture image uploads
router.get('/imageban/:image', produitController.imageban);
//------- Recup All event
router.get('/allEvent', produitController.allEvent);
//-------------- maj etat Notif
router.post('/majNotif', produitController.majNotif);
//-------------- maj etat Notif
router.post('/renVnotif', produitController.renVnotif);
//-------------- Get allpage
router.get('/allpage', produitController.allpage);
//-------------- Get allevent
router.get('/allevenement', produitController.allevenement);
//-------------- isertion evenement
router.post('/insertevent', produitController.insertevent);
//-------------- update evenement
router.post('/updateevent', produitController.updateevent);
//-------------- maj etat Event
router.post('/majEtatEvent', produitController.majEtatEvent);
//------- Recup All notification
router.get('/allnotifapp', produitController.allnotifapp);


module.exports = router;
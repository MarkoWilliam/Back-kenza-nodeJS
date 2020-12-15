const express = require('express');
const produitController = require('../controllers/produit');
const router = express.Router();

//-------List---------
router.get('/produitList', produitController.produitList);

//-------Upade liste--------
router.patch('/:id', produitController.produitID);

//-------Upade liste--------
router.patch('produits/:id', produitController.produitCheck);


//-------insert new ban --------
router.post('/insertban', produitController.insertban);
router.patch('/pageelement/:id', produitController.pageElement);
//insert new notification
router.post('/insertnotif', produitController.insertnotif);

router.get('/allnotif', produitController.allnotif);
module.exports = router;
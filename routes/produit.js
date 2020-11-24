const express = require('express');
const produitController = require('../controllers/produit');
const router = express.Router();

//-------List---------
router.get('/produitList', produitController.produitList);

//-------Upade liste--------
router.patch('/:id', produitController.produitID);


module.exports = router;
const express = require('express');
const miseProduitController = require('../controllers/mise_produit');
const router = express.Router();


//---------------Registration-----------------
router.post('/insertionProduit', miseProduitController.miseEnavant);

//--------------Selecte produit mise en avant--------------
router.get('/selecteProduit', miseProduitController.selectPr)




module.exports = router;
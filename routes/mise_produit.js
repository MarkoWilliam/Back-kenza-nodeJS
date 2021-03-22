const express = require('express');
const miseProduitController = require('../controllers/mise_produit');
const router = express.Router();


//---------------Registration 13-----------------
router.post('/insertionProduit', miseProduitController.miseEnavant);

//--------------Selecte produit mise en avant--------------
router.get('/selecteProduit', miseProduitController.selectPr)

//---------------Registration mère et fille-----------------
router.post('/insertMf', miseProduitController.insertMf);

//---------------Registration curvy-----------------
router.post('/insertcurvy', miseProduitController.insertcurvy);

//---------------Registration promo-----------------
router.post('/insertpromo', miseProduitController.insertpromo);

//---------------Registration filette-----------------
router.post('/insertfilette', miseProduitController.insertfilette);

//---------------Registration bebe-----------------
router.post('/insertbebe', miseProduitController.insertbebe);

//--------------Selecte produit mise en avant curvy--------------
router.get('/selecteCurvy', miseProduitController.selecteCurvy)

//--------------Selecte produit mise en avant mf--------------
router.get('/selectemf', miseProduitController.selectemf)


module.exports = router;
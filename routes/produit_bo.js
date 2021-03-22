const express = require('express');
const pushController = require('../controllers/produit_bo');
const router = express.Router();

//--------list push produit 13---------------
//-------------BO-------------------
router.get('/listePush', pushController.listPush);
//------------APP-------------------
router.get('/listePushAPK', pushController.listePushAPK);



//--------list push produit MF---------------
//-------------BO-------------------
router.get('/listePushmf', pushController.listPushmf);
//------------APP-------------------
router.get('/listePushmfapk', pushController.listePushmfapk);


//--------list push produit curvy---------------
//-------------BO-------------------
router.get('/listePushcurvy', pushController.listePushcurvy);
//------------APP-------------------
router.get('/listePushcurvyapk', pushController.listePushcurvyapk);


//--------list push produit promo---------------
//-------------BO-------------------
router.get('/listePushpromo', pushController.listePushpromo);
//------------APP-------------------
router.get('/listePushpromoapk', pushController.listePushpromoapk);


//--------list push produit filette---------------
//-------------BO-------------------
router.get('/listePushfilette', pushController.listePushfilette);
//------------APP-------------------
router.get('/listePushfiletteapk', pushController.listePushfiletteapk);


//--------list push produit bebe---------------
//-------------BO-------------------
router.get('/listePushbebe', pushController.listePushbebe);
//------------APP-------------------
router.get('/listePushbebeapk', pushController.listePushbebeapk);


module.exports = router;
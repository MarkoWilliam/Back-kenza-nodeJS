const express = require('express');
const banniereController = require('../controllers/banniere');
const router = express.Router();

//-------List---------
router.get('/ImageBanniere', banniereController.banniereImg);

//---------- modif tojo pour le systeme de gestion banniere
router.get('/allban', banniereController.allban);

//---------- modif tojo pour le systeme de gestion banniere insertion
router.post('/insertbann', banniereController.insertbann);

//---------- modif tojo pour le systeme de gestion banniere Update
router.post('/updateBann', banniereController.updateBann);

//---------- modif tojo pour le systeme de gestion banniere majEtatBann
router.post('/majEtatBann', banniereController.majEtatBann);
module.exports = router;
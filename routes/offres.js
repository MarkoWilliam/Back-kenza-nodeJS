const express = require('express');
const offreController = require('../controllers/offres');
const router = express.Router();

//----------------lsite offre----------------------
router.get('/listeOffres', offreController.listeOffres);

//----------------Insertion offre-----------------
router.post('/insertOffre', offreController.insertOffre);

//---------------Uodate offres-------------------
router.post('/updateOffres', offreController.updateOffres);

//-------------- Update etat
router.post('/updateEtat', offreController.updateEtat);

//-------------------Banière titre--------

//----------------lsite offre----------------------
router.get('/listeTitre', offreController.listeTitre);

//----------------Insertion titre-----------------
router.post('/insertTitre', offreController.insertTitre);


//-------------- Update etat titre
router.post('/updateEtatTitre', offreController.updateEtatTitre);



//----------------lsite service----------------------
router.get('/listeService', offreController.listeService);

//----------------lsite service avec etat----------------------
router.get('/listeEtatServ', offreController.listeEtatServ);

//----------------Insertion service-----------------
router.post('/insertService', offreController.insertService);

//---------------Uodate service-------------------
router.post('/updateService', offreController.updateService);

//-------------- Update etat service
router.post('/updateEtatService', offreController.updateEtatService);
module.exports = router;
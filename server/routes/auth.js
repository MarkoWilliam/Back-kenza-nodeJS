const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();
const cookieParser = require('cookie-parser');


//---------------Registration-----------------
router.post('/register', authController.register);

//---------------Login------------------
router.post('/login', authController.login);

//-------------- liste user Modif tojo
router.get('/listeUser', authController.listeUser);

//-------------- maj etat user
router.post('/majEtatUser', authController.majEtatUser);


//-------------- maj etat user---------
router.post('/majUser', authController.majUser);

//-------------Type utilisateur-------------

router.get('/typeUser', authController.typeUser)
router.post('/insertType', authController.insertType);

module.exports = router;
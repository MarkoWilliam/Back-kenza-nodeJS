const express = require('express');
const produitController = require('../controllers/produit');
const router = express.Router();

router.get('/produitList', produitController.produitList);

module.exports = router;
const express = require('express');
const appController = require('../controllers/App_Employee_Admin');
const router = express.Router();

//------- Mobile login---------
router.post('/login', appController.login);

//------ insert notif new commande
router.post('/NotifNewOrder', appController.NotifNewOrder);

//------ insert notif new commande
router.get('/Listeneworder', appController.Listeneworder);


module.exports = router;
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

//--------Inscription-------------------
router.get('/register', (req, res) => {
    res.render('register');
});

//--------login-------------------
router.get('/login', (req, res) => {
    res.render('login');
});

router.options('*', (req, res) => {
    res.status(200).send('ok');
});

module.exports = router;
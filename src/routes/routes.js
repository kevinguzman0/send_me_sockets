const { signUp, logout, changePassword } = require('../controllers/users.controller');
const { isAuthenticated, isAuthenticatedClient, isAuthenticatedAdmin } = require('../public/js/auth');
const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/User');
const Comando = require('../models/Comando');
const Tema = require('../models/Tema');
const Video = require('../models/Video');

require('../public/js/passport');

router.get('/register', (req, res) => {
    res.redirect('/')
})
router.post('/signup', signUp);

router.post('/signin', function (req, res) {
    var admin = false
    if (req.body.name == "admin") {
        admin = true
        res.json(admin);
    }
    else {
        res.json(admin);
        // res.redirect('/client');
    }

}
);
router.get('/logout', isAuthenticated, logout);

router.get('/aframe', (req, res) => {
    res.render('aframe');
});

router.get("/admin", isAuthenticatedAdmin, async (req, res) => {

    const videos = await Video.find().lean();
    const users = await User.find().lean();
    const comands = await Comando.find().lean();
    const temas = await Tema.find().lean();

    res.render('admin', { videos, users, comands, temas });
});


router.get("/client", isAuthenticatedClient, (req, res) => {

    io.engine.generateId = () => {

        var sesionUser = req.session.passport.user;

        return sesionUser;
    }

    res.render('client');

});

module.exports = router
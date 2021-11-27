const { signUp, logout, changePassword } = require('../controllers/users.controller');
const express = require('express');
const router = express.Router();
const User = require('../models/User');

require('../public/js/passport');

router.get('/register', (req, res) => {
    res.redirect('/')
})
router.post('/signup', signUp);

router.get('/list-clients', async (req, res) => {
    const users = await User.find().lean();
    res.json(users)
});

module.exports = router
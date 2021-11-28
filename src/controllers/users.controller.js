const usersCtrl = {};
const passport = require('passport');
const User = require('../models/User');

//registro
usersCtrl.signUp = async (req, res) => {
    const errors = [];
    const {name, password, confirmPassword} = req.body;

    if (password != confirmPassword) {
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if (password.length < 4) {
        errors.push({text: 'Password debe ser mayor de 4 caracteres'});
    }
    if (errors.length > 0) {
        res.json({
            errors,
        });
    } else {
        const nameUser = await User.findOne({name: name});
        if (nameUser) {
            errors.push({text:  'Este nombre de usuario ya esta en uso'});
            res.json({
                errors,
            });
        } else{
            const newUser = new User({name, password});
            newUser.password = await newUser.encryptPassword(password);
            console.log(newUser);
            await newUser.save();
            res.json("User saved")
        }
    }

};

//logout
usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Session Cerrada.');
    res.redirect('/');
}

module.exports = usersCtrl;
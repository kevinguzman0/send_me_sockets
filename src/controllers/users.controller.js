const usersCtrl = {};
const passport = require('passport');
const User = require('../models/User');

//registro
usersCtrl.signUp = async (req, res) => {
    const errors = [];
    const {name, password, confirmPassword, tienda} = req.body;

    if (password != confirmPassword) {
        errors.push({text: 'Password do not match'});
    }
    if (password.length < 4) {
        errors.push({text: 'Password debe ser mayor de 4 caracteres'});
    }
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            tienda
        });
    } else {
        const nameUser = await User.findOne({name: name});
        if (nameUser) {
            errors.push({text:  'Este nombre de usuario ya esta en uso'});
            res.render('register', {
                errors,
                name,
                tienda 
            });
        } else{
            const newUser = new User({name, tienda, password});
            newUser.password = await newUser.encryptPassword(password);
            console.log(newUser);
            await newUser.save();
            res.redirect('/');
        }
    }
};

usersCtrl.changePassword = async (req, res) => {
    const errors = [];
    const {name, password, confirmPassword} = req.body;
    

    User.findOne({name:`${name}`}).then(doc =>{
        
        if (password == confirmPassword) {
            const newUser = new User();
            newUser.name = name;
            newUser.tienda = doc.tienda;
            newUser.password = password;

            console.log(newUser);

            newUser.save();

            doc.deleteOne();

            res.redirect('/');
            
        }
        else{
            res.redirect('back');
        }

    }).catch(err=>{
        console.log("Valor no encontrado");
    });




}

//logout
usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Session Cerrada.');
    res.redirect('/');
}

module.exports = usersCtrl;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User =require('../../models/User');


passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
}, async (name, password, done) => {

    //VERIFICAR NAME
    const user = await User.findOne({name});
    if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });

    } else {
        //VERIFICAR CONTRASEÑA
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'La contraseña es incorrecta' });
        }
    }

}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
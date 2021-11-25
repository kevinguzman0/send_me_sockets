const express = require('express');
const app = express();

const path = require('path');
const morgan = require('morgan')
const SocketIO = require('socket.io');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const fs = require('fs');
const mqtt = require('mqtt');
const Dato = require('./models/Dato');
const Valor = require('./models/Valor');

require('./database');
require('./public/js/passport');


/////////////CONFIGURACION PUERTO DEL SERVIDOR////////////
app.set('port', process.env.PORT || 3000);
app.set('view engine', '.hbs');

/////////////MIDDLEWARES//////////////////
app.use(morgan('dev'));
app.use(express.json());

////////////ROUTES/////////////////////
app.use(require('./routes/routes'))

//INICIAR EL SERVIDOR
const server = app.listen(app.get('port'), () => {
    console.log("servidor en el puerto", app.get('port'));
});

///////////CONFIGURACION/////////

const io = SocketIO.listen(server);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('public', path.join(__dirname, 'public'));
app.engine('.hbs', exphbs({
    defaultLayout: 'index',
}));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/////////////////////VARIABLES GLOBALES///////////////
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


/////////////////////USAR SOCKET IO///////////////////////

//CONFIGURAR WEBSOCKETS
io.on('connection', (socket) => {
    console.log("new connection", socket.id);
});

const express = require('express');
const app = express();

const path = require('path');
const morgan = require('morgan')
const SocketIO = require('socket.io');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

require('./database');
require('./public/js/passport');
const { isAuthenticatedClient } = require('./public/js/auth');


/////////////CONFIGURACION PUERTO DEL SERVIDOR////////////
app.set('port', process.env.PORT || 3000);

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
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', require('exphbs'));
app.set('view engine', '.hbs');

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

app.post('/signin', passport.authenticate('local', { failureRedirect: '/' }),
    function (req, res) {
        var admin = false
        if (req.body.name == "admin") {
            admin = true
            res.json(admin);
        }
        else {
            res.json(admin);
        }
    }
);

app.get("/client", isAuthenticatedClient, (req, res) => {

    io.engine.generateId = () => {

        var sesionUser = req.session.passport.user;

        return sesionUser;
    }

    res.render('client');

});

app.post("/enviarvideo", (req, res) => {

    var data = req.body.video;
    var idClientVideo = req.body.client;

    console.log("Video - " + data);
    console.log("Cliente - " + idClientVideo);
    console.log("---------------------------");

    if (idClientVideo == null || data == null) {
        res.redirect('back');
    }

    io.sockets.to(`${idClientVideo}`).emit('envio:video', data);
    console.log("Video al cliente " + idClientVideo + " emitido");
    console.log("---------------------");

    res.json("Video emitido")
});
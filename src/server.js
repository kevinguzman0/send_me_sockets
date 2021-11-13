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
app.use('/sendme', require('./routes/routes'))

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

app.post("/enviarvideo", (req, res) => {

    var data = req.body.cbox_video;
    var idClientVideo = req.body.cbox_cliente;
    var nametxt = req.body.cbox_txt;
    var temamqtt = req.body.cbox_tema;

    var cantClientes = 0;

    if (typeof (idClientVideo) == 'string') {
        cantClientes = 1;
    }
    else {
        for (let i = 0; i < idClientVideo.length; i++) {
            cantClientes = i + 1;
        }
    }
    var totalDato = '';

    Valor.findOne({ valor: '3000' }).then(doc => {
        totalDato = doc.valor;
    }).catch(err => {
        console.log("Valor no encontrado");
    });

    Dato.findOne({ video: `${data}` }).then(doc => {

        doc.cantidad++;
        for (let i = 0; i < cantClientes; i++) {
            doc.persona++;
        }
        doc.total = (doc.cantidad * doc.persona) * totalDato;

        doc.save();
        console.log("CAMPO ACTUALIZADO");

    }).catch(err => {

        const datos = new Dato();
        datos.tema = temamqtt;
        datos.video = data;
        datos.cantidad = 1;
        datos.persona = cantClientes;
        datos.total = (cantClientes * 1) * totalDato;

        datos.save();

        console.log("nuevo DatoVideo agregado");
        console.log(datos);
        console.log("-------------------------");

    });

    console.log("Video - " + data);
    console.log("Cliente - " + idClientVideo);
    console.log("---------------------------");

    if (idClientVideo == null || data == null || nametxt == null || temamqtt == null) {
        res.redirect('back');
    }

    if (typeof (idClientVideo) == 'string') {

        setTimeout(() => {
            io.sockets.to(`${idClientVideo}`).emit('envio:video', data);
            console.log("Video al cliente " + idClientVideo + " emitido");
            console.log("---------------------");

            fs.readFile(path.join(__dirname, 'txtcomands/', nametxt), 'utf-8', (err, data) => {
                if (err) {
                    console.log('error: ', err);
                } else {
                    var client = mqtt.connect("mqtt://157.230.237.131", {
                        username: "vrvideo",
                        password: "admin"
                    }); //me conecto por mqtt al servidor, puedo colocar localhost también
                    var lineas = data.split('\n');
                    var increment = 1;

                    client.on('connect', function () {
                        console.log("conectando a MQTT");
                        client.subscribe('+/#', function (err) { //con esto me suscribo a todos los temas, es sólo para depurar
                            console.log("realizado");
                        })
                        // client.publish('mq_unico', 'a;3');
                    });

                    lineas.forEach(function (linea) {
                        var runner = setTimeout(function () {
                            // Do your stuff.
                            client.publish(`${temamqtt}`, linea);

                            clearTimeout(runner);
                        }, 1000 * increment);

                        increment = increment + 1;
                    });
                }
            });
        }, 5000);

        io.sockets.to(`${idClientVideo}`).emit('envio:video', data);
        console.log("Video al cliente " + idClientVideo + " emitido");
        console.log("---------------------");

    }
    else {
        setTimeout(() => {
            for (let i = 0; i < idClientVideo.length; i++) {

                console.log("Cliente - " + idClientVideo[i]);

                idClientVideo[i] = idClientVideo[i].toString();

                io.sockets.to(`${idClientVideo[i]}`).emit('envio:video', data);

                console.log("Video al cliente " + idClientVideo[i] + " emitido");
                console.log("---------------------");

            };
            fs.readFile(path.join(__dirname, 'txtcomands/', nametxt), 'utf-8', (err, data) => {
                if (err) {
                    console.log('error: ', err);
                } else {
                    var client = mqtt.connect("mqtt://157.230.237.131", {
                        username: "vrvideo",
                        password: "admin"
                    }); //me conecto por mqtt al servidor, puedo colocar localhost también
                    var lineas = data.split('\n');
                    var increment = 1;

                    client.on('connect', function () {
                        console.log("conectando a MQTT");
                        client.subscribe('+/#', function (err) { //con esto me suscribo a todos los temas, es sólo para depurar
                            console.log("realizado");
                        })
                        // client.publish('mq_unico', 'a;3');
                    });

                    lineas.forEach(function (linea) {
                        var runner = setTimeout(function () {
                            // Do your stuff.
                            client.publish(`${temamqtt}`, linea);

                            clearTimeout(runner);
                        }, 1000 * increment);

                        increment = increment + 1;
                    });
                }
            });

        }, 5000);

        for (let i = 0; i < idClientVideo.length; i++) {

            console.log("Cliente - " + idClientVideo[i]);

            idClientVideo[i] = idClientVideo[i].toString();

            io.sockets.to(`${idClientVideo[i]}`).emit('envio:video', data);

            console.log("Video al cliente " + idClientVideo[i] + " emitido");
            console.log("---------------------");

        };

    }

    req.flash('success_msg', 'Videos enviados a los clientes seleccionados.');
    res.redirect('back');
});

const mongoose = require('mongoose');

//"mongodb+srv://admin:admin@videoserver.0hhgh.mongodb.net/videoServer?retryWrites=true&w=majority"
mongoose.connect('mongodb://localhost/sendme', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));

module.exports = mongoose;

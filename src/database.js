const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kevin:12345@sendme.0hhgh.mongodb.net/sendme?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));

module.exports = mongoose;

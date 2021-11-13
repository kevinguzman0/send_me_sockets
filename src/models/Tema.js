const { Schema, model} = require('mongoose');

const TemaSchema = new Schema({
    name: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = model('Tema', TemaSchema);

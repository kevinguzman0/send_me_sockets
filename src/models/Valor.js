const { Schema, model} = require('mongoose');

const ValorSchema = new Schema({
    valor: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = model('Valor', ValorSchema);
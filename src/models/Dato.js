const { Schema, model} = require('mongoose');

const DatosSchema = new Schema({
    tema: {
        type: String
    },
    video: {
        type: String
    },
    cantidad: {
        type: String
    },
    persona: {
        type: String
    },
    total: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = model('Dato', DatosSchema);
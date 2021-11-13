const { Schema, model} = require('mongoose');

const VideoSchema = new Schema({
    filename: {
        type: String
    },
    path: {
        type: String
    },
    originalname: {
        type: String
    },
    mimetype: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = model('Video', VideoSchema);
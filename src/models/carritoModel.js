var mongoose = require('mongoose');
var schema = mongoose.Schema;


var carritoSchema = schema({
    id_usuario: {
        type: String,
        required: true
    },
    id_juego: {
        type: [],
        required: true
    },
    estado: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('carrito', carritoSchema);
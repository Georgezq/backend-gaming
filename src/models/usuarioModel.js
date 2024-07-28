var mongoose = require('mongoose');
var schema = mongoose.Schema;


var usuarioSchema = schema({
    displayName: { type: String, default: null },
    email: { type: String, required: null },
    imagenperfil: { type: String, default: null },
    fechacreacion: { type: Date, default: Date.now },
    redesSociales: {
        discord: { type: String, default: null },
        steam: { type: String, default: null },
        youtube: { type: String, default: null }
    }
   // amigos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'usuario' }]

});

module.exports = mongoose.model('usuario', usuarioSchema);
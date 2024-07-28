var mongoose = require('mongoose');
var schema = mongoose.Schema;


var reviewSchema = schema({
    id_usuario: { type: schema.Types.ObjectId, ref: 'usuario', required: true },
    id_juego: String,
    comentario: String,
    calificacion: { type: Boolean, required: true },
    pros: { type: [], default: null },
    contras: { type: [], default: null },
    fecha: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    likedBy: [{ type: schema.Types.ObjectId, ref: 'usuario' }],
    dislikedBy: [{ type: schema.Types.ObjectId, ref: 'usuario' }]
});

module.exports = mongoose.model('reviews', reviewSchema);
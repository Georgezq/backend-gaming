var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wishlistSchema = new Schema({
    id_usuario: {
        type: String,
        required: true
    },
    id_juego: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// Índice compuesto único para evitar duplicados
wishlistSchema.index({ id_usuario: 1, id_juego: 1 }, { unique: true });

// Middleware para actualizar `updated_at` en cada guardado
wishlistSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model('Deseado', wishlistSchema);

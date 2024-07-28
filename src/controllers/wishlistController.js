const Deseado = require('../models/wishlistModel');

async function addToWishlist(req, res) {
    const params = req.body;
    const { id_usuario, id_juego } = params;

    try {
        // Verificar si el juego ya está en la lista de deseados del usuario
        const existingWishlistItem = await Deseado.findOne({ id_usuario: id_usuario, id_juego: id_juego });

        if (existingWishlistItem) {
            return res.status(400).json({
                mensaje: 'El juego ya está en la lista de deseados del usuario'
            });
        }

        let wishlistItem = new Deseado({
            id_usuario: id_usuario,
            id_juego: id_juego,
            fecha_agregado: new Date()
        });

        const wishlistStored = await wishlistItem.save();

        if (wishlistStored) {
            res.status(200).json({
                wishlist: wishlistStored
            });
        } else {
            res.status(500).json({
                mensaje: 'Error, no se guardó el juego en la lista de deseados'
            });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}

async function removeFromWishlist(req, res) {
    const { id_usuario, id_juego } = req.body;

    try {
        // Eliminar el juego de la lista de deseados del usuario
        const result = await Deseado.findOneAndDelete({ id_usuario: id_usuario, id_juego: id_juego });

        if (result) {
            res.status(200).json({ mensaje: 'Juego eliminado de la lista de deseados' });
        } else {
            res.status(404).json({ mensaje: 'El juego no estaba en la lista de deseados' });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}

async function getWishlistByUser(req, res) {
    const userId = req.params.id_usuario;

    try {
        // Obtener la lista de deseados del usuario
        const wishlist = await Deseado.find({ id_usuario: userId });

        if (wishlist.length > 0) {
            const gameIds = wishlist.map(deseados => deseados.id_juego);
            res.status(200).json(gameIds);
        } else {
            res.status(404).json({ mensaje: 'No se encontraron reviews para este usuario' });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}

async function getWishlistByUserToDate(req, res) {
    const userId = req.params.id_usuario;

    try {
        // Obtener la lista de deseados del usuario
        const wishlist = await Deseado.find({ id_usuario: userId });

        if (wishlist.length > 0) {
            res.status(200).json(wishlist);
        } else {
            res.status(404).json({ mensaje: 'No se encontraron juegos deseados para este usuario' });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}

async function getWishlistByGame(req, res) {
    const gameId = req.params.id_juego;

    try {
        const wishlist = await Deseado.find({ id_juego: gameId });

        if (wishlist.length > 0) {
            res.status(200).json(wishlist);
        } else {
            res.status(404).json({ mensaje: 'No se encontró el deseado a este juego' });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}

async function isGameInWishlist(req, res) {
    const { id_usuario, id_juego } = req.params;

    try {
        const wishlistItem = await Deseado.findOne({ id_usuario: id_usuario, id_juego: id_juego });

        if (wishlistItem) {
            res.status(200).json({ inWishlist: true });
        } else {
            res.status(200).json({ inWishlist: false });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}

async function countWishlistsByUser(req, res) {
    const userId = req.params.id_usuario;

    try {
        const wishlistCount = await Deseado.countDocuments({ id_usuario: userId });

        res.status(200).json({ wishlistCount });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}

module.exports = {
    addToWishlist,
    countWishlistsByUser,
    getWishlistByUser,
    getWishlistByGame,
    isGameInWishlist,
    removeFromWishlist,
    getWishlistByUserToDate,
}
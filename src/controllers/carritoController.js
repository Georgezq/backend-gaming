var Carrito = require('../models/carritoModel');

// Agregar juego al carrito
async function addToCart(req, res) {
    const { id_usuario, id_juego, estado } = req.body;

    try {
        let cart = await Carrito.findOne({ id_usuario, estado: true });

        if (cart) {
            // El carrito con estado true ya existe, agrega el juego al arreglo id_juego
            cart.id_juego.push(id_juego);
        } else {
            // El carrito con estado true no existe, crea uno nuevo
            cart = new Carrito({ id_usuario, id_juego: [id_juego], estado });
        }

        const savedItem = await cart.save();
        res.status(200).json(savedItem);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
}

// Obtener carrito del usuario
async function getCartByUserId(req, res) {
    const userId = req.params.id_usuario;

    try {
        const cart = await Carrito.findOne({ id_usuario: userId, estado: true });

        if (cart && cart.id_juego.length > 0) {
            res.status(200).json(cart.id_juego);
        } else {
            res.status(404).json({ mensaje: 'No se encontraron juegos en el carrito de este usuario' });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}

async function getGamesBuyById(req, res) {
    const userId = req.params.id_usuario;

    try {
        // Encuentra todos los documentos que coincidan con el id_usuario y estado: false
        const carts = await Carrito.find({ id_usuario: userId, estado: false });

        if (carts.length > 0) {
            // Extrae todos los id_juego de los documentos encontrados
            const allGames = carts.reduce((acc, cart) => acc.concat(cart.id_juego), []);
            res.status(200).json(allGames);
        } else {
            res.status(404).json({ mensaje: 'No se encontraron juegos en el carrito de este usuario' });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}



// Obtener estado del carrito
async function getStateByUser(req, res) {
    const userId = req.params.id_usuario;

    try {
        const cart = await Carrito.findOne({ id_usuario: userId });

        if (cart) {
            res.status(200).json({ estado: cart.estado });
        } else {
            res.status(404).json({ mensaje: 'No se encontraron los estados correspondientes' });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}

// Eliminar juego del carrito
async function removeFromCart(req, res) {
    const { id_usuario, id_juego } = req.params;

    try {
        // Buscar carrito por id_usuario y estado true
        const cart = await Carrito.findOne({ id_usuario, estado: true });

        if (cart) {
            // Encontrar el índice del juego en el arreglo id_juego
            const index = cart.id_juego.findIndex(gameId => gameId.toString() === id_juego.toString());
            if (index > -1) {
                // Eliminar el juego del arreglo
                cart.id_juego.splice(index, 1);
                // Guardar el carrito actualizado
                await cart.save();
                res.status(200).json({ mensaje: 'Juego eliminado del carrito', carrito: cart });
            } else {
                res.status(404).json({ mensaje: 'Juego no encontrado en el carrito' });
            }
        } else {
            res.status(404).json({ mensaje: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
}

// Contar juegos en el carrito por usuario
async function countCartByUser(req, res) {
    const userId = req.params.id_usuario;

    try {
        // Utilizamos aggregate para contar los elementos en el arreglo id_juego
        const result = await Carrito.aggregate([
            {
                $match: {
                    id_usuario: userId,
                    estado: true
                }
            },
            {
                $project: {
                count_juegos: { $size: "$id_juego" }
                }
            }
        ]);

        if (result.length > 0) {
            res.status(200).json({ carritoCount: result[0].count_juegos });
        } else {
            res.status(404).json({ mensaje: 'No se encontraron juegos en el carrito de este usuario' });
        }

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}

async function countGamesBuys(req, res) {
    const userId = req.params.id_usuario;

    try {
        // Utilizamos aggregate para contar los elementos en el arreglo id_juego
        const result = await Carrito.aggregate([
            {
                $match: {
                    id_usuario: userId,
                    estado: false
                }
            },
            {
                $unwind: "$id_juego"
            },
            {
                $group: {
                    _id: "$id_usuario",
                    count_juegos: { $sum: 1 }
                }
            }
        ]);

        if (result.length > 0) {
            res.status(200).json({ carritoCount: result[0].count_juegos });
        } else {
            res.status(404).json({ mensaje: 'No se encontraron juegos comprados de este usuario' });
        }

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}

module.exports = {
    addToCart,
    getCartByUserId,
    removeFromCart,
    countCartByUser,
    getStateByUser,
    countGamesBuys,
    getGamesBuyById
};

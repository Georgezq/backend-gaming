var express = require('express');
var carritoController = require('../controllers/carritoController');
var router = express.Router();

// Agregar juego al carrito
router.post('/carrito', carritoController.addToCart);
router.get('/carrito/:id_usuario', carritoController.getCartByUserId);
router.get('/comprados/:id_usuario', carritoController.getGamesBuyById);
router.get('/carrito_estado/:id_usuario', carritoController.getStateByUser);
router.get('/countU/:id_usuario', carritoController.countCartByUser);
router.get('/countG/:id_usuario', carritoController.countGamesBuys);
router.delete('/remove/:id_usuario/:id_juego', carritoController.removeFromCart);


module.exports = router;
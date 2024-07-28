var express = require('express');
var usuarioController = require('../controllers/usuarioController');
var router = express.Router();

router.get('/usuario/:id', usuarioController.getUsuario);
router.post('/usuario', usuarioController.saveUsuario);
router.put('/usuario/:id', usuarioController.updateUsuario);
router.delete('/usuario/:id', usuarioController.deleteUsuario);


module.exports = router;
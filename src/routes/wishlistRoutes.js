const express = require('express');
const wishlistController = require('../controllers/wishlistController');
const router = express.Router();

router.post('/wishlist', wishlistController.addToWishlist);
router.post('/wishlist/remove', wishlistController.removeFromWishlist);
router.get('/wishlistU/:id_usuario', wishlistController.getWishlistByUser);
router.get('/wishlistDU/:id_usuario', wishlistController.getWishlistByUserToDate);
router.get('/wishlistG/:id_juego', wishlistController.getWishlistByGame);
router.get('/wishlist/:id_usuario/:id_juego', wishlistController.isGameInWishlist);


router.get('/wishlistCount/:id_usuario', wishlistController.countWishlistsByUser);



module.exports = router;

const express = require('express');
const reviewController = require('../controllers/reviewsController');
const router = express.Router();

router.post('/reviews', reviewController.saveReview);

router.get('/reviews/game/:id_juego', reviewController.getReviewsByGame);
router.get('/reviews', reviewController.getAllReviews);
router.get('/reviews/user/:id_usuario', reviewController.getReviewsByUser);
router.get('/reviews/userG/:id_usuario', reviewController.getReviewsByUserforGame);


router.get('/reviews/countG/:id_juego', reviewController.countReviewsByGame);
router.get('/reviews/countU/:id_usuario', reviewController.countReviewsByUser);

router.post('/reviews/:id/like', reviewController.likeReview);
router.post('/reviews/:id/dislike', reviewController.dislikeReview);


module.exports = router;


const Review = require('../models/reviewsModel');

async function saveReview(req, res) {
    const params = req.body;
    const { id_usuario, id_juego, comentario, calificacion, pros, contras } = params;

    try {
        let review = new Review({
            id_usuario: id_usuario,
            id_juego: id_juego,
            comentario: comentario || null,
            calificacion: calificacion,
            pros: pros || [],
            contras: contras || [],
            fecha: new Date(),
            likes: 0,
            dislikes: 0,
            likedBy: [],
            dislikedBy: []
        });

        const reviewStored = await review.save();

        if (reviewStored) {
            res.status(200).json({
                review: reviewStored
            });
        } else {
            res.status(500).json({
                mensaje: 'Error, no se guardó la review'
            });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}

async function getReviewsByGame(req, res) {
    const gameId = req.params.id_juego;

    try {
        const reviews = await Review.find({ id_juego: gameId });

        if (reviews.length > 0) {
            res.status(200).json(reviews);
        } else {
            res.status(404).json({ mensaje: 'No se encontraron reviews para este juego' });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}

async function getAllReviews(req, res) {
    try {
        // Usar populate para obtener la información del usuario
        const reviews = await Review.find({}).populate('id_usuario');

        if (reviews.length > 0) {
            res.status(200).json(reviews);
        } else {
            res.status(404).json({ mensaje: 'No se encontraron reviews' });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}
async function getReviewsByUser(req, res) {
    const userId = req.params.id_usuario;

    try {
        const reviews = await Review.find({ id_usuario: userId });

        if (reviews.length > 0) {
            res.status(200).json(reviews);
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

async function likeReview(req, res) {
    const reviewId = req.params.id;
    const userId = req.user.id; // Suponiendo que el ID del usuario está disponible en req.user

    try {
        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({ mensaje: 'Review no encontrada' });
        }

        if (review.likedBy.includes(userId)) {
            return res.status(400).json({ mensaje: 'El usuario ya ha dado like a esta review' });
        }

        review.likedBy.push(userId);
        review.likes = review.likedBy.length;
        review.dislikedBy = review.dislikedBy.filter(id => id.toString() !== userId);
        review.dislikes = review.dislikedBy.length;

        const updatedReview = await review.save();

        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}

async function dislikeReview(req, res) {
    const reviewId = req.params.id;
    const userId = req.user.id; // Suponiendo que el ID del usuario está disponible en req.user

    try {
        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({ mensaje: 'Review no encontrada' });
        }

        if (review.dislikedBy.includes(userId)) {
            return res.status(400).json({ mensaje: 'El usuario ya ha dado dislike a esta review' });
        }

        review.dislikedBy.push(userId);
        review.dislikes = review.dislikedBy.length;
        review.likedBy = review.likedBy.filter(id => id.toString() !== userId);
        review.likes = review.likedBy.length;

        const updatedReview = await review.save();

        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}

async function countReviewsByGame(req, res) {
    const gameId = req.params.id_juego;

    try {
        const reviewCount = await Review.countDocuments({ id_juego: gameId });

        res.status(200).json({ reviewCount });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}

async function countReviewsByUser(req, res) {
    const userId = req.params.id_usuario;

    try {
        const reviewCount = await Review.countDocuments({ id_usuario: userId });

        res.status(200).json({ reviewCount });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}

async function getReviewsByUserforGame(req, res) {
    const userId = req.params.id_usuario;

    try {
        const reviews = await Review.find({ id_usuario: userId });

        if (reviews.length > 0) {
            const gameIds = reviews.map(review => review.id_juego);
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

module.exports = {
    saveReview,
    getReviewsByGame,
    getReviewsByUser,
    getReviewsByUserforGame,
    likeReview,
    dislikeReview,
    countReviewsByGame,
    countReviewsByUser,
    getAllReviews,
};

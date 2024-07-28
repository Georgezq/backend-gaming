const express = require('express');
const { createOrUpdate, deleteComementsById, getComentariosById, readAllComentarios, readComentariosByNewsId } = require('../controllers/comentariosController');

const router = express.Router();

// READ ALL Comentarios
router.get('/comentario', async (req, res) => {
    try {
        const { success, data } = await readAllComentarios();

        if (success) {
            return res.json({ success, data });
        }
        throw new Error("Failed to read comments");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// READ Comentarios by News ID
router.get('/comentario/:newsId', async (req, res) => {
    const { newsId } = req.params;

    try {
        const { success, data, error } = await readComentariosByNewsId(newsId);

        if (success) {
            return res.json({ success, data });
        }
        throw new Error(error);
    } catch (error) {
        console.error('Error reading comments by news ID:', error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


// Get Comentario by ID
router.get('/comentario/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { success, data } = await getComentariosById(id);
        if (success) {
            return res.json({ success, data });
        }
        throw new Error("Failed to get comment by ID");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Create Comentario
router.post('/comentario', async (req, res) => {
    try {
        const { success, data } = await createOrUpdate(req.body);

        if (success) {
            return res.json({ success, data });
        }
        throw new Error("Failed to create or update comment");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Update Comentario by ID
router.put('/comentario/:id', async (req, res) => {
    try {
        const comentario = req.body;
        const { id } = req.params;
        comentario.id = id;

        const { success, data } = await createOrUpdate(comentario);

        if (success) {
            return res.json({ success, data });
        }
        throw new Error("Failed to update comment");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Delete Comentario by Id
router.delete('/comentario/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { success, data } = await deleteComementsById(id);
        if (success) {
            return res.json({ success, data });
        }
        throw new Error("Failed to delete comment");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
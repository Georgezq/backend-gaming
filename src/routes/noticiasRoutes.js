const express = require('express');
const { createOrUpdate, deleteNoticiasById, getNoticiasById, readAllNoticias } = require('../controllers/noticiasController');

const router = express.Router();

// READ ALL News
router.get('/noticia', async (req, res) => {
    try {
        const { success, data } = await readAllNoticias();

        if (success) {
            return res.json({ success, data });
        }
        throw new Error("Failed to read news");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Get News by ID
router.get('/noticia/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { success, data } = await getNoticiasById(id);
        if (success) {
            return res.json({ success, data });
        }
        throw new Error("Failed to get comment by ID");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Create News
router.post('/noticia', async (req, res) => {
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

// Update News by ID
router.put('/noticia/:id', async (req, res) => {
    try {
        const noticias = req.body;
        const { id } = req.params;
        noticias.id = id;

        const { success, data } = await deleteNoticiasById(noticias);

        if (success) {
            return res.json({ success, data });
        }
        throw new Error("Failed to update new");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Delete News by Id
router.delete('/noticia/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { success, data } = await deleteComementsById(id);
        if (success) {
            return res.json({ success, data });
        }
        throw new Error("Failed to delete new");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
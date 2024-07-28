var Usuario = require('../models/usuarioModel');

async function getUsuario(req, res) {
    const userId = req.params.id; // Obtener el ID del usuario desde los parámetros de la ruta

    try {
        // Buscar el usuario por su ID en la base de datos
        const usuario = await Usuario.findById(userId);

        if (usuario) {
            res.status(200).json(usuario); // Si el usuario se encuentra, devolver sus datos
        } else {
            res.status(404).json({ mensaje: 'Usuario no encontrado' }); // Si no se encuentra, devolver un mensaje de error
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message }); // Manejar errores del servidor
    }
};


async function saveUsuario(req, res) {
    const params = req.body;
    const { email } = params;

    try {
        // Verificar si ya existe un usuario con el correo electrónico proporcionado
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            // Si el usuario ya existe, devolver su ID
            return res.status(200).json({
                id: usuario._id
            });
        }

        // Si el usuario no existe, proceder a crear uno nuevo
        usuario = new Usuario({
            displayName: params.displayName,
            email: params.email,
            imagenperfil: params.imagenperfil,
            fechacreacion: new Date(),
            redesSociales: {
                discord: params.redesSociales.discord,
                steam: params.redesSociales.steam,
                youtube: params.redesSociales.youtube
            }
        });

        // Guardar el nuevo usuario en la base de datos
        const usuarioStored = await usuario.save();

        if (usuarioStored) {
            res.status(200).json({
                id: usuarioStored._id
            });
        } else {
            res.status(500).json({
                mensaje: 'Error, no se guardó el usuario'
            });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
}

async function updateUsuario(req, res) {
    const usuarioId = req.params.id;
    const updateData = req.body;

    try {
        const usuarioUpdated = await Usuario.findByIdAndUpdate(usuarioId, updateData, { new: true });
        if (usuarioUpdated) {
            res.status(200).json(usuarioUpdated);
        } else {
            res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

async function deleteUsuario(req, res) {
    const usuarioId = req.params.id;

    try {
        const usuarioDeleted = await Usuario.findByIdAndDelete(usuarioId);
        if (usuarioDeleted) {
            res.status(200).json(usuarioDeleted);
        } else {
            res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

module.exports = {
    saveUsuario,
    getUsuario,
    updateUsuario,
    deleteUsuario,
};
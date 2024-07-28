const {db, noticias} = require('../../config/db.config');
const { v4: uuidv4 } = require('uuid');

const createOrUpdate = async (data = {}) => {
    // Generar un ID si no está presente
    if (!data.id_noticias) {
        data.id_noticias = uuidv4();
    }

    const params = {
        TableName: noticias,
        Item: data
    };

    try {
        await db.put(params).promise();
        return { success: true, id_noticias: data.id_noticias };
    } catch (error) {
        return { success: false, error: error.message };
    }
};


// Read all Comements
const readAllNoticias = async()=>{
    const params = {
        TableName: noticias
    }

    try{
        const { Items = [] } = await db.scan(params).promise()
        return { success: true, data: Items }

    } catch(error){
        return { success: false, data: null }
    }

}

// Read Comements by ID
const getNoticiasById = async (value, key = 'id_noticias') => {
    const params = {
        TableName: noticias,
        Key: {
            [key]: value
        }
    }
    try {
        const { Item = {} } =  await db.get(params).promise()
        return { success: true, data: Item }
    } catch (error) {
        return {  success: false, data: null}        
    }
}

// Delete Comements by ID
const deleteNoticiasById = async(value, key = 'id_noticias' ) => { 
    const params = {
        TableName: noticias,
        Key: {
            [key]: value
        }
    }
        
    try {
        await db.delete(params).promise()
        return {  success: true }

    } catch (error) {
        return{ success: false }
    }
}

module.exports = {
    createOrUpdate,
    readAllNoticias,
    getNoticiasById,
    deleteNoticiasById,
}
const {db, Table} = require('../../config/db.config');
const { v4: uuidv4 } = require('uuid');


// Create or Update users
const createOrUpdate = async (data = {}) => {
    // Generar un ID si no está presente
    if (!data.id) {
        data.id = uuidv4();
    }

    const params = {
        TableName: Table,
        Item: data
    };

    try {
        await db.put(params).promise();
        return { success: true, id: data.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Read comments by news ID
const readComentariosByNewsId = async (newsId) => {
    const params = {
        TableName: Table,
        IndexName: 'id_noticia-index', // Verifica que este nombre coincida con el nombre del índice en DynamoDB
        KeyConditionExpression: 'id_noticia = :newsId',
        ExpressionAttributeValues: {
            ':newsId': newsId
        }
    };

    try {
        const result = await db.query(params).promise();
        return { success: true, data: result.Items };
    } catch (error) {
        console.error('Error querying DynamoDB:', error); // Asegúrate de tener logs detallados
        return { success: false, error: error.message };
    }
};


// Read all Comements
const readAllComentarios = async()=>{
    const params = {
        TableName: Table
    }

    try{
        const { Items = [] } = await db.scan(params).promise()
        return { success: true, data: Items }

    } catch(error){
        return { success: false, data: null }
    }

}

// Read Comements by ID
const getComentariosById = async (value, key = 'id') => {
    const params = {
        TableName: Table,
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
const deleteComementsById = async(value, key = 'id' ) => { 
    const params = {
        TableName: Table,
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
    readAllComentarios,
    getComentariosById,
    deleteComementsById,
    readComentariosByNewsId
}
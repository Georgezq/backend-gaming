const dotenv = require('dotenv');
dotenv.config();

const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const mongoService = require('./src/services/mongoService');
const comentarios = require('./src/routes/comentariosRoutes');
const noticias = require('./src/routes/noticiasRoutes');
const auth = require('./src/routes/auth_token')
const stripe = require('./src/services/stripeService');


const generalPort = 3800;
// Configura el middleware
app.use(bodyParser.json());

var cors = require('cors');


const corsOptions = {
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200
};

app.use(cors(corsOptions));

/*
mongoose.connect('mongodb+srv://yosho2mendoza:yosho2mendoza@gaming-bd.yyfevqg.mongodb.net/?retryWrites=true&w=majority&appName=gaming-bd')
    .then(() =>{
        console.log("Conectado a la base de datos");
       })
*/
 mongoose.connect('mongodb://localhost:27017/games_store')
 .then(() =>{
     console.log("Conectado a la base de datos");
 })

app.use('/api', [comentarios, noticias,auth, stripe, mongoService]);
app.listen(generalPort, () => {
    console.log(`Conectado en el puerto:`, generalPort)
});
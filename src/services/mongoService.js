var express = require('express');
var app = express();
var cors = require('cors');


const corsOptions = {
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200
};

app.use(cors(corsOptions));

app.use(express.json());

var usuario_routes = require('../routes/usuarioRoutes');
var reviews_routes = require('../routes/reviewsRoutes');
var wishlist_routes = require('../routes/wishlistRoutes'); 
var carrito_routes = require('../routes/carritoRoutes'); 



app.use(express.urlencoded({extended:false}));
app.use(express.json());

//api

app.use('/mongo', usuario_routes);
app.use('/mongo', reviews_routes);
app.use('/mongo', wishlist_routes);
app.use('/mongo', carrito_routes);


module.exports = app;
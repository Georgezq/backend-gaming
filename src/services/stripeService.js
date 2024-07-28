// This is your test secret API key.
const stripe = require('stripe')('sk_test_51PXWsERp4TSFaciLQ5GrH764LLYxJndO9vKfRW1LhMGOOKeMmjXq94GhllDaaqku6MvEQNJam6yJyGC1cWKN062d00gkkNp2a3');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var router = express.Router();
const stripeWebhookSecret = 'whsec_20221402'; // Configura tu webhook secret
var Carrito = require('../models/carritoModel');

const app = express();

const YOUR_DOMAIN = 'http://localhost:4242';
const FRONTEND_DOMAIN = 'http://localhost:4200';

// Configurar CORS
app.use(cors({
  origin: FRONTEND_DOMAIN
}));

app.use(express.static('public'));
app.use(bodyParser.json());

router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
  }

  if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // Aquí actualizas el carrito en la base de datos
      Carrito.updateMany({ id_usuario: session.client_reference_id, estado: true }, { $set: { estado: false } }, (err, res) => {
          if (err) {
              console.log(err);
          } else {
              console.log('Carrito actualizado exitosamente');
          }
      });
  }

  res.sendStatus(200);
});

router.post('/checkout', async (req, res) => {
  const items = req.body.items.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.nombre,
          images: [item.imagen],
        },
        unit_amount: item.precio * 100,
      },
      quantity: 1,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [...items],
      mode: 'payment',
      success_url: `${FRONTEND_DOMAIN}/#/carrito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_DOMAIN}/#/home`,
      client_reference_id: req.body.userId  // Asegúrate de enviar el userId desde el frontend
    });

    // Actualizar estado del carrito a false
    await Carrito.updateMany({ id_usuario: req.body.userId, estado: true }, { $set: { estado: false } });

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
});



router.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

module.exports = router;

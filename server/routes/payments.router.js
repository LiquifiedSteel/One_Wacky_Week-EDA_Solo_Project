const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const stripe = require('stripe')(process.env.SERVER_SESSION_SECRET);
const YOUR_DOMAIN = 'http://localhost:5173';


router.post('/construct-session', rejectUnauthenticated, async (req, res) => {
    const email = req.body.user_email;
    console.log(email);
    try {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
            price: 'price_1Q8lUP1zbnYLR7GyDI9gNAwI',
            quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/#/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${YOUR_DOMAIN}/#/cancel`,
        customer_email: email,
    });

    console.log('Checkout session created:', session);
    res.send({id: session.id, url: session.url});

    } catch (err) {
        console.error('Error making checkout session', err);
        res.sendStatus(500);
    };
});

module.exports = router;
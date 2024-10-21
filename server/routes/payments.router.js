const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const stripe = require('stripe')(process.env.SERVER_SESSION_SECRET);
const YOUR_DOMAIN = 'http://localhost:5173';

router.get('/check-status/:email', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "Payments"."id" FROM "Payments" JOIN "user" ON "Payments"."user_email"="user"."user_email" 
  WHERE "user"."user_email"=$1;`;
  pool.query(queryText, [req.params.email])
    .then((response) => {if(response.rows.length>0){
      res.status(200).json({ found: true })
    } else {
      res.status(200).json({ found: false })
    }})
    .catch((err) => res.status(500).json({ success: false, error: err.message }))
})

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
        cancel_url: `${YOUR_DOMAIN}/#/download`,
        customer_email: email,
    });

    console.log('Checkout session created:', session);
    res.send({id: session.id, url: session.url});

    } catch (err) {
        console.error('Error making checkout session', err);
        res.sendStatus(500);
    };
});


router.post('/verify', rejectUnauthenticated, async (req, res) => {
    const user = req.body.user;
    const sessionId = req.body.sessionID;
    console.log(user);
    try {
      // Retrieve the session from Stripe
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      console.log('Retrieved session:', session);
      if (session.payment_status === 'paid') {
        const {
          id: session_id,
          payment_intent: paymentIntentId,
          amount_total,
          currency,
          customer_email,
        } = session;
        // Retrieve quantity from the session object
        const quantity = session.amount_total / 999; // Assuming 999 cents per game purchase
        console.log('Session details - Email:', customer_email);
        // Check if the payment has already been recorded
        const paymentCheckQuery =
          'SELECT "id" FROM "Payments" WHERE "user_email"=$1;';
        const paymentCheckResult = await pool.query(paymentCheckQuery, [user.user_email]);
        if (paymentCheckResult.rows.length === 0) {
          const userQuery = 'SELECT id FROM "user" WHERE user_email = $1';
          const userResult = await pool.query(userQuery, [customer_email]);
          if (userResult.rows.length > 0) {
            const userId = userResult.rows[0].id;
            const query = `UPDATE "user" SET "purchased"=TRUE WHERE "id"=$1;`;

            await pool.query(query, [userId]);

            const queryText = `INSERT INTO "Payments" (user_email, amount) VALUES ($1, $2) RETURNING id;`;
            // Set status as true for completed payments
            const paymentResult = await pool.query(queryText, [
              user.user_email,
              amount_total / 100, // Convert from cents to dollars
            ]);

            console.log('Payment information stored with email:', paymentResult.rows[0].id);
            res.json({ success: true });
          } else {
            console.error('User not found with email:', customer_email);
            res.json({ success: false, error: 'User not found' });
          }
        } else {
          console.log('Payment already recorded.');
          res.json({ success: true, message: 'Payment already recorded.' });
        }
      } else {
        res.json({ success: false, error: 'Payment not completed' });
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });


module.exports = router;
// This is your test secret API key.
const stripe = require('stripe')('sk_test_51Ows1XSDwETzF1L03tjjTrzcvJyIXKf69ojYEdIefON5lECESq6oKh2x0YuMiGgeEnFTKmylKgpP9E7Uw0dcQ67200Bv0Bw8zX');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3001';

app.post('/api/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: '{{PRICE_ID}}',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success`,
        cancel_url: `${YOUR_DOMAIN}/cancel`,
    });

    res.redirect(303, session.url);
});

// app.listen(3000, () => console.log('Running on port 4242'));



const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
    app.post('/api/stripe', requireLogin,  
        async (req, res) => {
            const charge = await stripe.charges.create({
                amount: 500,
                currency: 'usd',
                description: '5$ for 1 launch',
                source: req.body.id
            });
            req.user.credits += 1;
            const user = await req.user.save();
            res.send(user);
        });
};
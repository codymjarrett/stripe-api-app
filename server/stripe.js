// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_7M1wWKMxJWhn6cJrMmfWDTVb005bO2dLui');

(async () => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
    // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'accept_a_payment'},
  });
})();
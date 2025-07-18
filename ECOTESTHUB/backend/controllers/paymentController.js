const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');

// Create Checkout Session
exports.createCheckoutSession = async (req, res) => {
  const { priceId } = req.body; // e.g. 'price_xxx' from Stripe dashboard
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.CLIENT_URL}/subscription?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/subscription`,
    customer_email: req.user.email,
    metadata: { userId: req.user._id }
  });
  res.json({ url: session.url });
};

// Stripe webhook for subscription updates
exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const user = await User.findById(session.metadata.userId);
    if (session.mode === 'subscription') {
      const sub = await stripe.subscriptions.retrieve(session.subscription);
      user.subscriptionStatus = sub.items.data[0].price.recurring.interval === 'month'
        ? 'active_monthly' : 'active_unlimited';
      user.subscriptionExpiry = new Date(sub.current_period_end * 1000);
      await user.save();
    }
  }

  res.json({ received: true });
};


// const Stripe = require('stripe');
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// const User = require('../models/User');

// // Create Checkout Session
// exports.createCheckoutSession = async (req, res) => {
//   const { priceId } = req.body; // e.g. 'price_xxx' from Stripe dashboard
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     mode: 'subscription',
//     line_items: [{ price: priceId, quantity: 1 }],
//     success_url: `${process.env.CLIENT_URL}/subscription?session_id={CHECKOUT_SESSION_ID}`,
//     cancel_url: `${process.env.CLIENT_URL}/subscription`,
//     customer_email: req.user.email,
//     metadata: { userId: req.user._id }
//   });
//   res.json({ url: session.url });
// };

// // Stripe webhook for subscription updates
// exports.handleWebhook = async (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
//   } catch (err) {
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object;
//     const user = await User.findById(session.metadata.userId);
//     if (session.mode === 'subscription') {
//       const sub = await stripe.subscriptions.retrieve(session.subscription);
//       user.subscriptionStatus = sub.items.data[0].price.recurring.interval === 'month'
//         ? 'active_monthly' : 'active_unlimited';
//       user.subscriptionExpiry = new Date(sub.current_period_end * 1000);
//       await user.save();
//     }
//   }

//   res.json({ received: true });
// };

// For email Payment receipts
// const { sendPlainEmail } = require('../utils/emailService');

// if (event.type === 'checkout.session.completed') {
//   // ... after saving user subscription
//   await sendPlainEmail(user.email, 'Payment Successful', 'Your subscription is now active. Thank you.');
// } else if (event.type === 'checkout.session.async_payment_failed') {
//   const session = event.data.object;
//   await sendPlainEmail(session.customer_email, 'Payment Failed', 'Your payment attempt was unsuccessful. Please try again.');
// }
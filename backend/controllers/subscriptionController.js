const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const { User } = require("../models/user.model");

module.exports = {
  getPlans: async (req, res) => {
    try {
      const products = await stripe.products.list({
        limit: 3,
      });
      res
        .status(200)
        .send({ products: products, subsStatus: req.user.subscription });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  subscribe: async (req, res) => {
    const { productId, productName } = req.body;
    try {
      const customer = await stripe.customers.create({
        email: req.user.emailId,
        name: req.user.username,
      });
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: productId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        customer: customer.id,
        success_url: `http://localhost:5173/subscription?session_id={CHECKOUT_SESSION_ID}&product=${productName}`,
        cancel_url: `http://localhost:5173/subscription/cancel`,
      });

      //   res.redirect(303, session.url);
      res.status(200).json({ url: session.url });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  updateUserSubscription: async (req, res) => {
    const { sessionId, product } = req.body;
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);
    console.log(checkoutSession);
    console.log(product);
    User.updateOne(
      { _id: req.user._id },
      {
        $set: {
          subscription: product,
          subscriptionToken: checkoutSession.subscription,
        },
      }
    )
      .then((update) => {
        res.status(200).send("success");
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },
};

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const Port = process.env.PORT || 5000;

// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/your

app.use("/api/products", require("./Routes/Product"));
app.use("/api/orders", require("./Routes/Order"));

app.post("/api/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;

  const lineItems = cartItems.map(item => ({
    price_data: {
      currency: "usd",
      product_data: { name: item.name },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5500/success.html",
    cancel_url: "http://localhost:5500/cancel.html",
  });

  res.json({ id: session.id });
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
.catch(err => console.error(err));
const factory = require("../utils/factory");
const { getUserId } = require("./auth");

const Cart = require("../models/cart");
const Sale = require("../models/sale");

exports.createCart = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userId = getUserId(token);
    req.body.user = userId;

    const { products } = req.body;

    const previousCart = await Cart.findOne({ userId });

    if (previousCart) await Cart.deleteOne({ _id: previousCart._id });

    const cart = await Cart.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        cart,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getUserCart = factory.getAll(Cart);

exports.getCart = factory.getOne(Cart);

exports.buyCart = async (req, res) => {
  try {
    const cartId = req.params.id;

    const cart = await Cart.findById(cartId);

    const sale = await Sale.create({
      products: cart.products,
      user: cart.user,
    });

    if (cart) await Cart.deleteOne({ _id: cartId });

    res.status(201).json({
      status: "success",
      data: {
        sale,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

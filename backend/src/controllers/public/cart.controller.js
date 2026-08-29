const cartService = require("../../services/public/cart.service");

async function getCart(req, res, next) {
  try {
    const cart = await cartService.getCart(req.user.id);
    return res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (err) {
    next(err);
  }
}

async function addItem(req, res, next) {
  try {
    const { variantId, quantity } = req.body;
    if (!variantId) {
      return res.status(400).json({ message: "variantId is required" });
    }
    await cartService.addToCart(req.user.id, { variantId, quantity: quantity || 1 });
    const updatedCart = await cartService.getCart(req.user.id);
    return res.status(200).json({
      success: true,
      message: "Item added to cart",
      data: updatedCart,
    });
  } catch (err) {
    next(err);
  }
}

async function updateItem(req, res, next) {
  try {
    const { variantId } = req.params;
    const { quantity } = req.body;
    if (quantity === undefined) {
      return res.status(400).json({ message: "quantity is required" });
    }
    await cartService.updateCartItem(req.user.id, variantId, parseInt(quantity, 10));
    const updatedCart = await cartService.getCart(req.user.id);
    return res.status(200).json({
      success: true,
      message: "Cart item updated",
      data: updatedCart,
    });
  } catch (err) {
    next(err);
  }
}

async function removeItem(req, res, next) {
  try {
    const { variantId } = req.params;
    await cartService.removeFromCart(req.user.id, variantId);
    const updatedCart = await cartService.getCart(req.user.id);
    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: updatedCart,
    });
  } catch (err) {
    next(err);
  }
}

async function clear(req, res, next) {
  try {
    await cartService.clearCart(req.user.id);
    return res.status(200).json({
      success: true,
      message: "Cart cleared",
      data: { items: [], subtotal: 0 },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getCart,
  addItem,
  updateItem,
  removeItem,
  clear,
};

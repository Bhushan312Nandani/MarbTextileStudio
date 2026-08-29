const wishlistService = require("../../services/public/wishlist.service");

async function getWishlist(req, res, next) {
  try {
    const items = await wishlistService.getWishlist(req.user.id);
    return res.status(200).json({
      success: true,
      data: items,
    });
  } catch (err) {
    next(err);
  }
}

async function addToWishlist(req, res, next) {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }
    await wishlistService.addToWishlist(req.user.id, productId);
    const items = await wishlistService.getWishlist(req.user.id);
    return res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      data: items,
    });
  } catch (err) {
    next(err);
  }
}

async function removeFromWishlist(req, res, next) {
  try {
    const { productId } = req.params;
    await wishlistService.removeFromWishlist(req.user.id, productId);
    const items = await wishlistService.getWishlist(req.user.id);
    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      data: items,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};

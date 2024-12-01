const express = require("express");
const router = express.Router();
const { prisma } = require("../db/config");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);
router.post("/addProduct", async (req, res) => {
  try {
    const { userId, productId, count } = req.body;
    if (!userId || !productId || !count)
      return res.status(404).json({
        error: "All fields required",
        message: "userId, productId, and count are mandatory",
      });
    const newCart = await prisma.cart.create({
      data: {
        userId: userId,
        productId: productId,
        count: count,
      },
    });
    return res.status(201).json(newCart);
  } catch (err) {
    console.error(`Error occurred in file: cartroutes, function: post -`, err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/getById/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await prisma.cart.findFirst({ where: { cartId: id } });

    if (!cart)
      return res.status(404).json({
        error: "Cart not found",
      });

    return res.status(200).json(cart);
  } catch (err) {
    console.error(`Error occurred in file: cartroutes, function: get -`, err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
router.patch("/patch/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { count } = req.body;

    const cart = await prisma.cart.findUnique({ where: { cartId: id } });

    if (!cart)
      return res.status(404).json({
        error: "Cart not found",
      });

    const updatedCart = await prisma.cart.update({
      where: { id },
      data: {
        count,
      },
    });
    return res.status(200).json(updatedCart);
  } catch (err) {
    console.error(`Error occurred in file: cartroutes, function: patch -`, err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
router.delete("/removeProduct/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await prisma.cart.findUnique({ where: { cartId: id } });

    if (!cart)
      return res.status(404).json({
        error: "Cart not found",
      });

    await prisma.cart.delete({ where: { id } });
    return res.status(200).json({
      message: "Cart deleted successfully",
    });
  } catch (err) {
    console.error(
      `Error occurred in file: cartroutes, function: delete -`,
      err
    );
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

`Create a New Cart Entry: POST /api/cart/addProduct
Retrieve Cart Entry by ID: GET /api/cart/getById/:id
Partially Update a Cart Entry: PATCH /api/cart/patch/:id
Delete a Cart Entry: DELETE /api/cart/removeProduct/:id`;

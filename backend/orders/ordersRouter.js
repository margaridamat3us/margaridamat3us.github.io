import express from "express";
import ordersService from "./ordersService.js";
import ordersSchemas from "./ordersSchemas.js";

const router = express.Router();

router.get("/orders", async (req, res) => {
  const orders = await ordersService.getOrders();
  res.json(orders);
});

router.get("/orders/:id", async (req, res) => {
  const orderId = req.params.id;
  if (orderId) {
    const order = await ordersService.getOrderById(orderId);
    if (!order) {
      return res.status(404).send({ message: "Product not found" });
    }
    return res.status(200).json(order);
  }
  return res.status(400).send({ message: "Product ID is required" });
});

router.post("/orders", async (req, res) => {
  const { error, value } = ordersSchemas.createOrderSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.message);
  }

  const updatedOrdersList = await ordersService.createOrder(value);
  res.json(updatedOrdersList);
});

router.put("/orders/:id", async (req, res) => {
  const result = await ordersService.updateOrder(req.params.id, req.body);
  if (!result || result.modifiedCount === 0) {
    return res
      .status(404)
      .json({ message: "The Product you tried to update was not found." });
  }
  res.json(result);
});

router.delete("/orders/:id", async (req, res) => {
  console.log(req.params.id);
  const result = await ordersService.deleteOrder(req.params.id);
  if (!result || result.deletedCount === 0) {
    return res.status(404).send({ message: "Product not found." });
  }
  res.status(200).json({ message: "Product deleted successfully." });
});

export default router;

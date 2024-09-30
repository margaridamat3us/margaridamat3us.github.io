import ordersData from "./ordersData.js";

const getOrders = async () => {
  const orders = await ordersData.getOrders();
  return orders;
};

const getOrderById = async (orderId) => {
  const orders = await ordersData.getOrderById(orderId);
  return orders;
};

const createOrder = async (newOrder) => {
  const updatedOrders = await ordersData.createOrder(newOrder);
  return updatedOrders;
};

const updateOrder = async (id, orderUpdates) => {
  const result = await ordersData.updateOrder(id, orderUpdates);
  return result;
};

const deleteOrder = async (id) => {
  const result = await ordersData.deleteOrder(id);
  return result;
};

export default {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};

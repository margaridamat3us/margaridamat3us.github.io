import dbService from "../db/mongo.js";
import { ObjectId } from "mongodb";

const ordersCollection = "orders";

// Obter todas as orders
const getOrders = async () => {
  const db = await dbService.getDb();
  const orders = await db.collection(ordersCollection).find().toArray();
  return orders;
};

const getOrderById = async (orderId) => {
  try {
    const db = await dbService.getDb();
    const order = await db
      .collection(ordersCollection)
      .findOne({ _id: new ObjectId(orderId) });
    return order;
  } catch (error) {
    console.error(error);
  }
};

// Adicionar uma nova order
const createOrder = async (newOrder) => {
  const db = await dbService.getDb();
  const result = await db.collection(ordersCollection).insertOne({
    ...newOrder,
    createdAt: new Date(), // Adiciona a data de criação
  });
  return result.insertedId;
};

const updateOrder = async (id, orderUpdates) => {
  try {
    const db = await dbService.getDb();
    const result = await db.collection(ordersCollection).updateOne(
      { _id: new ObjectId(id) },
      {
        $set: orderUpdates,
      }
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

const deleteOrder = async (id) => {
  try {
    const db = await dbService.getDb();
    const result = await db
      .collection(ordersCollection)
      .deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};

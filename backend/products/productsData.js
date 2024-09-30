import {ObjectId} from "mongodb";
import dbService from "../db/mongo.js";

const productsCollection = "products";

// Get all products
const getProducts = async () => {
  try {
    const db = await dbService.getDb();
    const products = await db.collection(productsCollection).find().toArray();
    return products;
  } catch (error) {
    console.error(error);
  }
};

// Get product by ID
const getProductById = async (productId) => {
  try {
    const db = await dbService.getDb();
    const product = await db
      .collection(productsCollection)
      .findOne({_id: new ObjectId(productId)});
    return product;
  } catch (error) {
    console.error(error);
  }
};

// Get products by name
const getProductsByName = async (productName) => {
  try {
    const db = await dbService.getDb();
    const products = await db
      .collection(productsCollection)
      .find({
        name: productName,
      })
      .toArray();
    return products;
  } catch (error) {
    console.error(error);
  }
};

// Create a new product
const createProduct = async (newProduct) => {
  try {
    const db = await dbService.getDb();
    const result = await db
      .collection(productsCollection)
      .insertOne(newProduct);
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Update an existing product
const updateProduct = async (id, productUpdates) => {
  try {
    const db = await dbService.getDb();
    const result = await db.collection(productsCollection).updateOne(
      {_id: new ObjectId(id)},
      {
        $set: productUpdates,
      }
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Delete a product
const deleteProduct = async (id) => {
  try {
    const db = await dbService.getDb();
    const result = await db
      .collection(productsCollection)
      .deleteOne({_id: new ObjectId(id)});
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default {
  getProducts,
  getProductsByName,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

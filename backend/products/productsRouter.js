import express from "express";
import productsService from "./productsService.js";
import productsSchemas from "./productsSchemas.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  // localhost:3000/products?name=coxinha
  const name = req.query.name;

  if (name) {
    const products = await productsService.getProductsByName(name);
    return res.status(200).json(products);
  }

  const products = await productsService.getProducts();
  res.json(products);
});

router.get("/products/:id", async (req, res) => {
  const productId = req.params.id;
  if (productId) {
    const product = await productsService.getProductsById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    return res.status(200).json(product);
  }
  return res.status(400).send({ message: "Product ID is required" });
});

router.post("/products", async (req, res) => {
  const { error, value } = productsSchemas.createProductSchema.validate(
    req.body
  );

  if (error) {
    return res.status(400).send({ message: error.message });
  }

  const createdProduct = await productsService.createProduct(value);
  res.status(201).json(createdProduct);
});

router.put("/products/:id", async (req, res) => {
  const result = await productsService.updateProduct(req.params.id, req.body);
  if (!result || result.modifiedCount === 0) {
    return res
      .status(404)
      .json({ message: "The Product you tried to update was not found." });
  }
  res.json(result);
});

router.delete("/products/:id", async (req, res) => {
  console.log(req.params.id);
  const result = await productsService.deleteProduct(req.params.id);
  if (!result || result.deletedCount === 0) {
    return res.status(404).send({ message: "Product not found." });
  }
  res.status(200).json({ message: "Product deleted successfully." });
});

export default router;

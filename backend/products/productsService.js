import productsData from "./productsData.js";

const getProducts = async () => {
  const products = await productsData.getProducts();
  return products;
};

const getProductsByName = async (productName) => {
  const products = await productsData.getProductsByName(productName);
  return products;
};

const getProductsById = async (productId) => {
  const products = await productsData.getProductById(productId);
  return products;
};

const createProduct = async (newProduct) => {
  const result = await productsData.createProduct(newProduct);
  // OPTION 1: - retornar todos os produtos
  // const allProducts = getProducts();
  // return allProducts;
  // OPTION 2: - retornar o produto certo
  const product = await productsData.getProductById(result.insertedId);
  return product;
};

const updateProduct = async (id, productUpdates) => {
  const result = await productsData.updateProduct(id, productUpdates);
  return result;
};

const deleteProduct = async (id) => {
  const result = await productsData.deleteProduct(id);
  return result;
  // OPTION 1: enviar a lista toda atualizada (getProducts())
  // const allProducts = getProducts();
  // return allProducts;
};

export default {
  getProducts,
  getProductsByName,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};

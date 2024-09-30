import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import ProductsPage from "./ProductsList";
import Cart from "./Cart";
import CartPage from "./CartPage";
import SubmittedOrder from "./SubmittedOrder";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import HomePage from "./HomePage";

const Layout = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("id");
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((item) => item._id === product._id);
      if (itemInCart) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    if (productId.length === 0) {
      setCart([]); // Limpa o carrinho completamente
    } else {
      setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    }
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleCartVisibility = () => {
    console.log("Toggling cart visibility:", !isCartVisible);
    setIsCartVisible((prevIsCartVisible) => !prevIsCartVisible);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  const handleViewCart = () => {
    setIsCartVisible(false); // Fechar o carrinho
    navigate("/cart"); // Navegar para a página do carrinho
  };

  const searchResults = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header
        toggleCartVisibility={toggleCartVisibility}
        onSearch={handleSearch}
        cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)}
        searchResults={searchResults}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/Shop"
          element={
            <ProductsPage
              addToCart={addToCart}
              products={products}
              searchTerm={searchTerm}
              sortOrder={sortOrder}
              onSortOrderChange={handleSortOrderChange}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              toggleCartVisibility={() => setIsCartVisible(false)}
            />
          }
        />
        <Route path="/order-submitted" element={<SubmittedOrder />} />
        <Route path="/contact" element={<ContactForm />} />
      </Routes>

      {isCartVisible && (
        <Cart
          cartItems={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          isCartVisible={isCartVisible}
          toggleCartVisibility={toggleCartVisibility}
          handleViewCart={handleViewCart}
        />
      )}
      <Footer />
    </>
  );
};

export default Layout;

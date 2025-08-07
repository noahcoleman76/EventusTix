// CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true; // ✅ always send cookies

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from backend on mount
  useEffect(() => {
    axios.get("http://localhost:8080/api/cart")
      .then(res => setCart(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add or update order
  const addOrUpdateOrder = (order) => {
    axios.post("http://localhost:8080/api/cart", order)
      .then(res => setCart(res.data))
      .catch(err => console.error(err));
  };

  return (
    <CartContext.Provider value={{ cart, addOrUpdateOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

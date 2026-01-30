import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  getCart,
  addToCart as apiAddToCart,
  updateCartItem as apiUpdateCart,
  removeFromCart as apiRemoveFromCart,
  clearCart as apiClearCart,
} from '../services/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!token) {
      setItems([]);
      return;
    }
    try {
      setLoading(true);
      const data = await getCart();
      setItems(data.items || data.cart?.items || data || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const addItem = async (productId, quantity = 1) => {
    const data = await apiAddToCart(productId, quantity);
    await fetchCart();
    return data;
  };

  const updateItem = async (productId, quantity) => {
    const data = await apiUpdateCart(productId, quantity);
    await fetchCart();
    return data;
  };

  const removeItem = async (productId) => {
    const data = await apiRemoveFromCart(productId);
    await fetchCart();
    return data;
  };

  const clearCartItems = async () => {
    const data = await apiClearCart();
    setItems([]);
    return data;
  };

  const cartCount = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const cartTotal = items.reduce(
    (sum, item) => sum + (item.product?.price || item.price || 0) * (item.quantity || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        cartCount,
        cartTotal,
        addItem,
        updateItem,
        removeItem,
        clearCartItems,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

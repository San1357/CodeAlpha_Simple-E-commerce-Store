import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  getWishlist,
  addToWishlist as apiAdd,
  removeFromWishlist as apiRemove,
} from '../services/api';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    if (!token) {
      setItems([]);
      return;
    }
    try {
      setLoading(true);
      const data = await getWishlist();
      setItems(data.items || data.wishlist || data || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  const addItem = async (productId) => {
    const data = await apiAdd(productId);
    await fetchWishlist();
    return data;
  };

  const removeItem = async (productId) => {
    const data = await apiRemove(productId);
    await fetchWishlist();
    return data;
  };

  const isInWishlist = (productId) => {
    return items.some(
      (item) =>
        (item.product?._id || item.product || item._id) === productId
    );
  };

  return (
    <WishlistContext.Provider
      value={{ items, loading, addItem, removeItem, isInWishlist, fetchWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

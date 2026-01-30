import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor - attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle 401
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth
export const registerUser = (data) => API.post('/auth/register', data).then((r) => r.data);
export const loginUser = (data) => API.post('/auth/login', data).then((r) => r.data);
export const getMe = () => API.get('/auth/me').then((r) => r.data);

// Products
export const getProducts = () => API.get('/products').then((r) => r.data);
export const getProductById = (id) => API.get(`/products/${id}`).then((r) => r.data);
export const createProduct = (data) => API.post('/products', data).then((r) => r.data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data).then((r) => r.data);
export const deleteProduct = (id) => API.delete(`/products/${id}`).then((r) => r.data);

// Cart
export const getCart = () => API.get('/cart').then((r) => r.data);
export const addToCart = (productId, quantity) => API.post('/cart/add', { productId, quantity }).then((r) => r.data);
export const updateCartItem = (productId, quantity) => API.put('/cart/update', { productId, quantity }).then((r) => r.data);
export const removeFromCart = (productId) => API.delete(`/cart/remove/${productId}`).then((r) => r.data);
export const clearCart = () => API.delete('/cart/clear').then((r) => r.data);

// Orders
export const createOrder = (data) => API.post('/orders', data).then((r) => r.data);
export const getMyOrders = () => API.get('/orders/my').then((r) => r.data);
export const getOrderById = (id) => API.get(`/orders/${id}`).then((r) => r.data);
export const getOrderStatus = (id) => API.get(`/orders/${id}/status`).then((r) => r.data);

// Wishlist
export const getWishlist = () => API.get('/wishlist').then((r) => r.data);
export const addToWishlist = (productId) => API.post('/wishlist/add', { productId }).then((r) => r.data);
export const removeFromWishlist = (id) => API.delete(`/wishlist/remove/${id}`).then((r) => r.data);

// Address
export const getAddresses = () => API.get('/address').then((r) => r.data);
export const addAddress = (data) => API.post('/address', data).then((r) => r.data);
export const updateAddress = (id, data) => API.put(`/address/${id}`, data).then((r) => r.data);
export const deleteAddress = (id) => API.delete(`/address/${id}`).then((r) => r.data);
export const setDefaultAddress = (id) => API.put(`/address/default/${id}`).then((r) => r.data);

// Reviews
export const getReviews = (productId) => API.get(`/reviews/${productId}`).then((r) => r.data);
export const addReview = (data) => API.post('/reviews', data).then((r) => r.data);
export const deleteReview = (reviewId) => API.delete(`/reviews/${reviewId}`).then((r) => r.data);

// Admin
export const getAdminOrders = () => API.get('/admin/orders').then((r) => r.data);
export const updateOrderStatus = (id, status) => API.put(`/admin/orders/${id}`, { status }).then((r) => r.data);
export const updateStock = (id, stock) => API.put(`/admin/stock/${id}`, { stock }).then((r) => r.data);
export const deleteUser = (id) => API.delete(`/admin/user/${id}`).then((r) => r.data);
export const getAllUsers = () => API.get('/auth/users').then((r) => r.data);

export default API;

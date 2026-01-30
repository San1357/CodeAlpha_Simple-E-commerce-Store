import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../components/Toast';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminOrders,
  updateOrderStatus,
  updateStock,
  getAllUsers,
  deleteUser,
} from '../services/api';

const AdminDashboard = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '', description: '', price: '', category: '', stock: '', image: '',
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'products') {
        const data = await getProducts();
        setProducts(data.products || data || []);
      } else if (activeTab === 'orders') {
        const data = await getAdminOrders();
        setOrders(data.orders || data || []);
      } else if (activeTab === 'users') {
        const data = await getAllUsers();
        setUsers(data.users || data || []);
      }
    } catch {
      showToast(t('Something went wrong'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...productForm,
        price: Number(productForm.price),
        stock: Number(productForm.stock),
      };
      if (editingProduct) {
        await updateProduct(editingProduct._id, payload);
        showToast('Product updated', 'success');
      } else {
        await createProduct(payload);
        showToast('Product created', 'success');
      }
      setShowProductForm(false);
      setEditingProduct(null);
      setProductForm({ name: '', description: '', price: '', category: '', stock: '', image: '' });
      fetchData();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed', 'error');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      showToast('Product deleted', 'info');
      fetchData();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed', 'error');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price?.toString() || '',
      category: product.category || '',
      stock: product.stock?.toString() || '',
      image: product.image || '',
    });
    setShowProductForm(true);
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      showToast('Order status updated', 'success');
      fetchData();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed', 'error');
    }
  };

  const handleStockUpdate = async (productId, newStock) => {
    try {
      await updateStock(productId, Number(newStock));
      showToast('Stock updated', 'success');
      fetchData();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed', 'error');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await deleteUser(id);
      showToast('User deleted', 'info');
      fetchData();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed', 'error');
    }
  };

  const getStatusClass = (status) => {
    const s = status?.toLowerCase();
    if (s === 'pending') return 'status-pending';
    if (s === 'confirmed') return 'status-confirmed';
    if (s === 'shipped') return 'status-shipped';
    if (s === 'delivered') return 'status-delivered';
    if (s === 'cancelled') return 'status-cancelled';
    return 'status-pending';
  };

  return (
    <>
      <Navbar />
      <div className="admin-page">
        <h2>{t('Admin Dashboard')}</h2>

        <div className="admin-tabs">
          <button className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
            {t('Products')}
          </button>
          <button className={`admin-tab ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
            {t('Orders')}
          </button>
          <button className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
            {t('Users')}
          </button>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            {/* Products Tab */}
            {activeTab === 'products' && (
              <div>
                <button className="apply-btn" style={{ marginBottom: '1rem' }} onClick={() => { setShowProductForm(true); setEditingProduct(null); setProductForm({ name: '', description: '', price: '', category: '', stock: '', image: '' }); }}>
                  + {t('Add Product')}
                </button>

                {showProductForm && (
                  <form className="admin-form" onSubmit={handleProductSubmit}>
                    <h3>{editingProduct ? t('Edit') + ' ' + t('Products') : t('Add Product')}</h3>
                    <div className="admin-form-grid">
                      <div><input placeholder={t('Product Name')} value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} required /></div>
                      <div><input placeholder={t('Category')} value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} required /></div>
                      <div><input type="number" placeholder={t('Price')} value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} required /></div>
                      <div><input type="number" placeholder={t('Stock')} value={productForm.stock} onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })} required /></div>
                      <div className="full-width"><input placeholder={t('Image') + ' URL'} value={productForm.image} onChange={(e) => setProductForm({ ...productForm, image: e.target.value })} /></div>
                      <div className="full-width"><textarea placeholder={t('Description')} value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} /></div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                      <button type="submit" className="apply-btn">{t('Save')}</button>
                      <button type="button" className="reset-btn" onClick={() => { setShowProductForm(false); setEditingProduct(null); }}>{t('Cancel')}</button>
                    </div>
                  </form>
                )}

                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>{t('Product Name')}</th>
                      <th>{t('Category')}</th>
                      <th>{t('Price')}</th>
                      <th>{t('Stock')}</th>
                      <th>{t('Actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p._id}>
                        <td>{p.name}</td>
                        <td>{p.category}</td>
                        <td>₹{p.price}</td>
                        <td>
                          <input
                            type="number"
                            defaultValue={p.stock}
                            style={{ width: 60, padding: '0.2rem' }}
                            onBlur={(e) => {
                              if (Number(e.target.value) !== p.stock) {
                                handleStockUpdate(p._id, e.target.value);
                              }
                            }}
                            min="0"
                          />
                        </td>
                        <td>
                          <div className="admin-actions">
                            <button className="apply-btn" onClick={() => handleEditProduct(p)}>{t('Edit')}</button>
                            <button style={{ background: 'var(--danger)', color: '#fff', borderRadius: 'var(--radius-sm)' }} onClick={() => handleDeleteProduct(p._id)}>{t('Delete')}</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>{t('Order ID')}</th>
                    <th>User</th>
                    <th>{t('Total')}</th>
                    <th>{t('Status')}</th>
                    <th>{t('Date')}</th>
                    <th>{t('Actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id?.slice(-8)}</td>
                      <td>{order.user?.name || order.user?.email || 'N/A'}</td>
                      <td>₹{order.totalAmount?.toFixed(2)}</td>
                      <td>
                        <span className={`order-status ${getStatusClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="admin-actions">
                          <select
                            defaultValue={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          >
                            <option value="pending">{t('Pending')}</option>
                            <option value="confirmed">{t('Confirmed')}</option>
                            <option value="shipped">{t('Shipped')}</option>
                            <option value="delivered">{t('Delivered')}</option>
                            <option value="cancelled">{t('Cancelled')}</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>{t('Full Name')}</th>
                    <th>{t('Email')}</th>
                    <th>Role</th>
                    <th>{t('Actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.role}</td>
                      <td>
                        <div className="admin-actions">
                          {u.role !== 'admin' && (
                            <button style={{ background: 'var(--danger)', color: '#fff', borderRadius: 'var(--radius-sm)' }} onClick={() => handleDeleteUser(u._id)}>
                              {t('Delete')}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;

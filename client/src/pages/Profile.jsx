import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../components/Toast';
import {
  getMyOrders,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from '../services/api';

const Profile = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    street: '', city: '', state: '', zipCode: '', country: 'India', phone: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [ordersData, addressData] = await Promise.all([getMyOrders(), getAddresses()]);
        setOrders(ordersData.orders || ordersData || []);
        setAddresses(addressData.addresses || addressData || []);
      } catch {
        showToast(t('Something went wrong'), 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAddress) {
        await updateAddress(editingAddress._id, addressForm);
        showToast('Address updated', 'success');
      } else {
        await addAddress(addressForm);
        showToast('Address added', 'success');
      }
      const data = await getAddresses();
      setAddresses(data.addresses || data || []);
      setShowAddressForm(false);
      setEditingAddress(null);
      setAddressForm({ street: '', city: '', state: '', zipCode: '', country: 'India', phone: '' });
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed', 'error');
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((a) => a._id !== id));
      showToast('Address deleted', 'info');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed', 'error');
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await setDefaultAddress(id);
      const data = await getAddresses();
      setAddresses(data.addresses || data || []);
      showToast('Default address updated', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed', 'error');
    }
  };

  const handleEditAddress = (addr) => {
    setEditingAddress(addr);
    setAddressForm({
      street: addr.street || '',
      city: addr.city || '',
      state: addr.state || '',
      zipCode: addr.zipCode || '',
      country: addr.country || 'India',
      phone: addr.phone || '',
    });
    setShowAddressForm(true);
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

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '?';

  if (loading) return <><Navbar /><Loader /><Footer /></>;

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-header">
          <div className="profile-avatar">{userInitial}</div>
          <div className="profile-info">
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="profile-tabs">
          <button className={`profile-tab ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
            {t('My Orders')}
          </button>
          <button className={`profile-tab ${activeTab === 'addresses' ? 'active' : ''}`} onClick={() => setActiveTab('addresses')}>
            {t('Address Book')}
          </button>
        </div>

        {activeTab === 'orders' && (
          <div>
            {orders.length === 0 ? (
              <div className="empty-state"><h3>{t('No orders yet')}</h3></div>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="order-card">
                  <div className="order-card-header">
                    <span className="order-id">{t('Order ID')}: {order._id?.slice(-8)}</span>
                    <span className={`order-status ${getStatusClass(order.status)}`}>
                      {t(order.status?.charAt(0).toUpperCase() + order.status?.slice(1))}
                    </span>
                  </div>
                  <div className="order-items-list">
                    {order.items?.map((item, idx) => {
                      const p = item.product || item;
                      return (
                        <div key={idx} className="order-item-row">
                          <span>{p.name || 'Product'} x{item.quantity}</span>
                          <span>₹{((p.price || 0) * item.quantity).toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                  <p className="order-total">₹{order.totalAmount?.toFixed(2)}</p>
                  <p className="order-date">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div>
            <button className="apply-btn" style={{ marginBottom: '1rem' }} onClick={() => { setShowAddressForm(true); setEditingAddress(null); setAddressForm({ street: '', city: '', state: '', zipCode: '', country: 'India', phone: '' }); }}>
              + {t('Add New Address')}
            </button>

            {showAddressForm && (
              <form className="admin-form" onSubmit={handleAddressSubmit} style={{ marginBottom: '1.5rem' }}>
                <h3>{editingAddress ? t('Edit') : t('Add New Address')}</h3>
                <div className="admin-form-grid">
                  <div className="full-width">
                    <input placeholder={t('Street')} value={addressForm.street} onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })} required />
                  </div>
                  <div><input placeholder={t('City')} value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} required /></div>
                  <div><input placeholder={t('State')} value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} required /></div>
                  <div><input placeholder={t('Zip Code')} value={addressForm.zipCode} onChange={(e) => setAddressForm({ ...addressForm, zipCode: e.target.value })} required /></div>
                  <div><input placeholder={t('Phone')} value={addressForm.phone} onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })} required /></div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <button type="submit" className="apply-btn">{t('Save')}</button>
                  <button type="button" className="reset-btn" onClick={() => { setShowAddressForm(false); setEditingAddress(null); }}>{t('Cancel')}</button>
                </div>
              </form>
            )}

            <div className="address-book">
              {addresses.map((addr) => (
                <div key={addr._id} className={`address-card ${addr.isDefault ? 'default' : ''}`}>
                  {addr.isDefault && <span className="address-default-badge">Default</span>}
                  <p><strong>{addr.street}</strong></p>
                  <p>{addr.city}, {addr.state} {addr.zipCode}</p>
                  <p>{addr.country}</p>
                  <p>{addr.phone}</p>
                  <div className="address-card-actions">
                    {!addr.isDefault && (
                      <button className="apply-btn" onClick={() => handleSetDefault(addr._id)}>
                        {t('Set as Default')}
                      </button>
                    )}
                    <button className="reset-btn" onClick={() => handleEditAddress(addr)}>
                      {t('Edit')}
                    </button>
                    <button style={{ background: 'var(--danger)', color: '#fff', borderRadius: 'var(--radius-sm)' }} onClick={() => handleDeleteAddress(addr._id)}>
                      {t('Delete')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Profile;

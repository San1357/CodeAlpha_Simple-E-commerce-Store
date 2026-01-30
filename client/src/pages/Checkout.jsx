import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../components/Toast';
import { getAddresses, createOrder } from '../services/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, cartTotal, clearCartItems } = useCart();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState('home');
  const [loading, setLoading] = useState(false);
  const [addressForm, setAddressForm] = useState({
    street: '', city: '', state: '', zipCode: '', country: 'India', phone: '',
  });
  const [useNewAddress, setUseNewAddress] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await getAddresses();
        const addrs = data.addresses || data || [];
        setAddresses(addrs);
        const defaultAddr = addrs.find((a) => a.isDefault) || addrs[0];
        if (defaultAddr) setSelectedAddress(defaultAddr);
      } catch {}
    };
    fetchAddresses();
  }, []);

  const handlePlaceOrder = async () => {
    let shippingAddress;
    if (useNewAddress) {
      if (!addressForm.street || !addressForm.city || !addressForm.state || !addressForm.zipCode || !addressForm.phone) {
        showToast('Please fill all address fields', 'error');
        return;
      }
      shippingAddress = addressForm;
    } else if (selectedAddress) {
      shippingAddress = selectedAddress;
    } else {
      showToast('Please select or add an address', 'error');
      return;
    }

    if (items.length === 0) {
      showToast('Cart is empty', 'error');
      return;
    }

    try {
      setLoading(true);
      const orderData = {
        items: items.map((item) => ({
          product: item.product?._id || item._id,
          quantity: item.quantity,
        })),
        shippingAddress,
        deliveryMethod,
        totalAmount: cartTotal,
      };
      const data = await createOrder(orderData);
      await clearCartItems();
      showToast(t('Order Placed Successfully!'), 'success');
      navigate('/order-success', {
        state: { order: data.order || data, otp: data.otp },
      });
    } catch (err) {
      showToast(err.response?.data?.message || 'Order failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !loading) {
    return (
      <>
        <Navbar />
        <div className="empty-state" style={{ minHeight: '60vh' }}>
          <h3>{t('Your cart is empty')}</h3>
          <button onClick={() => navigate('/')}>{t('Continue Shopping')}</button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <h2>{t('Checkout')}</h2>
        <div className="checkout-layout">
          <div className="checkout-form">
            {/* Address Section */}
            <div className="checkout-section">
              <h3>{t('Shipping Address')}</h3>

              {addresses.length > 0 && !useNewAddress && (
                <div className="saved-addresses">
                  <h4>{t('Saved Addresses')}</h4>
                  {addresses.map((addr) => (
                    <div
                      key={addr._id}
                      className={`saved-address-card ${selectedAddress?._id === addr._id ? 'selected' : ''}`}
                      onClick={() => setSelectedAddress(addr)}
                    >
                      <p><strong>{addr.street}</strong></p>
                      <p>{addr.city}, {addr.state} {addr.zipCode}</p>
                      <p>{addr.phone}</p>
                    </div>
                  ))}
                  <button className="reset-btn" style={{ marginTop: '0.5rem' }} onClick={() => setUseNewAddress(true)}>
                    + {t('New Address')}
                  </button>
                </div>
              )}

              {(useNewAddress || addresses.length === 0) && (
                <div className="address-grid">
                  <div className="full-width">
                    <input placeholder={t('Street')} value={addressForm.street} onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })} />
                  </div>
                  <div>
                    <input placeholder={t('City')} value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} />
                  </div>
                  <div>
                    <input placeholder={t('State')} value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} />
                  </div>
                  <div>
                    <input placeholder={t('Zip Code')} value={addressForm.zipCode} onChange={(e) => setAddressForm({ ...addressForm, zipCode: e.target.value })} />
                  </div>
                  <div>
                    <input placeholder={t('Phone')} value={addressForm.phone} onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })} />
                  </div>
                  {addresses.length > 0 && (
                    <div className="full-width">
                      <button className="reset-btn" onClick={() => setUseNewAddress(false)}>
                        {t('Saved Addresses')}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Delivery Method */}
            <div className="checkout-section">
              <h3>{t('Delivery Method')}</h3>
              <div className="delivery-options">
                <div className={`delivery-option ${deliveryMethod === 'home' ? 'selected' : ''}`} onClick={() => setDeliveryMethod('home')}>
                  <h4>{t('Home Delivery')}</h4>
                  <p>{t('Delivered to your doorstep')}</p>
                </div>
                <div className={`delivery-option ${deliveryMethod === 'pickup' ? 'selected' : ''}`} onClick={() => setDeliveryMethod('pickup')}>
                  <h4>{t('Store Pickup')}</h4>
                  <p>{t('Pick up from nearest store')}</p>
                </div>
              </div>
            </div>

            <button className="place-order-btn" onClick={handlePlaceOrder} disabled={loading}>
              {loading ? t('Loading') : t('Place Order')}
            </button>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3>{t('Order Summary')}</h3>
            {items.map((item) => {
              const p = item.product || item;
              return (
                <div key={p._id} className="summary-row">
                  <span>{p.name} x{item.quantity}</span>
                  <span>₹{(p.price * item.quantity).toFixed(2)}</span>
                </div>
              );
            })}
            <div className="summary-row">
              <span>{t('Shipping')}</span>
              <span>{t('FREE')}</span>
            </div>
            <div className="summary-row total">
              <span>{t('Total')}</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;

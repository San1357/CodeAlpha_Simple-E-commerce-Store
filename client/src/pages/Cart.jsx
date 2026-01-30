import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';
import Loader from '../components/Loader';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const Cart = () => {
  const navigate = useNavigate();
  const { items, loading, cartTotal } = useCart();
  const { t } = useLanguage();

  if (loading) return <><Navbar /><Loader /><Footer /></>;

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <h2>{t('Your Cart')}</h2>

        {items.length === 0 ? (
          <div className="empty-state">
            <h3>{t('Your cart is empty')}</h3>
            <p>{t('Try adjusting your search or filters')}</p>
            <Link to="/">
              <button>{t('Continue Shopping')}</button>
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map((item) => (
                <CartItem key={item.product?._id || item._id} item={item} />
              ))}
            </div>

            <div className="order-summary">
              <h3>{t('Order Summary')}</h3>
              <div className="summary-row">
                <span>{t('Subtotal')}</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>{t('Shipping')}</span>
                <span>{t('FREE')}</span>
              </div>
              <div className="summary-row total">
                <span>{t('Total')}</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={() => navigate('/checkout')}>
                {t('Proceed to Checkout')}
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;

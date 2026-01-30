import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

const OrderSuccess = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const { order, otp } = location.state || {};

  return (
    <>
      <Navbar />
      <div className="order-success-page">
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h2>{t('Order Placed Successfully!')}</h2>
          {order && (
            <p>{t('Order ID')}: {order._id?.slice(-8) || 'N/A'}</p>
          )}
          {otp && (
            <>
              <p>{t('Your OTP for delivery')}:</p>
              <div className="otp-display">{otp}</div>
            </>
          )}
          <div className="success-actions">
            <Link to="/" className="apply-btn" style={{ background: 'var(--primary)', color: '#fff' }}>
              {t('Go to Home')}
            </Link>
            <Link to="/profile" className="reset-btn">
              {t('View Orders')}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccess;

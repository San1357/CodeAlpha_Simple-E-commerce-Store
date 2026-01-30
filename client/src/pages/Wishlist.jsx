import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../components/Toast';

const Wishlist = () => {
  const navigate = useNavigate();
  const { items, loading, removeItem } = useWishlist();
  const { addItem: addToCart } = useCart();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const handleMoveToCart = async (product) => {
    try {
      await addToCart(product._id, 1);
      await removeItem(product._id);
      showToast(`${product.name} moved to cart`, 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed', 'error');
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeItem(productId);
      showToast('Removed from wishlist', 'info');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed', 'error');
    }
  };

  if (loading) return <><Navbar /><Loader /><Footer /></>;

  return (
    <>
      <Navbar />
      <div className="wishlist-page">
        <h2>{t('My Wishlist')}</h2>

        {items.length === 0 ? (
          <div className="empty-state">
            <h3>{t('Your wishlist is empty')}</h3>
            <button onClick={() => navigate('/')}>{t('Continue Shopping')}</button>
          </div>
        ) : (
          <div className="wishlist-grid">
            {items.map((item) => {
              const product = item.product || item;
              const stock = product.stock ?? 0;
              return (
                <div key={product._id} className="product-card">
                  <img
                    src={product.image || 'https://via.placeholder.com/300x200'}
                    alt={product.name}
                    className="product-card-image"
                    onClick={() => navigate(`/product/${product._id}`)}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
                  />
                  <div className="product-card-body">
                    <h3 className="product-card-name">{product.name}</h3>
                    <p className="product-card-category">{product.category}</p>
                    <p className="product-card-price">₹{product.price}</p>
                    <div className="product-card-actions">
                      <button
                        className="btn-add-cart"
                        onClick={() => handleMoveToCart(product)}
                        disabled={stock <= 0}
                      >
                        {t('Move to Cart')}
                      </button>
                      <button
                        className="btn-wishlist active"
                        onClick={() => handleRemove(product._id)}
                      >
                        ♥
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;

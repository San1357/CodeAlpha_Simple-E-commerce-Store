import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from './Toast';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { addItem } = useCart();
  const { isInWishlist, addItem: addWish, removeItem: removeWish } = useWishlist();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const stock = product.stock ?? 0;
  const inWishlist = isInWishlist(product._id);

  const getStockStatus = () => {
    if (stock <= 0) return { label: t('Out of Stock'), className: 'stock-out' };
    if (stock <= 5) return { label: t('Low Stock'), className: 'stock-low' };
    return { label: t('In Stock'), className: 'stock-in' };
  };

  const stockStatus = getStockStatus();

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!token) {
      showToast(t('Please login first'), 'error');
      navigate('/login');
      return;
    }
    try {
      await addItem(product._id, 1);
      showToast(`${product.name} ${t('Add to Cart')}`, 'success');
    } catch (err) {
      showToast(err.response?.data?.message || t('Something went wrong'), 'error');
    }
  };

  const handleWishlist = async (e) => {
    e.stopPropagation();
    if (!token) {
      showToast(t('Please login first'), 'error');
      navigate('/login');
      return;
    }
    try {
      if (inWishlist) {
        await removeWish(product._id);
        showToast('Removed from wishlist', 'info');
      } else {
        await addWish(product._id);
        showToast('Added to wishlist', 'success');
      }
    } catch (err) {
      showToast(err.response?.data?.message || t('Something went wrong'), 'error');
    }
  };

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product._id}`)}>
      <img
        src={product.image || '/placeholder.png'}
        alt={product.name}
        className="product-card-image"
        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
      />
      <div className="product-card-body">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-category">{product.category}</p>
        <p className="product-card-price">₹{product.price}</p>
        <span className={`product-card-stock ${stockStatus.className}`}>
          {stockStatus.label}
        </span>
        <div className="product-card-actions">
          <button
            className="btn-add-cart"
            onClick={handleAddToCart}
            disabled={stock <= 0}
          >
            {stock <= 0 ? t('Out of Stock') : t('Add to Cart')}
          </button>
          <button
            className={`btn-wishlist ${inWishlist ? 'active' : ''}`}
            onClick={handleWishlist}
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

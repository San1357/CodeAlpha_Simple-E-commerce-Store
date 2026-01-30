import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import ReviewBox from '../components/ReviewBox';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../components/Toast';
import { getProductById } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { addItem } = useCart();
  const { isInWishlist, addItem: addWish, removeItem: removeWish } = useWishlist();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data.product || data);
      } catch {
        showToast('Product not found', 'error');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <><Navbar /><Loader /><Footer /></>;
  if (!product) return <><Navbar /><div className="empty-state"><h3>Product not found</h3></div><Footer /></>;

  const stock = product.stock ?? 0;
  const inWishlist = isInWishlist(product._id);

  const getStockInfo = () => {
    if (stock <= 0) return { label: t('Out of Stock'), className: 'stock-out' };
    if (stock <= 5) return { label: `${t('Low Stock')} (${stock} left)`, className: 'stock-low' };
    return { label: `${t('In Stock')} (${stock})`, className: 'stock-in' };
  };
  const stockInfo = getStockInfo();

  const handleAddToCart = async () => {
    if (!token) { showToast('Please login first', 'error'); navigate('/login'); return; }
    try {
      await addItem(product._id, quantity);
      showToast(`${product.name} added to cart`, 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to add to cart', 'error');
    }
  };

  const handleBuyNow = async () => {
    if (!token) { showToast('Please login first', 'error'); navigate('/login'); return; }
    try {
      await addItem(product._id, quantity);
      navigate('/checkout');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed', 'error');
    }
  };

  const handleWishlist = async () => {
    if (!token) { showToast('Please login first', 'error'); navigate('/login'); return; }
    try {
      if (inWishlist) {
        await removeWish(product._id);
        showToast('Removed from wishlist', 'info');
      } else {
        await addWish(product._id);
        showToast('Added to wishlist', 'success');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed', 'error');
    }
  };

  return (
    <>
      <Navbar />
      <div className="product-detail-page">
        <div className="product-detail-layout">
          <img
            src={product.image || 'https://via.placeholder.com/450'}
            alt={product.name}
            className="product-detail-image"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/450?text=No+Image'; }}
          />
          <div className="product-detail-info">
            <h1>{product.name}</h1>
            <p className="detail-category">{product.category}</p>
            <p className="detail-price">₹{product.price}</p>
            <p className="detail-description">{product.description}</p>

            <span className={`detail-stock-badge ${stockInfo.className}`}>
              {stockInfo.label}
            </span>

            <div className="detail-actions">
              <div className="quantity-control">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => Math.min(stock, q + 1))} disabled={quantity >= stock}>+</button>
              </div>

              <button className="btn-detail-cart" onClick={handleAddToCart} disabled={stock <= 0}>
                {t('Add to Cart')}
              </button>

              <button className="btn-buy-now" onClick={handleBuyNow} disabled={stock <= 0}>
                {t('Buy Now')}
              </button>

              <button className={`btn-detail-wishlist ${inWishlist ? 'active' : ''}`} onClick={handleWishlist}>
                ♥
              </button>
            </div>
          </div>
        </div>

        <ReviewBox productId={id} />
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;

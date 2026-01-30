import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from './Toast';

const CartItem = ({ item }) => {
  const { updateItem, removeItem } = useCart();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const product = item.product || item;
  const quantity = item.quantity || 1;
  const stock = product.stock ?? 99;

  const handleQuantityChange = async (delta) => {
    const newQty = quantity + delta;
    if (newQty < 1) return;
    if (newQty > stock) {
      showToast(`Only ${stock} items in stock`, 'error');
      return;
    }
    try {
      await updateItem(product._id, newQty);
    } catch (err) {
      showToast(err.response?.data?.message || t('Something went wrong'), 'error');
    }
  };

  const handleRemove = async () => {
    try {
      await removeItem(product._id);
      showToast(`${product.name} removed from cart`, 'info');
    } catch (err) {
      showToast(err.response?.data?.message || t('Something went wrong'), 'error');
    }
  };

  return (
    <div className="cart-item">
      <img
        src={product.image || 'https://via.placeholder.com/100'}
        alt={product.name}
        className="cart-item-image"
        onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=No+Image'; }}
      />
      <div className="cart-item-details">
        <p className="cart-item-name">{product.name}</p>
        <p className="cart-item-price">₹{product.price}</p>
        <p className="cart-item-stock">{t('Stock')}: {stock}</p>
      </div>
      <div className="quantity-control">
        <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</button>
        <span>{quantity}</span>
        <button onClick={() => handleQuantityChange(1)} disabled={quantity >= stock}>+</button>
      </div>
      <p className="cart-item-price" style={{ fontWeight: 700, minWidth: 70, textAlign: 'right' }}>
        ₹{(product.price * quantity).toFixed(2)}
      </p>
      <button className="cart-item-remove" onClick={handleRemove}>
        {t('Remove')}
      </button>
    </div>
  );
};

export default CartItem;

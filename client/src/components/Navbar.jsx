import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { user, token, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'bho', label: 'भोजपुरी' },
  ];

  const wishlistCount = wishlistItems ? wishlistItems.length : 0;
  const isLoggedIn = !!(user && token);
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '?';
  const userFirstName = user?.name ? user.name.split(' ')[0] : '';

  return (
    <header className="header">
      <Link to="/" className="logo">ShopEase</Link>

      <nav className="auth-nav">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <div className="lang-selector-wrapper">
          <button className="lang-selector" onClick={() => setLangOpen(!langOpen)}>
            {languages.find((l) => l.code === language)?.label || 'English'}
          </button>
          {langOpen && (
            <ul className="lang-dropdown">
              {languages.map((lang) => (
                <li key={lang.code}>
                  <button onClick={() => { changeLanguage(lang.code); setLangOpen(false); }}>
                    {lang.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link to="/wishlist" className="icon-wrapper" aria-label="Wishlist">
          ❤️
          {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
        </Link>

        <Link to="/cart" className="icon-wrapper" aria-label="Cart">
          🛒
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>

        {!isLoggedIn ? (
          <>
            <Link to="/login" className="auth-btn btn-login">{t('login')}</Link>
            <Link to="/register" className="auth-btn btn-signup">{t('signup')}</Link>
          </>
        ) : (
          <>
            {isAdmin && (
              <Link to="/admin" className="auth-btn btn-login">{t('admin')}</Link>
            )}
            <Link to="/profile" className="auth-btn btn-profile">
              <span className="avatar-initial">{userInitial}</span>
              {userFirstName}
            </Link>
            <button className="auth-btn btn-logout" onClick={logout}>
              {t('logout')}
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

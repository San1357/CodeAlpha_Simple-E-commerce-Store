import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../components/Toast';
import { getProducts } from '../services/api';

const CATEGORIES = [
  { name: 'All', icon: '' },
  { name: 'Pen', icon: '🖊️' },
  { name: 'Pencil', icon: '✏️' },
  { name: 'Notebook', icon: '📓' },
  { name: 'Sharpener', icon: '🔪' },
  { name: 'Eraser', icon: '🧽' },
];

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [priceSlider, setPriceSlider] = useState(1000);
  const [sortBy, setSortBy] = useState('default');
  const [appliedFilters, setAppliedFilters] = useState({
    category: 'All',
    priceRange: { min: '', max: '' },
    sortBy: 'default',
  });

  const searchRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data.products || data || []);
      } catch {
        showToast(t('Failed to load products'), 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name?.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.category?.toLowerCase().includes(query)
      )
      .slice(0, 6);
  }, [searchQuery, products]);

  const categoryCounts = useMemo(() => {
    const counts = { All: products.length };
    CATEGORIES.forEach((cat) => {
      if (cat.name !== 'All') {
        counts[cat.name] = products.filter(
          (p) => p.category?.toLowerCase() === cat.name.toLowerCase()
        ).length;
      }
    });
    return counts;
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.category?.toLowerCase().includes(query)
      );
    }

    if (appliedFilters.category !== 'All') {
      result = result.filter(
        (p) => p.category?.toLowerCase() === appliedFilters.category.toLowerCase()
      );
    }

    const minPrice = parseFloat(appliedFilters.priceRange.min);
    const maxPrice = parseFloat(appliedFilters.priceRange.max);
    if (!isNaN(minPrice)) result = result.filter((p) => p.price >= minPrice);
    if (!isNaN(maxPrice)) result = result.filter((p) => p.price <= maxPrice);

    if (appliedFilters.sortBy === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (appliedFilters.sortBy === 'price-high-low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchQuery, appliedFilters]);

  const handleApplyFilters = () => {
    setAppliedFilters({ category: selectedCategory, priceRange: { ...priceRange }, sortBy });
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setPriceRange({ min: '', max: '' });
    setPriceSlider(1000);
    setSortBy('default');
    setSearchQuery('');
    setAppliedFilters({ category: 'All', priceRange: { min: '', max: '' }, sortBy: 'default' });
  };

  const removeFilterTag = (filterType) => {
    const updated = { ...appliedFilters };
    if (filterType === 'category') { updated.category = 'All'; setSelectedCategory('All'); }
    else if (filterType === 'price') { updated.priceRange = { min: '', max: '' }; setPriceRange({ min: '', max: '' }); setPriceSlider(1000); }
    else if (filterType === 'sort') { updated.sortBy = 'default'; setSortBy('default'); }
    setAppliedFilters(updated);
  };

  const handleCategoryNavClick = (name) => {
    setSelectedCategory(name);
    setAppliedFilters((prev) => ({ ...prev, category: name }));
  };

  const activeFilterTags = [];
  if (appliedFilters.category !== 'All') activeFilterTags.push({ type: 'category', label: appliedFilters.category });
  if (appliedFilters.priceRange.min || appliedFilters.priceRange.max) {
    activeFilterTags.push({ type: 'price', label: `${t('Price')}: ${appliedFilters.priceRange.min || '0'} - ${appliedFilters.priceRange.max || '∞'}` });
  }
  if (appliedFilters.sortBy !== 'default') {
    const labels = { 'price-low-high': t('Price: Low to High'), 'price-high-low': t('Price: High to Low') };
    activeFilterTags.push({ type: 'sort', label: labels[appliedFilters.sortBy] });
  }

  if (loading) return <><Navbar /><Loader /><Footer /></>;

  return (
    <>
      <Navbar />

      <section className="search-section">
        <div className="search-container" ref={searchRef}>
          <div className="search-input-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder={t('Search products by name, description, or category...')}
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={() => { if (searchQuery.trim()) setShowSuggestions(true); }}
              onKeyDown={(e) => { if (e.key === 'Enter') setShowSuggestions(false); }}
            />
            <button className="search-btn" onClick={() => setShowSuggestions(false)}>
              {t('Search')}
            </button>
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <ul className="search-suggestions">
              {suggestions.map((product) => (
                <li key={product._id} onClick={() => { setShowSuggestions(false); navigate(`/product/${product._id}`); }}>
                  <span>{product.name}</span>
                  <span className="suggestion-category">{product.category}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <div className="main-wrapper">
        <aside className="filter-sidebar">
          <div className="filter-header"><h3>{t('Filters')}</h3></div>

          <div className="filter-section">
            <h4>{t('Category')}</h4>
            <ul className="category-list">
              {CATEGORIES.map((cat) => (
                <li key={cat.name} className={`category-item ${selectedCategory === cat.name ? 'active' : ''}`} onClick={() => setSelectedCategory(cat.name)}>
                  <span>{cat.icon} {t(cat.name)}</span>
                  <span className="category-count">({categoryCounts[cat.name] || 0})</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-section">
            <h4>{t('Price Range')}</h4>
            <div className="price-inputs">
              <input type="number" placeholder={t('Min')} value={priceRange.min} onChange={(e) => setPriceRange((p) => ({ ...p, min: e.target.value }))} min="0" />
              <span>-</span>
              <input type="number" placeholder={t('Max')} value={priceRange.max} onChange={(e) => setPriceRange((p) => ({ ...p, max: e.target.value }))} min="0" />
            </div>
            <input type="range" min="0" max="5000" value={priceSlider} onChange={(e) => { setPriceSlider(e.target.value); setPriceRange((p) => ({ ...p, max: e.target.value })); }} className="price-slider" />
          </div>

          <div className="filter-section">
            <h4>{t('Sort By')}</h4>
            <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">{t('Default')}</option>
              <option value="price-low-high">{t('Price: Low to High')}</option>
              <option value="price-high-low">{t('Price: High to Low')}</option>
            </select>
          </div>

          <div className="filter-actions">
            <button className="apply-btn" onClick={handleApplyFilters}>{t('Apply Filters')}</button>
            <button className="reset-btn" onClick={handleResetFilters}>{t('Reset Filters')}</button>
          </div>
        </aside>

        <main className="products-content">
          <div className="category-navbar">
            {CATEGORIES.map((cat) => (
              <button key={cat.name} className={`category-nav-btn ${appliedFilters.category === cat.name ? 'active' : ''}`} onClick={() => handleCategoryNavClick(cat.name)}>
                {cat.icon} {t(cat.name)}
              </button>
            ))}
          </div>

          <div className="results-header">
            <p>{t('Showing')} {filteredProducts.length} {filteredProducts.length === 1 ? t('product') : t('products')}</p>
            {activeFilterTags.length > 0 && (
              <div className="active-filters">
                {activeFilterTags.map((tag) => (
                  <span key={tag.type} className="filter-tag">
                    {tag.label}
                    <button onClick={() => removeFilterTag(tag.type)}>&times;</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>{t('No products found')}</h3>
              <p>{t('Try adjusting your search or filters')}</p>
              <button onClick={handleResetFilters}>{t('Reset Filters')}</button>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Home;

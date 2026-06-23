import React, { useContext, useState } from 'react';
import { AppContext, renderProductImage } from '../context/AppContext';
import { Search, SlidersHorizontal, Star, ShoppingCart, Info, Globe } from 'lucide-react';

const Catalog = () => {
  const { products, setRoute, addToCart, convertPrice } = useContext(AppContext);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedOrigin, setSelectedOrigin] = useState('All');
  const [maxPrice, setMaxPrice] = useState(100);

  const categories = ['All', 'Turbans', 'Accessories', 'Literature', 'Apparel'];
  const origins = ['All', 'India', 'Canada', 'United Kingdom'];

  // Filter Logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesOrigin = selectedOrigin === 'All' || p.origin === selectedOrigin;
    const matchesPrice = p.price <= maxPrice;
    
    return matchesSearch && matchesCategory && matchesOrigin && matchesPrice;
  });

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedOrigin('All');
    setMaxPrice(100);
  };

  return (
    <div className="container page-fade-in" style={{ paddingTop: '2.5rem' }}>
      
      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 className="section-title">Explore Sikh Street Store</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginTop: '-1rem' }}>
          Discover items categorized by type and origin. Hover over products to inspect vendor tags.
        </p>
      </div>

      <div className="catalog-grid">
        
        {/* Sidebar Filter Panel */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignSelf: 'flex-start' }}>
          
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div className="flex-between" style={{ borderBottom: '1px solid var(--color-beige-dark)', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <SlidersHorizontal size={16} style={{ color: 'var(--color-gold-hover)' }} />
                Filter Options
              </h3>
              <button 
                onClick={handleResetFilters}
                style={{ background: 'none', border: 'none', color: 'var(--color-blue-accent)', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Reset All
              </button>
            </div>

            {/* Keyword Search */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Search Keyword</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="e.g. Kada, Voile, Book..."
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
              </div>
            </div>

            {/* Category Select tabs */}
            <div>
              <label className="form-label" style={{ marginBottom: '0.5rem' }}>Categories</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="btn btn-sm"
                    style={{
                      justifyContent: 'flex-start',
                      backgroundColor: selectedCategory === cat ? 'var(--color-navy)' : 'var(--color-bg)',
                      color: selectedCategory === cat ? '#FFFFFF' : 'var(--color-navy)',
                      width: '100%',
                      fontWeight: selectedCategory === cat ? '700' : '500'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Country of Origin */}
            <div>
              <label className="form-label" style={{ marginBottom: '0.5rem' }}>Origin / Shipping</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {origins.map((origin) => (
                  <button
                    key={origin}
                    onClick={() => setSelectedOrigin(origin)}
                    className="btn btn-sm"
                    style={{
                      justifyContent: 'flex-start',
                      backgroundColor: selectedOrigin === origin ? 'var(--color-gold)' : 'var(--color-bg)',
                      color: selectedOrigin === origin ? 'var(--color-navy-dark)' : 'var(--color-navy)',
                      width: '100%',
                      fontWeight: selectedOrigin === origin ? '700' : '500'
                    }}
                  >
                    <Globe size={13} style={{ marginRight: '0.4rem', opacity: 0.7 }} />
                    {origin}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Cap range slider */}
            <div>
              <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Max Price</label>
                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--color-gold-hover)' }}>
                  {convertPrice(maxPrice)}
                </span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="100" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: 'var(--color-gold)' }}
              />
              <div className="flex-between" style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
                <span>{convertPrice(5)}</span>
                <span>{convertPrice(100)}</span>
              </div>
            </div>

          </div>

          {/* AI Helper Banner */}
          <div className="card card-gold" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Info size={14} style={{ color: 'var(--color-gold-hover)' }} />
              Need Turban Sizing?
            </h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              Open Seva AI chatbot helper at the bottom right to get recommendations on widths, sizes, and colors.
            </p>
          </div>

        </aside>

        {/* Main Grid View */}
        <main>
          {filteredProducts.length === 0 ? (
            <div className="card text-center" style={{ padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-beige-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)' }}>
                <Search size={32} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem' }}>No Products Found</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  No catalog items match your search filters. Try adjusting price limits or clearing keyword text.
                </p>
              </div>
              <button onClick={handleResetFilters} className="btn btn-gold">
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', textAlign: 'right' }}>
                Showing <strong>{filteredProducts.length}</strong> products
              </div>
              
              <div className="grid-3">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id}
                    className="card"
                    style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}
                  >
                    {/* Rating Badge */}
                    <span className="badge badge-gold" style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 5 }}>
                      <Star size={10} style={{ fill: 'var(--color-gold-hover)', color: 'var(--color-gold-hover)', marginRight: '0.25rem' }} />
                      {product.rating}
                    </span>

                    {/* Image Block */}
                    <div 
                      onClick={() => setRoute('product-details', product.id)}
                      style={{ height: '200px', borderRadius: 'var(--border-radius-sm)', overflow: 'hidden', cursor: 'pointer', background: 'var(--color-navy)' }}
                    >
                      {renderProductImage(product)}
                    </div>

                    {/* Details Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                      <div className="flex-between">
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                          {product.category}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-gold-hover)', fontWeight: 'bold' }}>
                          {product.origin}
                        </span>
                      </div>
                      
                      <h4 
                        onClick={() => setRoute('product-details', product.id)}
                        style={{ fontSize: '1.1rem', fontWeight: '800', cursor: 'pointer', color: 'var(--color-navy)', lineHeight: '1.3' }}
                      >
                        {product.title}
                      </h4>
                      
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '2.4rem' }}>
                        {product.description}
                      </p>

                      <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                        Vendor: <strong>{product.vendor}</strong>
                      </div>
                    </div>

                    {/* Footer buy action */}
                    <div className="flex-between" style={{ borderTop: '1px solid var(--color-beige-dark)', paddingTop: '1rem', marginTop: 'auto' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-navy)' }}>
                        {convertPrice(product.price)}
                      </span>
                      <button 
                        onClick={() => addToCart(product)}
                        className="btn btn-gold btn-sm"
                      >
                        <ShoppingCart size={14} />
                        Add to Cart
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default Catalog;

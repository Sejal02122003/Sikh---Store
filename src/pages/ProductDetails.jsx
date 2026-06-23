import React, { useContext, useState } from 'react';
import { AppContext, getProductSvg } from '../context/AppContext';
import { ArrowLeft, Star, ShoppingCart, ShieldCheck, Truck, Sparkles } from 'lucide-react';

const ProductDetails = () => {
  const { selectedProductId, products, setRoute, addToCart, convertPrice } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  
  // Custom interactive turban color state
  const [turbanColor, setTurbanColor] = useState('#9E2346'); // Default Royal Crimson

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  if (!product) {
    return (
      <div className="container text-center" style={{ padding: '5rem 0' }}>
        <h3>Product Not Found</h3>
        <button onClick={() => setRoute('catalog')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Catalog
        </button>
      </div>
    );
  }

  // Turban color swatches for customizer widget
  const turbanSwatches = [
    { label: 'Royal Crimson', hex: '#9E2346' },
    { label: 'Deep Wine', hex: '#3B0A16' },
    { label: 'Saffron Gold', hex: '#D4AF37' },
    { label: 'Bright Rose', hex: '#BD3158' },
    { label: 'Pure White', hex: '#FFFFFF' }
  ];

  // AI Recommendation engine recommendation
  const aiRecommended = products.find(p => p.id !== product.id && p.category !== product.category) || products[1];

  const handleAddToCart = () => {
    // Add product to cart. If it is a Turban, capture selected color in title or details
    const productWithMeta = {
      ...product,
      // If it is a turban, append selected color to title for checkout summary
      title: product.category === 'Turbans' ? `${product.title} (${turbanSwatches.find(s => s.hex === turbanColor)?.label || 'Royal Crimson'})` : product.title,
      // Pass the customized themeColor
      themeColor: product.category === 'Turbans' ? turbanColor : product.themeColor
    };
    addToCart(productWithMeta, quantity);
    alert(`Successfully added ${quantity}x ${productWithMeta.title} to your cart!`);
  };

  return (
    <div className="container page-fade-in" style={{ paddingTop: '2.5rem' }}>
      
      {/* Back link */}
      <button 
        onClick={() => setRoute('catalog')} 
        className="btn btn-secondary btn-sm"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2rem', border: '1px solid var(--color-beige-dark)' }}
      >
        <ArrowLeft size={15} />
        Back to Catalog
      </button>

      {/* Main detail section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '3rem', alignItems: 'start' }}>
        
        {/* Left Column: Visual representation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div 
            style={{ 
              height: '420px', 
              borderRadius: 'var(--border-radius-lg)', 
              overflow: 'hidden', 
              background: 'var(--color-navy)',
              boxShadow: 'var(--box-shadow-premium)',
              border: '2px solid var(--color-beige-dark)',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {getProductSvg(product.category, product.title, product.category === 'Turbans' ? turbanColor : product.themeColor)}
          </div>

          {/* Color Customizer Widget (only for Turbans) */}
          {product.category === 'Turbans' && (
            <div className="card card-gold" style={{ padding: '1.25rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-navy)' }}>
                <Sparkles size={16} style={{ color: 'var(--color-gold-hover)' }} />
                Interactive Turban Customizer
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.15rem' }}>
                Select a shade below. Our artisan weavers will dye the double voile fabric to match your choice.
              </p>
              
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
                {turbanSwatches.map((swatch, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTurbanColor(swatch.hex)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: swatch.hex,
                      border: turbanColor === swatch.hex ? '3px solid var(--color-gold)' : '1px solid rgba(0,0,0,0.15)',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      transition: 'var(--transition-smooth)'
                    }}
                    title={swatch.label}
                  />
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Information & checkout actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div>
            <div className="flex-between">
              <span className="badge badge-gold">{product.category}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 'bold' }}>
                Origin: <strong>{product.origin}</strong>
              </span>
            </div>
            
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--color-navy)', marginTop: '0.5rem', lineHeight: '1.2' }}>
              {product.title}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-gold-hover)' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={15} style={{ fill: s <= Math.round(product.rating) ? 'var(--color-gold-hover)' : 'none' }} />
                ))}
                <span style={{ fontWeight: 'bold', fontSize: '0.85rem', color: 'var(--color-navy)', marginLeft: '0.25rem' }}>
                  {product.rating} / 5.0
                </span>
              </div>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>
                Stock status: <strong style={{ color: product.stock > 5 ? 'var(--color-success)' : 'var(--color-error)' }}>{product.stock > 5 ? `${product.stock} units available` : `Only ${product.stock} left!`}</strong>
              </span>
            </div>
          </div>

          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-navy)' }}>
            {convertPrice(product.price)}
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Description</h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              {product.description}
            </p>
          </div>

          {/* Benefits Bulletins */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--color-beige-dark)', borderBottom: '1px solid var(--color-beige-dark)', padding: '1rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
              <Truck size={16} style={{ color: 'var(--color-gold-hover)' }} />
              <span>Ships globally from <strong>{product.origin}</strong>. Estimated delivery: <strong>5-8 days</strong>.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
              <ShieldCheck size={16} style={{ color: 'var(--color-gold-hover)' }} />
              <span>Verified Artisan Vendor: <strong>{product.vendor}</strong> (Sikh Street Approved).</span>
            </div>
          </div>

          {/* Add to Cart Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '0.5rem' }}>
            
            {/* Quantity Selector */}
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-beige-dark)', borderRadius: 'var(--border-radius-sm)', background: '#FFFFFF' }}>
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                style={{ padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}
              >
                -
              </button>
              <span style={{ padding: '0.5rem 0.5rem', minWidth: '30px', textAlign: 'center', fontWeight: 'bold', fontSize: '0.95rem' }}>
                {quantity}
              </span>
              <button 
                onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                style={{ padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}
              >
                +
              </button>
            </div>

            {/* Main Add CTA */}
            <button 
              onClick={handleAddToCart}
              className="btn btn-gold" 
              style={{ flex: 1, padding: '0.9rem' }}
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </div>

          {/* AI Recommendation stub */}
          <div className="card glass-panel" style={{ marginTop: '1rem', borderLeft: '4px solid var(--color-gold)', display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ background: 'var(--color-gold)', borderRadius: '8px', padding: '0.4rem', color: 'var(--color-navy-dark)' }}>
                <Sparkles size={16} />
              </div>
              <div>
                <p style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-gold-hover)' }}>AI Recommended Match</p>
                <h5 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-navy)' }}>{aiRecommended.title}</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Complete your traditional style with this handpicked accessory.</p>
              </div>
            </div>
            <button 
              onClick={() => setRoute('product-details', aiRecommended.id)}
              className="btn btn-outline-gold btn-sm"
            >
              View Item
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;

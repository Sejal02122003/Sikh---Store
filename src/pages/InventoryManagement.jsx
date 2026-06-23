import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ArrowLeft, PackagePlus, Info } from 'lucide-react';

const InventoryManagement = () => {
  const { addVendorProduct, setRoute } = useContext(AppContext);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Turbans');
  const [origin, setOrigin] = useState('India');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('10');
  const [vendor, setVendor] = useState('Khalsa Steel Crafts');
  const [themeColor, setThemeColor] = useState('#D4AF37'); // Default gold

  const categories = ['Turbans', 'Accessories', 'Literature', 'Apparel'];
  const origins = ['India', 'Canada', 'United Kingdom'];
  const vendors = [
    'Khalsa Steel Crafts',
    'Amritsar Turban House',
    'Shastar Mandir',
    'Sikh Heritage Books',
    'Singhs Outfitters'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !price || !description || !stock) {
      alert("Please fill in all mandatory fields!");
      return;
    }

    const priceNum = parseFloat(price);
    const stockNum = parseInt(stock, 10);

    if (isNaN(priceNum) || priceNum <= 0) {
      alert("Please input a valid positive price!");
      return;
    }

    if (isNaN(stockNum) || stockNum < 0) {
      alert("Please input a valid stock count!");
      return;
    }

    // Call Context action
    addVendorProduct({
      title,
      price: priceNum,
      category,
      origin,
      description,
      stock: stockNum,
      vendor,
      themeColor
    });

    alert("Success! Your product has been listed in the catalog.");
    setRoute('vendor');
  };

  return (
    <div className="container page-fade-in" style={{ paddingTop: '2.5rem', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Return link */}
      <button 
        onClick={() => setRoute('vendor')}
        className="btn btn-secondary btn-sm"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2.5rem', border: '1px solid var(--color-beige-dark)' }}
      >
        <ArrowLeft size={15} />
        Back to Dashboard
      </button>

      {/* Main card form wrapper */}
      <div className="card" style={{ padding: '2.5rem' }}>
        
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', borderBottom: '1px solid var(--color-beige-dark)', paddingBottom: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--color-navy)', color: 'var(--color-gold)', borderRadius: '8px', padding: '0.5rem', display: 'flex' }}>
            <PackagePlus size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Add Product to Marketplace</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
              Fill in detailed item specifications. Approved listings go live immediately for global buyers.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Row 1: Title */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Product Title *</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Royal Maroon Voile Turban, Brass Kada..."
              required
              className="form-input"
            />
          </div>

          {/* Row 2: Price, Stock & Color */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Price (USD $) *</label>
              <input 
                type="number" 
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                required
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Stock Inventory *</label>
              <input 
                type="number" 
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="10"
                required
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Base Styling Color</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="color" 
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  style={{ width: '40px', height: '40px', padding: 0, border: '1px solid var(--color-beige-dark)', borderRadius: '4px', cursor: 'pointer', flexShrink: 0 }}
                />
                <input 
                  type="text" 
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="form-input"
                  style={{ fontSize: '0.85rem' }}
                />
              </div>
            </div>

          </div>

          {/* Row 3: Category, Origin & Vendor switcher */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Market Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Country of Origin</label>
              <select 
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="form-input"
              >
                {origins.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Vendor Profile</label>
              <select 
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                className="form-input"
              >
                {vendors.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Row 4: Description */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Product Description *</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a comprehensive explanation of the materials used, sizing details, historical context, or custom recommendations..."
              rows={4}
              required
              className="form-input"
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* Warning Banner */}
          <div style={{ display: 'flex', gap: '0.75rem', background: 'var(--color-bg)', padding: '1rem', border: '1px solid var(--color-beige-dark)', borderRadius: 'var(--border-radius-sm)', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
            <Info size={16} style={{ color: 'var(--color-gold-hover)', flexShrink: 0 }} />
            <span>
              By submitting this listing, you confirm that this item matches traditional artisan declarations. Sikh Street retains a minor administrative platform commission on completed sales as configured by the administrator.
            </span>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button 
              type="button"
              onClick={() => setRoute('vendor')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            
            <button 
              type="submit" 
              className="btn btn-gold"
            >
              Submit Listing
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};

export default InventoryManagement;

import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { ArrowLeft, PackagePlus, Info, Save, Upload } from 'lucide-react';

const InventoryManagement = () => {
  const { 
    addVendorProduct, 
    updateVendorProduct, 
    selectedProductId, 
    setSelectedProductId, 
    products, 
    vendors, 
    setRoute 
  } = useContext(AppContext);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Turbans');
  const [origin, setOrigin] = useState('India');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('10');
  const [vendor, setVendor] = useState('Khalsa Steel Crafts');
  const [themeColor, setThemeColor] = useState('#D4AF37'); // Default gold

  // New detailed specification states
  const [design, setDesign] = useState('');
  const [material, setMaterial] = useState('');
  const [size, setSize] = useState('');
  const [colorName, setColorName] = useState('');
  const [image, setImage] = useState(null); // Base64 image
  const [photoUploading, setPhotoUploading] = useState(false);

  const categories = ['Turbans', 'Accessories', 'Literature', 'Apparel'];
  const origins = ['India', 'Canada', 'United Kingdom'];

  // Check if we are in Edit Mode
  const isEditMode = selectedProductId !== null;
  const productToEdit = products.find(p => p.id === selectedProductId);

  // Load existing product details if editing
  useEffect(() => {
    if (isEditMode && productToEdit) {
      setTitle(productToEdit.title);
      setPrice(productToEdit.price.toString());
      setCategory(productToEdit.category);
      setOrigin(productToEdit.origin);
      setDescription(productToEdit.description);
      setStock(productToEdit.stock.toString());
      setVendor(productToEdit.vendor);
      setThemeColor(productToEdit.themeColor || '#D4AF37');
      setDesign(productToEdit.design || '');
      setMaterial(productToEdit.material || '');
      setSize(productToEdit.size || '');
      setColorName(productToEdit.colorName || '');
      setImage(productToEdit.image || null);
    }
  }, [isEditMode, productToEdit]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setPhotoUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

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

    const productFields = {
      title,
      price: priceNum,
      category,
      origin,
      description,
      stock: stockNum,
      vendor,
      themeColor,
      design,
      material,
      size,
      colorName,
      image
    };

    if (isEditMode) {
      updateVendorProduct(selectedProductId, productFields);
      alert("Success! Your product listing has been updated.");
    } else {
      addVendorProduct(productFields);
      alert("Success! Your product has been listed in the catalog.");
    }

    // Reset edit pointer & route back
    if (setSelectedProductId) {
      setSelectedProductId(null);
    }
    setRoute('vendor');
  };

  const handleCancel = () => {
    if (setSelectedProductId) {
      setSelectedProductId(null);
    }
    setRoute('vendor');
  };

  return (
    <div className="container page-fade-in" style={{ paddingTop: '2.5rem', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Return link */}
      <button 
        onClick={handleCancel}
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
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
              {isEditMode ? 'Modify Product Listing' : 'Add Product to Marketplace'}
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
              {isEditMode 
                ? 'Update listing specifications. Updated details will propagate immediately to global buyers.' 
                : 'Fill in detailed item specifications. Approved listings go live immediately for global buyers.'}
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

          {/* Row 3: Design, Material, Size, Color Name */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Design Style / Pattern</label>
              <input 
                type="text" 
                value={design}
                onChange={(e) => setDesign(e.target.value)}
                placeholder="e.g. Amritsari Double Wrap"
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Material Composition</label>
              <input 
                type="text" 
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="e.g. F74 Voile Cotton"
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Dimensions / Size</label>
              <input 
                type="text" 
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="e.g. 6.5 Meters"
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Color Name</label>
              <input 
                type="text" 
                value={colorName}
                onChange={(e) => setColorName(e.target.value)}
                placeholder="e.g. Saffron Yellow"
                className="form-input"
              />
            </div>

          </div>

          {/* Row 4: Category, Origin & Vendor switcher */}
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

          {/* Row 5: Photo Upload Simulator */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Product Image / Photo</label>
            <div style={{ 
              display: 'flex', 
              gap: '1.5rem', 
              alignItems: 'center', 
              border: '1px solid var(--color-beige-dark)', 
              padding: '1.25rem', 
              borderRadius: 'var(--border-radius-sm)', 
              background: 'var(--color-bg)' 
            }}>
              <div style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '8px', 
                border: '2px dashed var(--color-beige-dark)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                overflow: 'hidden', 
                background: '#FFFFFF', 
                flexShrink: 0 
              }}>
                {image ? (
                  <img src={image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', color: 'var(--color-text-secondary)', fontSize: '0.65rem' }}>
                    <Upload size={18} />
                    <span>No Photo</span>
                  </div>
                )}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handlePhotoUpload} 
                  style={{ fontSize: '0.8rem', color: 'var(--color-navy)' }} 
                />
                <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                  Select a product picture from your computer to see it immediately in the store.
                </p>
                {photoUploading && <span style={{ fontSize: '0.7rem', color: 'var(--color-gold-hover)', fontWeight: 'bold' }}>Loading photo data...</span>}
              </div>
            </div>
          </div>

          {/* Row 6: Description */}
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
              onClick={handleCancel}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            
            <button 
              type="submit" 
              className="btn btn-gold"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
            >
              {isEditMode ? <Save size={16} /> : null}
              {isEditMode ? 'Update Listing' : 'Submit Listing'}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};

export default InventoryManagement;

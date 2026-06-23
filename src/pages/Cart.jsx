import React, { useContext, useState } from 'react';
import { AppContext, renderProductImage } from '../context/AppContext';
import { Trash2, ShoppingBag, Percent, ShieldCheck, Ticket, CreditCard, Coins } from 'lucide-react';

const Cart = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    convertPrice, 
    currency, 
    adminRules, 
    coupons, 
    setCoins,
    setRoute,
    setOrders
  } = useContext(AppContext);

  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [earnedCoins, setEarnedCoins] = useState(0);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  // Dynamic commission fee based on Admin setting
  const commissionFee = subtotal * (adminRules.commissionRate / 100);

  // Dynamic Shipping & Customs estimates based on chosen currency (country indicator)
  const shippingEstimates = {
    USD: { shipping: 10.00, duty: 2.50, country: 'United States' },
    INR: { shipping: 3.00, duty: 0.00, country: 'India' },
    CAD: { shipping: 14.00, duty: 4.00, country: 'Canada' },
    GBP: { shipping: 12.00, duty: 3.50, country: 'United Kingdom' }
  };

  const activeEst = shippingEstimates[currency] || { shipping: 10.00, duty: 0.00, country: 'International' };
  const shippingCost = subtotal > 0 ? activeEst.shipping : 0;
  const dutyCost = subtotal > 0 ? activeEst.duty : 0;

  // Coupon discount logic
  let discountPercentage = 0;
  if (appliedCoupon === 'SIKH20') discountPercentage = 0.20;
  else if (appliedCoupon === 'SIKH15') discountPercentage = 0.15;
  else if (appliedCoupon === 'SIKH10') discountPercentage = 0.10;
  else if (appliedCoupon === 'GOLD10') discountPercentage = 0.10;
  else if (appliedCoupon === 'SIKH5') discountPercentage = 0.05;

  const discountAmount = subtotal * discountPercentage;
  const grandTotal = subtotal - discountAmount + commissionFee + shippingCost + dutyCost;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Calculate final coins earned (subtotal * 2 * admin rules multiplier)
    const pointsWon = Math.round(subtotal * 2 * adminRules.coinMultiplier);
    setEarnedCoins(pointsWon);
    
    // Add coins to wallet
    setCoins((prev) => prev + pointsWon);

    // Create dynamic orders for each cart item
    const newOrders = cart.map(item => ({
      id: (Math.floor(Math.random() * 9000) + 1000).toString(),
      product: item.product.title,
      qty: item.quantity,
      destination: activeEst.country,
      status: 'pending',
      vendor: item.product.vendor || 'Khalsa Steel Crafts',
      date: new Date().toISOString().split('T')[0],
      price: item.product.price,
      customerName: 'Sejalpreet Singh'
    }));

    setOrders((prev) => [...prev, ...newOrders]);
    
    // Show checkout success modal & empty cart
    setCheckoutSuccess(true);
    clearCart();
  };

  if (checkoutSuccess) {
    return (
      <div className="container page-fade-in" style={{ padding: '5rem 0', maxWidth: '600px', margin: '0 auto' }}>
        <div className="card card-gold text-center animate-float" style={{ padding: '3.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-navy)', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid var(--color-gold)' }}>
            <ShieldCheck size={40} />
          </div>

          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Purchase Successful!</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
              Your order has been forwarded to our artisan partners for packaging. An export invoice and tracking number have been sent to your registered email.
            </p>
          </div>

          {/* Points earned callout */}
          <div 
            style={{ 
              background: 'var(--color-navy)', 
              color: '#FFFFFF', 
              padding: '1.25rem', 
              borderRadius: 'var(--border-radius-md)', 
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              border: '1.5px solid var(--color-gold)'
            }}
          >
            <Coins size={22} style={{ color: 'var(--color-gold)' }} />
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 'bold' }}>Gamified Coin Reward!</p>
              <p style={{ fontSize: '0.95rem', fontWeight: '800' }}>Earned +{earnedCoins} Sikh Coins</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
            <button onClick={() => setRoute('catalog')} className="btn btn-gold" style={{ flex: 1 }}>
              Continue Shopping
            </button>
            <button onClick={() => setRoute('rewards')} className="btn btn-secondary" style={{ flex: 1 }}>
              Go to Rewards
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="container page-fade-in" style={{ paddingTop: '2.5rem' }}>
      
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 className="section-title">Your Checkout Cart</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginTop: '-1rem' }}>
          Review items, apply earned coupons, and choose shipping options.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="card text-center" style={{ padding: '5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-beige-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)' }}>
            <ShoppingBag size={32} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem' }}>Your shopping cart is currently empty</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Add beautiful turbans, accessories, or literature from our marketplace catalog to get started.
            </p>
          </div>
          <button onClick={() => setRoute('catalog')} className="btn btn-gold">
            Browse the Catalog
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr', gap: '2rem', alignItems: 'start' }}>
          
          {/* Left: Cart Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cart.map((item, idx) => (
              <div 
                key={idx}
                className="card"
                style={{ display: 'grid', gridTemplateColumns: '80px 1fr 120px 40px', gap: '1.25rem', alignItems: 'center' }}
              >
                {/* Image */}
                <div style={{ height: '80px', borderRadius: 'var(--border-radius-sm)', overflow: 'hidden', background: 'var(--color-navy)' }}>
                  {renderProductImage(item.product)}
                </div>

                {/* Title & Metadata */}
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--color-navy)' }}>
                    {item.product.title}
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.15rem' }}>
                    Category: {item.product.category} • Origin: {item.product.origin}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                    Vendor: <strong>{item.product.vendor}</strong>
                  </p>
                </div>

                {/* Quantity adjustments */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-beige-dark)', borderRadius: 'var(--border-radius-sm)', background: '#FFFFFF' }}>
                    <button 
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      style={{ padding: '0.2rem 0.5rem', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      style={{ padding: '0.2rem 0.5rem', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}
                    >
                      +
                    </button>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: '850', color: 'var(--color-navy)', marginTop: '0.25rem' }}>
                    {convertPrice(item.product.price * item.quantity)}
                  </span>
                </div>

                {/* Remove Trash Button */}
                <button 
                  onClick={() => removeFromCart(item.product.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--color-error)', cursor: 'pointer', display: 'flex', justifyContent: 'center' }}
                  title="Remove Item"
                >
                  <Trash2 size={18} />
                </button>

              </div>
            ))}

            <button 
              onClick={clearCart}
              className="btn btn-secondary btn-sm"
              style={{ alignSelf: 'flex-start', border: '1px solid var(--color-beige-dark)' }}
            >
              Empty Shopping Cart
            </button>
          </div>

          {/* Right: Summary panel */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', borderBottom: '1px solid var(--color-beige-dark)', paddingBottom: '0.75rem' }}>
              Order Summary
            </h3>

            {/* Price lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <div className="flex-between">
                <span style={{ color: 'var(--color-text-secondary)' }}>Items Subtotal:</span>
                <span style={{ fontWeight: '600' }}>{convertPrice(subtotal)}</span>
              </div>

              {/* Dynamic commission rate set by Admin */}
              <div className="flex-between">
                <span style={{ color: 'var(--color-text-secondary)' }}>
                  Platform Fee ({adminRules.commissionRate}%):
                </span>
                <span style={{ fontWeight: '600' }}>{convertPrice(commissionFee)}</span>
              </div>

              {/* Dynamic shipping rate per country */}
              <div className="flex-between">
                <span style={{ color: 'var(--color-text-secondary)' }}>
                  Shipping ({activeEst.country}):
                </span>
                <span style={{ fontWeight: '600' }}>{convertPrice(shippingCost)}</span>
              </div>

              {/* Dynamic Customs/duties estimates */}
              <div className="flex-between">
                <span style={{ color: 'var(--color-text-secondary)' }}>Customs & Duty Estimate:</span>
                <span style={{ fontWeight: '600' }}>{convertPrice(dutyCost)}</span>
              </div>

              {/* Coupon discounts */}
              {discountPercentage > 0 && (
                <div className="flex-between" style={{ color: 'var(--color-success)' }}>
                  <span>Discount ({appliedCoupon}):</span>
                  <span>-{convertPrice(discountAmount)}</span>
                </div>
              )}

              <div 
                className="flex-between" 
                style={{ 
                  borderTop: '2px dashed var(--color-beige-dark)', 
                  paddingTop: '1rem', 
                  fontSize: '1.2rem', 
                  fontWeight: '800', 
                  color: 'var(--color-navy)' 
                }}
              >
                <span>Grand Total:</span>
                <span>{convertPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Coupon selector input */}
            <div style={{ borderTop: '1px solid var(--color-beige-dark)', paddingTop: '1rem', marginTop: '0.5rem' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Ticket size={14} style={{ color: 'var(--color-gold-hover)' }} />
                Redeem Rewards Coupon
              </label>
              
              {coupons.length === 0 ? (
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                  No coupons in wallet. Play the Fortune Wheel to win code discounts!
                </p>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem' }}>
                  <select 
                    value={appliedCoupon}
                    onChange={(e) => setAppliedCoupon(e.target.value)}
                    className="form-input"
                    style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem' }}
                  >
                    <option value="">-- Choose Coupon --</option>
                    {coupons.map((cCode, idx) => (
                      <option key={idx} value={cCode}>
                        {cCode} ({cCode === 'SIKH20' ? '20%' : cCode === 'SIKH15' ? '15%' : '10%'} Off)
                      </option>
                    ))}
                  </select>
                  {appliedCoupon && (
                    <button 
                      onClick={() => setAppliedCoupon('')} 
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.4rem' }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Checkout Action Trigger */}
            <button 
              onClick={handleCheckout}
              className="btn btn-gold pulse-gold-button"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
            >
              <CreditCard size={18} />
              Submit Payment & Order
            </button>

            {/* Points multiplier warning */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--color-bg)', padding: '0.6rem 0.8rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--color-beige-dark)', fontSize: '0.75rem', color: 'var(--color-text-secondary)', textAlign: 'center', justifyContent: 'center' }}>
              <Coins size={14} style={{ color: 'var(--color-gold-hover)' }} />
              <span>Purchase grants <strong>+{Math.round(subtotal * 2 * adminRules.coinMultiplier)} Coins</strong> (Multiplier: {adminRules.coinMultiplier}x)</span>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Cart;

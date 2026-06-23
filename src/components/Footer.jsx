import React, { useState } from 'react';
import { Mail, Globe, Shield, CreditCard } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer style={{ backgroundColor: 'var(--color-navy-dark)', color: 'var(--color-text-light)', padding: '5rem 0 2rem 0', borderTop: '4px solid var(--color-gold)' }}>
      <div className="container">
        
        {/* Top benefits bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', paddingBottom: '3.5rem', borderBottom: '1px solid rgba(242, 235, 217, 0.1)', marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-gold)' }}>
              <Globe size={24} />
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '600' }}>Multi-Country Delivery</h4>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>We ship to India, Canada, USA, and UK</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-gold)' }}>
              <Shield size={24} />
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '600' }}>Authentic Craftsmanship</h4>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>100% verified artisan vendors</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-gold)' }}>
              <CreditCard size={24} />
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '600' }}>Secure Payments</h4>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>Encrypted transactions & transparent customs</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '3.5rem' }}>
          
          {/* Brand Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ color: '#FFFFFF', fontSize: '1.5rem', fontWeight: '800' }}>
              Sikh <span style={{ color: 'var(--color-gold)' }}>Street</span>
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>
              A modern, gamified multi-country e-commerce platform showcasing authentic spiritual articles, literature, apparel, and traditional accessories. Made for the global community.
            </p>
          </div>

          {/* Catalog shortcuts */}
          <div>
            <h4 style={{ color: 'var(--color-gold)', fontSize: '1rem', fontWeight: '600', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Shop Categories</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#E2E8F0' }}>Traditional Turbans</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#E2E8F0' }}>Sacred Kadas & Kirpans</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#E2E8F0' }}>Historical Literature</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#E2E8F0' }}>Sikh Apparel & Cholas</a></li>
            </ul>
          </div>

          {/* Policies & Info */}
          <div>
            <h4 style={{ color: 'var(--color-gold)', fontSize: '1rem', fontWeight: '600', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Customer Support</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#E2E8F0' }}>Shipping Policies</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#E2E8F0' }}>Vendor Directory</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#E2E8F0' }}>AI Assistant FAQs</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#E2E8F0' }}>Contact Support</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 style={{ color: 'var(--color-gold)', fontSize: '1rem', fontWeight: '600', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Stay Connected</h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Subscribe to get notifications on traditional artisan drops and earn 50 bonus Sikh Coins instantly!
            </p>
            {subscribed ? (
              <div className="badge badge-gold" style={{ padding: '0.6rem 1rem', fontSize: '0.8rem', display: 'flex', width: '100%', justifyContent: 'center' }}>
                🎉 You're subscribed! 50 Coins added!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="form-input"
                  style={{ 
                    padding: '0.5rem 0.75rem', 
                    fontSize: '0.85rem', 
                    backgroundColor: 'rgba(255,255,255,0.05)', 
                    border: '1px solid rgba(242, 235, 217, 0.2)',
                    color: '#FFFFFF'
                  }}
                />
                <button type="submit" className="btn btn-gold btn-sm" style={{ padding: '0.5rem 1rem' }}>
                  <Mail size={16} />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Copy block */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(242, 235, 217, 0.08)', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
          <p>© 2026 Sikh Street E-Commerce Application. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
            <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Global Customs Duty Guide</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

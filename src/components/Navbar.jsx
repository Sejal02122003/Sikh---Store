import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ShoppingCart, Coins, User, Globe, ChevronDown, Sparkles, LogOut, MessageSquare, Store } from 'lucide-react';

const Navbar = () => {
  const { 
    activeTab, 
    setRoute, 
    cart, 
    userRole, 
    setUserRole, 
    currency, 
    setCurrency, 
    coins,
    messages,
    selectedVendor,
    isRegisteredSeller,
    setIsRegisteredSeller
  } = useContext(AppContext);

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const handleVendorPortalAccess = () => {
    setRoleDropdownOpen(false);
    if (!isRegisteredSeller) {
      const confirmReg = window.confirm("You have not registered a seller profile yet. Would you like to register as a seller now?\n\n(Click 'Cancel' to view pre-loaded demo stores directly.)");
      if (confirmReg) {
        setRoute('vendor-register');
      } else {
        setUserRole('vendor');
        setRoute('vendor');
      }
    } else {
      setUserRole('vendor');
      setRoute('vendor');
    }
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const roles = [
    { id: 'customer', name: 'Customer View', desc: 'Shop & earn coins' },
    { id: 'vendor', name: 'Vendor Portal', desc: 'Manage catalog' },
    { id: 'admin', name: 'Admin Console', desc: 'Rules & approvals' }
  ];

  const currencies = ['USD', 'INR', 'CAD', 'GBP'];

  const flagEmojis = {
    USD: '🇺🇸',
    INR: '🇮🇳',
    CAD: '🇨🇦',
    GBP: '🇬🇧'
  };

  return (
    <header className="glass-panel">
      <div className="header-container" style={{ height: '75px' }}>

        {/* Brand Logo */}
        <div
          onClick={() => setRoute('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', flexShrink: 0 }}
        >
          {/* Gold Khanda SVG */}
          <div style={{ width: '40px', height: '40px', background: 'var(--color-navy)', borderRadius: '10px', padding: '6px', border: '1px solid var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
              <path d="M 50,5 L 53,25 L 53,75 L 47,75 L 47,25 Z" fill="#D4AF37" />
              <circle cx="50" cy="50" r="18" stroke="#D4AF37" strokeWidth="5" fill="none" />
              <path d="M 28,75 C 22,50, 32,35, 42,40 C 37,45, 34,55, 36,75 Z" fill="#D4AF37" />
              <path d="M 72,75 C 78,50, 68,35, 58,40 C 63,45, 66,55, 64,75 Z" fill="#D4AF37" />
            </svg>
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              Sikh <span style={{ color: 'var(--color-gold-hover)' }}>Street</span>
            </h1>
            <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', tracking: '1px', color: 'var(--color-text-secondary)', fontWeight: '700', marginTop: '-3px' }}>
              Vendor Marketplace
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexShrink: 0 }}>
          <span
            onClick={() => setRoute('home')}
            style={{
              fontWeight: '600',
              cursor: 'pointer',
              color: activeTab === 'home' ? 'var(--color-gold-hover)' : 'var(--color-navy)',
              borderBottom: activeTab === 'home' ? '2px solid var(--color-gold)' : '2px solid transparent',
              paddingBottom: '4px',
              whiteSpace: 'nowrap'
            }}
          >
            Home
          </span>
          <span
            onClick={() => setRoute('catalog')}
            style={{
              fontWeight: '600',
              cursor: 'pointer',
              color: activeTab === 'catalog' || activeTab === 'product-details' ? 'var(--color-gold-hover)' : 'var(--color-navy)',
              borderBottom: activeTab === 'catalog' || activeTab === 'product-details' ? '2px solid var(--color-gold)' : '2px solid transparent',
              paddingBottom: '4px',
              whiteSpace: 'nowrap'
            }}
          >
            Catalog
          </span>
          <span
            onClick={() => setRoute('rewards')}
            style={{
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: activeTab === 'rewards' ? 'var(--color-gold-hover)' : 'var(--color-navy)',
              borderBottom: activeTab === 'rewards' ? '2px solid var(--color-gold)' : '2px solid transparent',
              paddingBottom: '4px',
              whiteSpace: 'nowrap'
            }}
          >
            <Sparkles size={16} className="animate-float" style={{ color: 'var(--color-gold)' }} />
            Rewards
          </span>
        </nav>

        {/* Right Actions Block */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>

          {/* Seller Action Button: Become a Seller / Seller Portal / Back to Shop */}
          {userRole === 'customer' ? (
            isRegisteredSeller ? (
              <button
                onClick={handleVendorPortalAccess}
                className="btn btn-outline-gold btn-sm pulse-gold-button"
                style={{ fontSize: '0.8rem', padding: '0.45rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem', whiteSpace: 'nowrap', flexShrink: 0, borderRadius: '20px' }}
                title="Go to Seller Portal"
              >
                <Store size={14} />
                <span>Seller Portal</span>
              </button>
            ) : (
              <button
                onClick={() => setRoute('vendor-register')}
                className="btn btn-outline-gold btn-sm"
                style={{ fontSize: '0.8rem', padding: '0.45rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem', whiteSpace: 'nowrap', flexShrink: 0, borderRadius: '20px' }}
              >
                <Sparkles size={13} style={{ flexShrink: 0 }} />
                <span>Become a Seller</span>
              </button>
            )
          ) : (
            <button 
              onClick={() => {
                setUserRole('customer');
                setRoute('home');
              }}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem', whiteSpace: 'nowrap', flexShrink: 0, borderRadius: '20px', border: '1px solid var(--color-beige-dark)' }}
              title="Return to Customer Shop"
            >
              <span>Back to Shop</span>
            </button>
          )}

          {/* Currency Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => { setCurrencyDropdownOpen(!currencyDropdownOpen); setRoleDropdownOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--color-navy)',
                fontWeight: '600',
                fontSize: '0.85rem',
                cursor: 'pointer',
                padding: '0.4rem 0.6rem',
                borderRadius: 'var(--border-radius-sm)',
                transition: 'var(--transition-smooth)',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-beige-dark)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Globe size={14} />
              <span>{flagEmojis[currency]} {currency}</span>
              <ChevronDown size={10} />
            </button>

            {currencyDropdownOpen && (
              <div
                className="card"
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '0.5rem',
                  zIndex: 200,
                  width: '120px',
                  padding: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem'
                }}
              >
                {currencies.map(curr => (
                  <button
                    key={curr}
                    onClick={() => { setCurrency(curr); setCurrencyDropdownOpen(false); }}
                    className="btn btn-sm"
                    style={{
                      justifyContent: 'flex-start',
                      background: currency === curr ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                      color: currency === curr ? 'var(--color-gold-hover)' : 'var(--color-navy)',
                      width: '100%'
                    }}
                  >
                    {flagEmojis[curr]} {curr}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Gamified Coins tracker */}
          <div
            onClick={() => setRoute('rewards')}
            className="points-pill"
            style={{ cursor: 'pointer', transition: 'var(--transition-smooth)', flexShrink: 0 }}
            title="Earn coins by purchasing items or spinning the rewards wheel!"
          >
            <Coins size={16} />
            <span>{coins} Coins</span>
          </div>

          {/* Cart Icon */}
          <div
            onClick={() => setRoute('cart')}
            style={{
              position: 'relative',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              borderRadius: '50%',
              background: 'var(--color-navy)',
              color: '#fff',
              transition: 'var(--transition-smooth)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.background = 'var(--color-navy-light)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = 'var(--color-navy)';
            }}
          >
            <ShoppingCart size={18} />
            {totalCartItems > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: 'var(--color-gold)',
                  color: 'var(--color-navy-dark)',
                  fontSize: '0.7rem',
                  fontWeight: '800',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1.5px solid #FFFFFF'
                }}
              >
                {totalCartItems}
              </span>
            )}
          </div>

          {/* Role Switcher Dropdown (Demo Purpose) */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => { setRoleDropdownOpen(!roleDropdownOpen); setCurrencyDropdownOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(158, 35, 70, 0.08)',
                border: '1px solid rgba(158, 35, 70, 0.15)',
                color: 'var(--color-navy)',
                fontWeight: '700',
                fontSize: '0.85rem',
                cursor: 'pointer',
                padding: '0.4rem 0.8rem',
                borderRadius: '20px',
                transition: 'var(--transition-smooth)',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(158, 35, 70, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(158, 35, 70, 0.08)';
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'var(--color-navy)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <User size={12} />
              </div>
              <span style={{ textTransform: 'capitalize' }}>{userRole}</span>
              <ChevronDown size={10} />
            </button>

            {roleDropdownOpen && (
              <div
                className="card"
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '0.5rem',
                  zIndex: 200,
                  width: '240px',
                  padding: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--color-text-secondary)', padding: '0 0.5rem 0.25rem 0.5rem', borderBottom: '1px solid var(--color-beige-dark)' }}>
                  Switch Role Profile
                </div>
                {roles.map(role => (
                  <button
                    key={role.id}
                    onClick={() => {
                      setRoleDropdownOpen(false);
                      if (role.id === 'vendor') {
                        handleVendorPortalAccess();
                      } else {
                        setUserRole(role.id);
                        if (role.id === 'admin') setRoute('admin');
                        else setRoute('home');
                      }
                    }}
                    className="btn btn-sm"
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      background: userRole === role.id ? 'rgba(15, 30, 54, 0.05)' : 'transparent',
                      color: 'var(--color-navy)',
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--border-radius-sm)',
                      border: userRole === role.id ? '1px solid var(--color-beige-dark)' : '1px solid transparent'
                    }}
                  >
                    <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>{role.name}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>{role.desc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};

export default Navbar;

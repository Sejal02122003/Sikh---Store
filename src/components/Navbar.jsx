import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ShoppingCart, Coins, User, Globe, ChevronDown, Sparkles, Menu, X, Home, ShoppingBag } from 'lucide-react';

const Navbar = () => {
  const { 
    activeTab, 
    setRoute, 
    cart, 
    userRole, 
    setUserRole, 
    currency, 
    setCurrency, 
    coins 
  } = useContext(AppContext);

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleSidebar = () => {
    const nextState = !isSidebarOpen;
    setIsSidebarOpen(nextState);
    if (nextState) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    document.body.classList.remove('no-scroll');
  };

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
    <>
      <header className="glass-panel">
        <div className="container flex-between" style={{ height: '75px' }}>
          
          {/* Brand Logo */}
          <div 
            onClick={() => { setRoute('home'); closeSidebar(); }} 
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          >
            {/* Gold Khanda SVG */}
            <div style={{ width: '40px', height: '40px', background: 'var(--color-navy)', borderRadius: '10px', padding: '6px', border: '1px solid var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                <path d="M 50,5 L 53,25 L 53,75 L 47,75 L 47,25 Z" fill="#D4AF37"/>
                <circle cx="50" cy="50" r="18" stroke="#D4AF37" strokeWidth="5" fill="none"/>
                <path d="M 28,75 C 22,50, 32,35, 42,40 C 37,45, 34,55, 36,75 Z" fill="#D4AF37"/>
                <path d="M 72,75 C 78,50, 68,35, 58,40 C 63,45, 66,55, 64,75 Z" fill="#D4AF37"/>
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
          <nav className="hide-on-mobile" style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }}>
            <span 
              onClick={() => setRoute('home')} 
              style={{ 
                fontWeight: '600', 
                cursor: 'pointer', 
                color: activeTab === 'home' ? 'var(--color-gold-hover)' : 'var(--color-navy)',
                borderBottom: activeTab === 'home' ? '2px solid var(--color-gold)' : '2px solid transparent',
                paddingBottom: '4px'
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
                paddingBottom: '4px'
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
                paddingBottom: '4px'
              }}
            >
              <Sparkles size={16} className="animate-float" style={{ color: 'var(--color-gold)' }} />
              Rewards
            </span>
          </nav>

          {/* Right Actions Block */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            
            {/* Currency Switcher */}
            <div className="hide-on-mobile" style={{ position: 'relative' }}>
              <button 
                onClick={() => { setCurrencyDropdownOpen(!currencyDropdownOpen); setRoleDropdownOpen(false); }}
                className="btn btn-secondary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1px solid var(--color-beige-dark)' }}
              >
                <Globe size={15} />
                <span>{flagEmojis[currency]} {currency}</span>
                <ChevronDown size={12} />
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
              className="points-pill hide-on-mobile" 
              style={{ cursor: 'pointer', transition: 'var(--transition-smooth)' }}
              title="Earn coins by purchasing items or spinning the rewards wheel!"
            >
              <Coins size={16} />
              <span>{coins} Coins</span>
            </div>

            {/* Cart Icon */}
            <div 
              onClick={() => { setRoute('cart'); closeSidebar(); }}
              style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '8px', borderRadius: '50%', background: 'var(--color-navy)', color: '#fff', transition: 'var(--transition-smooth)' }}
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
            <div className="hide-on-mobile" style={{ position: 'relative' }}>
              <button 
                onClick={() => { setRoleDropdownOpen(!roleDropdownOpen); setCurrencyDropdownOpen(false); }}
                className="btn btn-primary btn-sm"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.4rem', 
                  backgroundColor: userRole === 'admin' ? 'var(--color-gold)' : userRole === 'vendor' ? 'var(--color-navy-light)' : 'var(--color-navy)',
                  color: userRole === 'admin' ? 'var(--color-navy-dark)' : 'var(--color-text-light)',
                  border: userRole === 'admin' ? '1px solid var(--color-gold)' : 'none'
                }}
              >
                <User size={15} />
                <span style={{ textTransform: 'capitalize' }}>{userRole}</span>
                <ChevronDown size={12} />
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
                        setUserRole(role.id);
                        setRoleDropdownOpen(false);
                        if (role.id === 'vendor') setRoute('vendor');
                        else if (role.id === 'admin') setRoute('admin');
                        else setRoute('home');
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

            {/* Hamburger Menu Button for Mobile */}
            <button 
              onClick={toggleSidebar}
              className="btn btn-icon show-on-mobile"
              style={{ 
                background: 'transparent', 
                color: 'var(--color-navy)',
                border: 'none',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Toggle Menu"
            >
              <Menu size={24} />
            </button>

          </div>

        </div>
      </header>

      {/* Sidebar Backdrop Overlay */}
      <div 
        className={`sidebar-backdrop ${isSidebarOpen ? 'open' : ''}`}
        onClick={closeSidebar}
      />

      {/* Sidebar Drawer Panel */}
      <div className={`sidebar-panel ${isSidebarOpen ? 'open' : ''}`}>
        
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div 
            onClick={() => { setRoute('home'); closeSidebar(); }} 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
          >
            {/* Small Khanda SVG */}
            <div style={{ width: '32px', height: '32px', background: 'var(--color-navy)', borderRadius: '8px', padding: '5px', border: '1px solid var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                <path d="M 50,5 L 53,25 L 53,75 L 47,75 L 47,25 Z" fill="#D4AF37"/>
                <circle cx="50" cy="50" r="18" stroke="#D4AF37" strokeWidth="5" fill="none"/>
                <path d="M 28,75 C 22,50, 32,35, 42,40 C 37,45, 34,55, 36,75 Z" fill="#D4AF37"/>
                <path d="M 72,75 C 78,50, 68,35, 58,40 C 63,45, 66,55, 64,75 Z" fill="#D4AF37"/>
              </svg>
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0 }}>
                Sikh <span style={{ color: 'var(--color-gold-hover)' }}>Street</span>
              </h2>
            </div>
          </div>
          
          <button onClick={closeSidebar} className="sidebar-close-btn" aria-label="Close Menu">
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Content Scrollable Area */}
        <div className="sidebar-content">
          
          {/* Navigation Links */}
          <div className="sidebar-nav">
            <div 
              className={`sidebar-nav-item ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => { setRoute('home'); closeSidebar(); }}
            >
              <Home size={18} />
              <span>Home</span>
            </div>
            
            <div 
              className={`sidebar-nav-item ${activeTab === 'catalog' || activeTab === 'product-details' ? 'active' : ''}`}
              onClick={() => { setRoute('catalog'); closeSidebar(); }}
            >
              <ShoppingBag size={18} />
              <span>Catalog</span>
            </div>
            
            <div 
              className={`sidebar-nav-item ${activeTab === 'rewards' ? 'active' : ''}`}
              onClick={() => { setRoute('rewards'); closeSidebar(); }}
            >
              <Sparkles size={18} style={{ color: 'var(--color-gold)' }} />
              <span>Rewards</span>
            </div>
          </div>

          <div className="sidebar-divider" />

          {/* Gamified Coins Wallet (Mobile Sidebar representation) */}
          <div>
            <div className="sidebar-section-title">Wallet Balance</div>
            <div 
              onClick={() => { setRoute('rewards'); closeSidebar(); }}
              className="points-pill" 
              style={{ cursor: 'pointer', justifyContent: 'center', padding: '0.6rem 1rem', width: '100%' }}
              title="Earn coins by purchasing items or spinning the rewards wheel!"
            >
              <Coins size={16} />
              <span>{coins} Coins Available</span>
            </div>
          </div>

          <div className="sidebar-divider" />

          {/* Currency Selector inside Sidebar */}
          <div>
            <div className="sidebar-section-title">Select Currency</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
              {currencies.map(curr => (
                <button
                  key={curr}
                  onClick={() => { setCurrency(curr); }}
                  className="btn btn-sm"
                  style={{ 
                    justifyContent: 'center', 
                    background: currency === curr ? 'rgba(212, 175, 55, 0.15)' : 'var(--color-card-bg)',
                    color: currency === curr ? 'var(--color-gold-hover)' : 'var(--color-navy)',
                    border: currency === curr ? '1px solid var(--color-gold)' : '1px solid var(--color-beige-dark)',
                    width: '100%',
                    fontWeight: currency === curr ? '700' : '500'
                  }}
                >
                  {flagEmojis[curr]} {curr}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-divider" />

          {/* User Role Switcher inside Sidebar */}
          <div>
            <div className="sidebar-section-title">Select Profile View</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {roles.map(role => (
                <button
                  key={role.id}
                  onClick={() => {
                    setUserRole(role.id);
                    closeSidebar();
                    if (role.id === 'vendor') setRoute('vendor');
                    else if (role.id === 'admin') setRoute('admin');
                    else setRoute('home');
                  }}
                  className="btn btn-sm"
                  style={{ 
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center', 
                    background: userRole === role.id ? 'rgba(158, 35, 70, 0.08)' : 'var(--color-card-bg)',
                    color: 'var(--color-navy)',
                    width: '100%',
                    padding: '0.6rem 0.85rem',
                    borderRadius: 'var(--border-radius-sm)',
                    border: userRole === role.id ? '1px solid var(--color-gold)' : '1px solid var(--color-beige-dark)'
                  }}
                >
                  <span style={{ fontWeight: '700', fontSize: '0.85rem', color: userRole === role.id ? 'var(--color-navy-light)' : 'var(--color-navy)' }}>{role.name}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>{role.desc}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default Navbar;

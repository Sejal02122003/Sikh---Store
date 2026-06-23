import React, { useContext, useState } from 'react';
import { AppContext, getProductSvg } from '../context/AppContext';
import { ArrowRight, Sparkles, Trophy, Calendar, Gift, Star, ShoppingCart } from 'lucide-react';

const Home = () => {
  const { products, setRoute, addToCart, convertPrice, coins, setCoins } = useContext(AppContext);
  const [streakClaimed, setStreakClaimed] = useState(false);
  const [streakDays, setStreakDays] = useState(3);

  const handleClaimStreak = () => {
    if (streakClaimed) return;
    setCoins((prev) => prev + 15);
    setStreakDays((prev) => prev + 1);
    setStreakClaimed(true);
  };

  // Top 3 products for featured section
  const featuredProducts = products.slice(0, 3);

  const categories = [
    { name: 'Turbans', count: '12+ Fabrics', desc: 'Premium Voile & Rubia' },
    { name: 'Accessories', count: '45+ Crafts', desc: 'Sarbloh Kadas & Kirpans' },
    { name: 'Literature', count: '10+ Scholars', desc: 'History, Philosophy & Hymns' },
    { name: 'Apparel', count: '15+ Sewn', desc: 'Khalsa Warrior Cholas' }
  ];

  return (
    <div className="page-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      
      {/* 1. Hero Section */}
      <section 
        style={{ 
          background: 'linear-gradient(135deg, var(--color-navy-dark) 0%, var(--color-navy) 100%)', 
          color: '#FFFFFF', 
          padding: '6rem 0 5rem 0',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '4px solid var(--color-gold)'
        }}
      >
        {/* Background glow graphics */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)' }}></div>

        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', zIndex: 5 }}>
            <div className="badge badge-gold" style={{ alignSelf: 'flex-start', padding: '0.4rem 0.8rem' }}>
              <Sparkles size={12} style={{ marginRight: '0.25rem' }} />
              Modern • Gamified • Multi-Country
            </div>
            
            <h2 style={{ fontSize: '3.2rem', color: '#FFFFFF', fontWeight: '800', lineHeight: '1.15', letterSpacing: '-1px' }}>
              Elevate Your Identity with <span style={{ color: 'var(--color-gold)', background: 'linear-gradient(to right, #FFE082, #D4AF37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sikh Street</span>
            </h2>
            
            <p style={{ color: '#BAC7D5', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '580px' }}>
              Discover handcrafted Kada accessories, premium double-width Voile turbans, historical literature, and traditional apparel. Supporting verified global artisan vendors.
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button onClick={() => setRoute('catalog')} className="btn btn-gold btn-lg">
                Shop the Catalog
                <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => setRoute('rewards')} 
                className="btn btn-outline-gold btn-lg" 
                style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#FFFFFF' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                Claim Rewards Wheel
              </button>
            </div>
          </div>

          {/* Gamified Daily Streak Card in Hero */}
          <div style={{ zIndex: 5 }}>
            <div className="card glass-panel card-gold animate-float" style={{ padding: '2rem', border: '2.5px solid var(--color-gold)', borderRadius: 'var(--border-radius-lg)', background: 'rgba(15, 30, 54, 0.85)' }}>
              <div className="flex-between" style={{ borderBottom: '1px solid rgba(242, 235, 217, 0.2)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                <span style={{ color: '#FFFFFF', fontWeight: '700', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Trophy size={18} style={{ color: 'var(--color-gold)' }} />
                  Daily Devotion Streak
                </span>
                <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>Active</span>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {[1, 2, 3, 4, 5].map((day) => {
                  const isActive = day <= streakDays;
                  const isToday = day === streakDays && !streakClaimed;
                  return (
                    <div 
                      key={day}
                      style={{ 
                        flex: 1, 
                        minWidth: '50px',
                        background: isToday ? 'rgba(212,175,55,0.2)' : isActive ? 'var(--color-navy-light)' : 'rgba(255,255,255,0.05)', 
                        border: isToday ? '2px solid var(--color-gold)' : isActive ? '1px solid var(--color-navy)' : '1px solid rgba(255,255,255,0.1)',
                        padding: '0.75rem 0.25rem', 
                        borderRadius: 'var(--border-radius-sm)', 
                        textAlign: 'center',
                        color: isActive ? '#FFF' : 'rgba(255,255,255,0.4)',
                        transition: 'var(--transition-smooth)'
                      }}
                    >
                      <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: '700' }}>Day</p>
                      <p style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0.1rem 0' }}>{day}</p>
                      {isActive ? (
                        <span style={{ fontSize: '0.65rem', color: 'var(--color-gold)' }}>⚡</span>
                      ) : (
                        <span style={{ fontSize: '0.65rem' }}>🔒</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#BAC7D5' }}>
                  <span>Streak Reward:</span>
                  <span style={{ color: '#FFFFFF', fontWeight: 'bold' }}>+15 Sikh Coins</span>
                </div>
                {streakClaimed ? (
                  <button 
                    disabled 
                    className="btn btn-secondary" 
                    style={{ width: '100%', cursor: 'not-allowed', color: 'var(--color-text-secondary)', background: 'rgba(255,255,255,0.1)' }}
                  >
                    Claimed Today • Streak Extended
                  </button>
                ) : (
                  <button 
                    onClick={handleClaimStreak}
                    className="btn btn-gold pulse-gold-button" 
                    style={{ width: '100%', fontWeight: '700' }}
                  >
                    <Calendar size={16} />
                    Claim Day {streakDays} Streak!
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Shop Categories Section */}
      <section className="container">
        <h3 className="section-title-center">Shop Sacred Categories</h3>
        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '-1rem auto 3rem auto', fontSize: '0.95rem' }}>
          Explore articles designed to support Sikh traditions, values, and cultural history. Handcrafted by local artisans worldwide.
        </p>

        <div className="grid-4">
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              className="card"
              onClick={() => setRoute('catalog')}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
            >
              {/* Image box/Representation */}
              <div style={{ height: '180px', width: '100%', borderRadius: 'var(--border-radius-sm)', overflow: 'hidden', background: 'var(--color-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {getProductSvg(cat.name, '', 'var(--color-gold)')}
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--color-navy)', fontWeight: '700' }}>{cat.name}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-gold-hover)', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '0.1rem' }}>{cat.count}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>{cat.desc}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <span className="btn btn-secondary btn-icon" style={{ borderRadius: '50%', width: '32px', height: '32px' }}>
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Rewards Banner Callout */}
      <section className="container" style={{ margin: '2rem auto' }}>
        <div 
          className="card card-gold flex-between" 
          style={{ 
            padding: '2.5rem', 
            borderRadius: 'var(--border-radius-lg)', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2.5rem', 
            alignItems: 'center' 
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="badge badge-gold" style={{ alignSelf: 'flex-start' }}>
              <Gift size={12} style={{ marginRight: '0.25rem' }} />
              Sikh Street Arcade
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800' }}>
              Earn Coins. Win Coupons. Shop More.
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Every purchase awards you points. Deduct points to spin our lucky wheel or buy specialized checkout discount codes. You currently have <strong>{coins} Sikh Coins</strong> in your wallet.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button onClick={() => setRoute('rewards')} className="btn btn-navy" style={{ background: 'var(--color-navy)', color: '#FFF' }}>
              Play Fortune Spin
            </button>
            <button onClick={() => setRoute('catalog')} className="btn btn-outline-gold">
              Shop to Earn Coins
            </button>
          </div>
        </div>
      </section>

      {/* 4. Curated Trending Products */}
      <section className="container" style={{ marginBottom: '3rem' }}>
        <h3 className="section-title">Trending Discoveries</h3>
        <div className="grid-3" style={{ marginTop: '2rem' }}>
          {featuredProducts.map((p) => (
            <div 
              key={p.id}
              className="card"
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}
            >
              {/* Product Badge */}
              <span className="badge badge-gold" style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 5 }}>
                <Star size={10} style={{ fill: 'var(--color-gold-hover)', color: 'var(--color-gold-hover)', marginRight: '0.25rem' }} />
                {p.rating}
              </span>

              {/* Product Visual */}
              <div 
                onClick={() => setRoute('product-details', p.id)}
                style={{ height: '220px', borderRadius: 'var(--border-radius-sm)', overflow: 'hidden', cursor: 'pointer', background: 'var(--color-navy)' }}
              >
                {getProductSvg(p.category, p.title, p.themeColor)}
              </div>

              {/* Product Details info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                <div className="flex-between">
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                    {p.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-gold-hover)', fontWeight: 'bold' }}>
                    From {p.origin}
                  </span>
                </div>
                <h4 
                  onClick={() => setRoute('product-details', p.id)}
                  style={{ fontSize: '1.1rem', fontWeight: '800', cursor: 'pointer', color: 'var(--color-navy)', lineHeight: '1.3' }}
                >
                  {p.title}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '2.4rem' }}>
                  {p.description}
                </p>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                  Vendor: <strong>{p.vendor}</strong>
                </div>
              </div>

              {/* Footer buy action */}
              <div className="flex-between" style={{ borderTop: '1px solid var(--color-beige-dark)', paddingTop: '1rem', marginTop: 'auto' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-navy)' }}>
                  {convertPrice(p.price)}
                </span>
                <button 
                  onClick={() => addToCart(p)}
                  className="btn btn-gold btn-sm"
                  style={{ borderRadius: 'var(--border-radius-sm)' }}
                >
                  <ShoppingCart size={14} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;

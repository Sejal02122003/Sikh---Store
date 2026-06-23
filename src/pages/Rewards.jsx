import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import RewardsWheel from '../components/RewardsWheel';
import { Sparkles, Coins, Gift, ShoppingBag, ShieldCheck, Ticket } from 'lucide-react';

const Rewards = () => {
  const { coins, setCoins, coupons, setCoupons, claimCoupon } = useContext(AppContext);

  const couponShopItems = [
    { code: 'SIKH10', discount: '10% OFF Checkout', cost: 50, desc: 'Deducts 10% from items subtotal.' },
    { code: 'SIKH15', discount: '15% OFF Checkout', cost: 85, desc: 'Deducts 15% from items subtotal.' },
    { code: 'SIKH20', discount: '20% OFF Checkout', cost: 120, desc: 'Deducts 20% from items subtotal (Max Value!).' },
  ];

  const handlePurchaseCoupon = (item) => {
    if (coins < item.cost) {
      alert("Insufficient coins! Shop more items or spin the wheel to earn coins.");
      return;
    }

    if (coupons.includes(item.code)) {
      alert("You already have this coupon in your wallet!");
      return;
    }

    const success = claimCoupon(item.code, item.cost);
    if (success) {
      alert(`Successfully claimed coupon ${item.code}! This code is now available at checkout.`);
    }
  };

  return (
    <div className="container page-fade-in" style={{ paddingTop: '2.5rem' }}>
      
      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 className="section-title">Rewards & Gamification</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginTop: '-1rem' }}>
          Accumulate Sikh Coins by checking in and shopping, then spend them to unlock checkout discount vouchers.
        </p>
      </div>

      {/* Overview Stats Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        
        {/* Stat Card 1 */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', borderLeft: '5px solid var(--color-gold)' }}>
          <div style={{ background: 'rgba(212, 175, 55, 0.15)', color: 'var(--color-gold-hover)', padding: '0.75rem', borderRadius: '50%' }}>
            <Coins size={28} />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>Coin Balance</p>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800' }}>{coins} Coins</h3>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', borderLeft: '5px solid var(--color-blue-accent)' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-blue-accent)', padding: '0.75rem', borderRadius: '50%' }}>
            <Ticket size={28} />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>Active Vouchers</p>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800' }}>{coupons.length} Claimed</h3>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', borderLeft: '5px solid var(--color-success)' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', padding: '0.75rem', borderRadius: '50%' }}>
            <ShoppingBag size={28} />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>Shopping Multiplier</p>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800' }}>2x Base Rate</h3>
          </div>
        </div>

      </div>

      <div className="dashboard-grid" style={{ gap: '2.5rem' }}>
        
        {/* Left Column: Spin the Wheel widget */}
        <div>
          <RewardsWheel />
        </div>

        {/* Right Column: Coupon Exchange Shop */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Coupon Exchange Panel */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', color: 'var(--color-navy)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Gift style={{ color: 'var(--color-gold-hover)' }} />
              Exchange Coins for Coupons
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
              Trade your coins for guaranteed coupons. Redeemed coupons will instantly show up at the checkout cart dropdown.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {couponShopItems.map((item, idx) => {
                const alreadyOwned = coupons.includes(item.code);
                return (
                  <div 
                    key={idx}
                    className="flex-between"
                    style={{ 
                      padding: '1rem', 
                      background: 'var(--color-bg)', 
                      border: '1px solid var(--color-beige-dark)', 
                      borderRadius: 'var(--border-radius-sm)',
                      gap: '1rem'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="badge badge-gold" style={{ fontSize: '0.8rem', fontWeight: '800' }}>{item.code}</span>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: '700' }}>{item.discount}</h4>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>{item.desc}</p>
                    </div>
                    
                    <button 
                      onClick={() => handlePurchaseCoupon(item)}
                      disabled={alreadyOwned}
                      className="btn btn-navy btn-sm"
                      style={{ 
                        flexShrink: 0, 
                        backgroundColor: alreadyOwned ? 'rgba(0,0,0,0.15)' : 'var(--color-navy)', 
                        color: alreadyOwned ? 'var(--color-text-secondary)' : '#FFFFFF',
                        border: 'none',
                        cursor: alreadyOwned ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <Coins size={14} style={{ color: 'var(--color-gold)' }} />
                      <span>{alreadyOwned ? 'Claimed' : `${item.cost} Coins`}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Wallet Coupons List */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--color-navy)' }}>
              Your Coupon Wallet
            </h3>
            
            {coupons.length === 0 ? (
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                You have no active coupons. Win them using the Fortune Wheel or buy them above!
              </p>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {coupons.map((code, idx) => (
                  <div 
                    key={idx}
                    className="badge badge-gold"
                    style={{ 
                      padding: '0.5rem 0.8rem', 
                      fontSize: '0.8rem', 
                      fontWeight: '800', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.4rem',
                      border: '1.5px dashed var(--color-gold)'
                    }}
                  >
                    <Ticket size={13} />
                    <span>{code}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default Rewards;

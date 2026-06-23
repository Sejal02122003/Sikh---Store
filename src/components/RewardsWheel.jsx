import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Sparkles, Gift, Coins } from 'lucide-react';

const RewardsWheel = () => {
  const { coins, setCoins, coupons, setCoupons } = useContext(AppContext);
  const [spinning, setSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState(null);
  const [wheelRotation, setWheelRotation] = useState(0);

  const prizes = [
    { name: '20% OFF Coupon', type: 'coupon', value: 'SIKH20', color: 'var(--color-navy)', text: '#FFFFFF' },
    { name: '50 Bonus Coins', type: 'coins', value: 50, color: 'var(--color-beige-dark)', text: 'var(--color-navy)' },
    { name: '15% OFF Coupon', type: 'coupon', value: 'SIKH15', color: 'var(--color-gold)', text: 'var(--color-navy-dark)' },
    { name: '10 Bonus Coins', type: 'coins', value: 10, color: 'var(--color-navy-light)', text: '#FFFFFF' },
    { name: '10% OFF Coupon', type: 'coupon', value: 'GOLD10', color: 'var(--color-beige-dark)', text: 'var(--color-navy)' },
    { name: '100 Coin Jackpot!', type: 'coins', value: 100, color: 'var(--color-gold)', text: 'var(--color-navy-dark)' },
    { name: '5% OFF Coupon', type: 'coupon', value: 'SIKH5', color: 'var(--color-navy)', text: '#FFFFFF' },
    { name: 'Free Turban Pin', type: 'coupon', value: 'FREESHIP', color: 'var(--color-navy-light)', text: '#FFFFFF' },
  ];

  const handleSpin = () => {
    if (spinning) return;
    if (coins < 25) {
      alert("You need at least 25 Sikh Coins to spin the wheel!");
      return;
    }

    // Deduct entry fee
    setCoins((prev) => prev - 25);
    setSpinning(true);
    setSpinResult(null);

    // Pick a random prize index
    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const selectedPrize = prizes[prizeIndex];

    // Calculate rotation: 5 full turns (1800 deg) + angle corresponding to the index
    // Note: each slice is 45 degrees. Slices are arranged counter-clockwise.
    // To land at index X at the top pointer (90 deg / 12 o'clock), we do:
    const sliceAngle = 360 / prizes.length;
    const targetAngle = 360 - (prizeIndex * sliceAngle) + 90; 
    const totalRotation = wheelRotation + 1800 + (targetAngle % 360);

    setWheelRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      setSpinResult(selectedPrize);

      // Award the prize
      if (selectedPrize.type === 'coins') {
        setCoins((prev) => prev + selectedPrize.value);
      } else if (selectedPrize.type === 'coupon') {
        setCoupons((prev) => {
          if (prev.includes(selectedPrize.value)) return prev;
          return [...prev, selectedPrize.value];
        });
      }
    }, 4000); // Animation duration
  };

  return (
    <div className="card card-gold text-center" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', position: 'relative', overflow: 'hidden' }}>
      
      <div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Sparkles style={{ color: 'var(--color-gold)' }} />
          Sikh Street Fortune Wheel
          <Sparkles style={{ color: 'var(--color-gold)' }} />
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
          Spin to win exclusive checkout discount codes or bonus shopping coins. Cost: 25 Coins per spin.
        </p>
      </div>

      {/* Wheel Wrapper */}
      <div className="wheel-container">
        {/* Pointer Arrow */}
        <div style={{
          position: 'absolute',
          top: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0',
          height: '0',
          borderLeft: '15px solid transparent',
          borderRight: '15px solid transparent',
          borderTop: '25px solid var(--color-gold)',
          zIndex: 10,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
        }} />

        {/* The Rotatable Wheel */}
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '8px solid var(--color-navy)',
          boxShadow: '0 8px 24px rgba(15, 30, 54, 0.2), inset 0 0 10px rgba(0,0,0,0.2)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 4s cubic-bezier(0.1, 0.8, 0.1, 1)',
          transform: `rotate(${wheelRotation}deg)`,
        }}>
          {prizes.map((p, index) => {
            const angle = index * 45;
            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  width: '50%',
                  height: '50%',
                  left: '50%',
                  top: '50%',
                  transformOrigin: '0% 0%',
                  transform: `rotate(${angle}deg) skewY(45deg)`,
                  backgroundColor: p.color,
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              />
            );
          })}

          {/* Texts inside wedges */}
          {prizes.map((p, index) => {
            // Place text at angle + 22.5 deg (middle of the 45 deg wedge)
            const textAngle = index * 45 + 22.5;
            return (
              <div
                key={`text-${index}`}
                style={{
                  position: 'absolute',
                  width: '50%',
                  height: '35px',
                  left: '50%',
                  top: '50%',
                  transformOrigin: '0% 50%',
                  transform: `translateY(-50%) rotate(${textAngle}deg) translateX(35px)`,
                  color: p.text,
                  fontWeight: '800',
                  fontSize: '0.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: 'none',
                  textShadow: p.text === '#FFFFFF' ? '0 1px 2px rgba(0,0,0,0.6)' : 'none'
                }}
              >
                {p.name.split(' ')[0]} {p.name.split(' ')[1] || ''}
              </div>
            );
          })}
        </div>

        {/* Central Core Spin Button */}
        <button
          onClick={handleSpin}
          disabled={spinning}
          className="pulse-gold-button"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: '4px solid var(--color-navy)',
            color: 'var(--color-navy)',
            fontWeight: '900',
            fontSize: '0.8rem',
            cursor: spinning ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            zIndex: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {spinning ? '...' : 'SPIN'}
        </button>
      </div>

      {/* Spin Result Display */}
      {spinResult && (
        <div 
          className="page-fade-in"
          style={{ 
            marginTop: '0.5rem', 
            padding: '0.75rem 1.25rem', 
            background: 'var(--color-navy)', 
            color: '#FFFFFF', 
            borderRadius: 'var(--border-radius-sm)',
            border: '1.5px solid var(--color-gold)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          {spinResult.type === 'coins' ? <Coins style={{ color: 'var(--color-gold)' }} /> : <Gift style={{ color: 'var(--color-gold)' }} />}
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 'bold' }}>Spin Reward Earned!</p>
            <p style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Won {spinResult.name}</p>
          </div>
        </div>
      )}

      {/* Account Info footer inside card */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-beige-dark)', paddingTop: '1rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
        <span>Entry Fee: <strong>25 Coins</strong></span>
        <span>Your Balance: <strong>{coins} Coins</strong></span>
      </div>

    </div>
  );
};

export default RewardsWheel;

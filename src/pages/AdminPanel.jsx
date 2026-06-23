import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Shield, Settings, Users, Landmark, Coins, Check, AlertCircle } from 'lucide-react';

const AdminPanel = () => {
  const { adminRules, setAdminRules, products, convertPrice, approveVendorRequest, vendorPayouts, setVendorPayouts } = useContext(AppContext);
  const [commRate, setCommRate] = useState(adminRules.commissionRate);
  const [multiplier, setMultiplier] = useState(adminRules.coinMultiplier);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    const rateNum = parseFloat(commRate);
    const multNum = parseFloat(multiplier);

    if (isNaN(rateNum) || rateNum < 0 || rateNum > 100) {
      alert("Platform commission rate must be between 0% and 100%!");
      return;
    }

    setAdminRules((prev) => ({
      ...prev,
      commissionRate: rateNum,
      coinMultiplier: multNum
    }));

    alert("Platform configuration rules updated successfully! Changes applied to Checkout.");
  };

  const handleApproveVendor = (id) => {
    approveVendorRequest(id);
    alert("Vendor profile approved! Access token granted.");
  };

  const handleApprovePayout = (payoutId) => {
    setVendorPayouts((prev) => 
      prev.map((p) => p.id === payoutId ? { ...p, status: 'Completed' } : p)
    );
    alert("Payout approved! Payout funds successfully wired to vendor.");
  };

  // Mock platform aggregate reports
  const totalCatalogItems = products.length;
  const totalCoinsAwarded = 2480;
  const platformCommissionsTotal = 188.50; // Mock base sum

  return (
    <div className="container page-fade-in" style={{ paddingTop: '2.5rem' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 className="section-title">Platform Administration</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginTop: '-1rem' }}>
          Configure checkout transaction commissions, manage the gamification multiplier, and audit vendor sign-ups.
        </p>
      </div>

      {/* Stats Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(15, 30, 54, 0.05)', color: 'var(--color-navy)', padding: '0.75rem', borderRadius: '50%' }}>
            <Landmark size={28} />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>Total Platforms Commission</p>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800' }}>{convertPrice(platformCommissionsTotal)}</h3>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(212, 175, 55, 0.15)', color: 'var(--color-gold-hover)', padding: '0.75rem', borderRadius: '50%' }}>
            <Coins size={28} />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>Coins Issued (Global)</p>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800' }}>{totalCoinsAwarded} Coins</h3>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-blue-accent)', padding: '0.75rem', borderRadius: '50%' }}>
            <Shield size={28} />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>Total Catalog Index</p>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800' }}>{totalCatalogItems} Active Items</h3>
          </div>
        </div>

      </div>

      <div className="dashboard-grid">
        
        {/* Left column: Admin config form */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-beige-dark)', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Settings size={18} style={{ color: 'var(--color-gold-hover)' }} />
            Platform Rule Engine
          </h3>

          <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Platform Commission Fee (%)</label>
              <input 
                type="number" 
                step="0.1"
                min="0"
                max="100"
                value={commRate}
                onChange={(e) => setCommRate(e.target.value)}
                required
                className="form-input"
              />
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                Applies a percentage commission to all products checked out. Currently set to: <strong>{adminRules.commissionRate}%</strong>.
              </p>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Gamification Coin Multiplier</label>
              <select 
                value={multiplier}
                onChange={(e) => setMultiplier(e.target.value)}
                className="form-input"
              >
                <option value="1.0">1.0x (Standard Earnings)</option>
                <option value="1.5">1.5x (Weekend Booster)</option>
                <option value="2.0">2.0x (Sikh Heritage festival double points)</option>
                <option value="3.0">3.0x (Jackpot Promotion)</option>
              </select>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                Multiplies the coins rewarded during customer checkouts. Currently: <strong>{adminRules.coinMultiplier}x</strong>.
              </p>
            </div>

            <button 
              type="submit" 
              className="btn btn-navy"
              style={{ backgroundColor: 'var(--color-navy)', color: '#FFFFFF', marginTop: '0.5rem' }}
            >
              Save Configuration Rules
            </button>

          </form>
        </div>

        {/* Right column: Vendor registration list & payouts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-beige-dark)', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Users size={18} style={{ color: 'var(--color-gold-hover)' }} />
              Artisan Registration Approvals
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {adminRules.vendorApprovals.map((v) => (
                <div 
                  key={v.id}
                  style={{ 
                    padding: '1rem', 
                    border: '1px solid var(--color-beige-dark)', 
                    borderRadius: 'var(--border-radius-sm)',
                    backgroundColor: 'var(--color-bg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}
                >
                  <div className="flex-between">
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '800' }}>{v.name}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.15rem' }}>
                        Category: {v.category} • Country: {v.country}
                      </p>
                      {v.email && (
                        <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>
                          Contact: {v.email} | {v.phone}
                        </p>
                      )}
                      {v.docName && (
                        <p style={{ fontSize: '0.7rem', color: 'var(--color-blue-accent)', fontWeight: '600', marginTop: '0.2rem' }}>
                          📄 Document: {v.docName} (Uploaded)
                        </p>
                      )}
                    </div>
                    <span className={`badge ${v.status === 'approved' ? 'badge-green' : 'badge-gold'}`} style={{ fontSize: '0.65rem' }}>
                      {v.status}
                    </span>
                  </div>

                  {v.status === 'pending' ? (
                    <button 
                      onClick={() => handleApproveVendor(v.id)}
                      className="btn btn-gold btn-sm"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', width: '100%' }}
                    >
                      <Check size={14} />
                      Approve Artisan Profile
                    </button>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 'bold', justifyContent: 'center' }}>
                      <Check size={14} />
                      Vendor approved and active
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Payout Approvals Panel */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-beige-dark)', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Landmark size={18} style={{ color: 'var(--color-gold-hover)' }} />
              Vendor Payout Disbursements
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {vendorPayouts.length === 0 ? (
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', textAlign: 'center', padding: '1rem 0' }}>
                  No payout requests recorded.
                </p>
              ) : (
                vendorPayouts.map((p) => (
                  <div 
                    key={p.id}
                    style={{
                      padding: '1rem',
                      border: '1px solid var(--color-beige-dark)',
                      borderRadius: 'var(--border-radius-sm)',
                      backgroundColor: 'var(--color-bg)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}
                  >
                    <div className="flex-between">
                      <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '800' }}>{p.vendor}</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                          Reference ID: <strong>{p.id}</strong> • Date: {p.date}
                        </p>
                      </div>
                      <span className={`badge ${p.status === 'Completed' ? 'badge-green' : 'badge-gold'}`} style={{ fontSize: '0.65rem' }}>
                        {p.status}
                      </span>
                    </div>

                    <div className="flex-between" style={{ marginTop: '0.25rem' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-navy)' }}>
                        {convertPrice(p.amount)}
                      </span>
                      {p.status === 'Processing' ? (
                        <button 
                          onClick={() => handleApprovePayout(p.id)}
                          className="btn btn-gold btn-sm"
                          style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                        >
                          Release Payout
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 'bold' }}>
                          Disbursed
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminPanel;

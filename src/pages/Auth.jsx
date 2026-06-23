import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Mail, Lock, User, UserPlus, LogIn, ArrowRight } from 'lucide-react';

const Auth = () => {
  const { login, signup } = useContext(AppContext);
  const [isLogin, setIsLogin] = useState(true);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVendor, setIsVendor] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(email, password);
    } else {
      signup(name, email, password, isVendor);
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="card glass-panel" style={{ width: '100%', maxWidth: '450px', padding: '2.5rem', position: 'relative', overflow: 'hidden', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
        
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--color-gold)', borderRadius: '50%', filter: 'blur(80px)', opacity: '0.15' }}></div>
        <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '150px', height: '150px', background: 'var(--color-crimson)', borderRadius: '50%', filter: 'blur(80px)', opacity: '0.15' }}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--color-navy-dark)' }}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              {isLogin ? 'Sign in to access your rewards and orders.' : 'Join the Sikh Street community today.'}
            </p>
          </div>

          {/* Toggle Login / Signup */}
          <div style={{ display: 'flex', background: 'var(--color-beige-light)', borderRadius: 'var(--border-radius-md)', padding: '0.3rem', marginBottom: '2rem' }}>
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              style={{ flex: 1, padding: '0.6rem', border: 'none', borderRadius: 'var(--border-radius-sm)', background: isLogin ? '#FFFFFF' : 'transparent', color: isLogin ? 'var(--color-navy)' : 'var(--color-text-secondary)', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: isLogin ? '0 2px 8px rgba(0,0,0,0.05)' : 'none' }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              style={{ flex: 1, padding: '0.6rem', border: 'none', borderRadius: 'var(--border-radius-sm)', background: !isLogin ? '#FFFFFF' : 'transparent', color: !isLogin ? 'var(--color-navy)' : 'var(--color-text-secondary)', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: !isLogin ? '0 2px 8px rgba(0,0,0,0.05)' : 'none' }}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {!isLogin && (
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', border: '1px solid var(--color-beige-dark)', borderRadius: 'var(--border-radius-md)', fontSize: '0.95rem', background: '#FFFFFF', transition: 'border-color 0.3s ease' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--color-beige-dark)'}
                />
              </div>
            )}

            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', border: '1px solid var(--color-beige-dark)', borderRadius: 'var(--border-radius-md)', fontSize: '0.95rem', background: '#FFFFFF', transition: 'border-color 0.3s ease' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-beige-dark)'}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', border: '1px solid var(--color-beige-dark)', borderRadius: 'var(--border-radius-md)', fontSize: '0.95rem', background: '#FFFFFF', transition: 'border-color 0.3s ease' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-beige-dark)'}
              />
            </div>

            {!isLogin && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="vendor-toggle"
                  checked={isVendor}
                  onChange={(e) => setIsVendor(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--color-gold)', cursor: 'pointer' }}
                />
                <label htmlFor="vendor-toggle" style={{ fontSize: '0.85rem', color: 'var(--color-navy-light)', cursor: 'pointer', fontWeight: '500' }}>
                  Register as a Vendor Marketplace Seller
                </label>
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', marginTop: '1rem', fontWeight: 'bold' }}>
              {isLogin ? (
                <>Sign In <LogIn size={18} /></>
              ) : (
                <>Create Account <UserPlus size={18} /></>
              )}
            </button>
          </form>

          {isLogin && (
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-gold-hover)', cursor: 'pointer', fontWeight: '600', transition: 'color 0.3s' }}>
                Forgot your password?
              </span>
            </div>
          )}

          {/* Quick Demo Login */}
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-beige-dark)', textAlign: 'center' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>Quick Demo Access</p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
               <button type="button" onClick={() => { setEmail('customer@demo.com'); login('customer@demo.com', 'password'); }} className="btn btn-sm" style={{ flex: 1, background: 'var(--color-beige-light)', color: 'var(--color-navy)', border: '1px solid var(--color-beige-dark)', padding: '0.5rem', fontSize: '0.8rem' }}>Customer</button>
               <button type="button" onClick={() => { setEmail('vendor@demo.com'); login('vendor@demo.com', 'password'); }} className="btn btn-sm" style={{ flex: 1, background: 'var(--color-navy-light)', color: '#FFF', border: 'none', padding: '0.5rem', fontSize: '0.8rem' }}>Vendor</button>
               <button type="button" onClick={() => { setEmail('admin@demo.com'); login('admin@demo.com', 'password'); }} className="btn btn-sm" style={{ flex: 1, background: 'var(--color-gold)', color: 'var(--color-navy-dark)', border: 'none', padding: '0.5rem', fontSize: '0.8rem', fontWeight: '700' }}>Admin</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

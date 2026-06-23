import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { MessageSquare, X, Send, Sparkles, BookOpen, Truck, HelpCircle } from 'lucide-react';

const AIHelper = () => {
  const { products, setRoute } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Sat Sri Akal! I am Seva AI, your personal Sikh Street Shopping Assistant. How can I help you discover authentic Sikh articles, sizing guides, or earn rewards today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const presetQuestions = [
    { label: 'Turban Sizing Help', query: 'turban size guide' },
    { label: 'Sarbloh Kada Heritage', query: 'what is sarbloh' },
    { label: 'Global Shipping Rates', query: 'shipping to canada usa uk' },
    { label: 'Earning Rewards Info', query: 'how to earn sikh coins' }
  ];

  const handleSend = (text) => {
    if (!text.trim()) return;

    // Add user message
    const newMsg = {
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let botResponseText = "";
      let recommendedProduct = null;

      const lowerText = text.toLowerCase();

      if (lowerText.includes('turban') || lowerText.includes('size') || lowerText.includes('length')) {
        botResponseText = "Traditional double-width Voile Turbans (Pagg) are typically 5 to 7.5 meters long. For children or daily casual wear (Parna), 3 to 4 meters is ideal. I highly recommend our double-width F74 Voile Turban:";
        recommendedProduct = products.find(p => p.category === 'Turbans');
      } else if (lowerText.includes('sarbloh') || lowerText.includes('kada') || lowerText.includes('iron')) {
        botResponseText = "Sarbloh translates to 'Pure Iron'. A Sarbloh Kada is one of the five articles of faith (Kakkars) for Sikhs, representing infinite strength and unbreakable connection to God. Here is our best-selling hand-forged Kada:";
        recommendedProduct = products.find(p => p.title.includes('Kada'));
      } else if (lowerText.includes('shipping') || lowerText.includes('canada') || lowerText.includes('delivery') || lowerText.includes('uk') || lowerText.includes('usa')) {
        botResponseText = "Sikh Street delivers worldwide! For Canada, USA, and UK, shipping takes 4 to 7 business days. Customs duties and local taxes are estimated dynamically and shown transparently in your checkout cart so there are no surprise fees.";
      } else if (lowerText.includes('coin') || lowerText.includes('reward') || lowerText.includes('spin') || lowerText.includes('earn')) {
        botResponseText = "You can earn Sikh Street Coins by: \n1. Registering an account (50 coins)\n2. Buying items (earn 2x the product price in coins)\n3. Playing our Daily Spin-the-Wheel on the Rewards Dashboard. You can redeem these coins for checkout discount coupons!";
      } else if (lowerText.includes('kirpan') || lowerText.includes('shastar')) {
        botResponseText = "Our ceremonial Kirpans are handcrafted by heritage smiths. The Damascus Steel Ceremonial Kirpan features elegant brass filigree and high-carbon Damascus steel. Perfect for collectors:";
        recommendedProduct = products.find(p => p.title.includes('Kirpan'));
      } else if (lowerText.includes('book') || lowerText.includes('literature') || lowerText.includes('history')) {
        botResponseText = "Explore the profound wisdom of Gurbani and the vibrant history of Sikhism. Check out our gold-gilt special hardcover study of history and hymns:";
        recommendedProduct = products.find(p => p.category === 'Literature');
      } else {
        botResponseText = "I'm here to guide you through Sikh Street! You can ask about our catalog items, turban lengths (5m vs 7.5m), Kada materials, or how to spin the wheel to win 20% discount coupons.";
      }

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botResponseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          product: recommendedProduct
        }
      ]);
    }, 1200);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-gold pulse-gold-button"
        style={{ 
          position: 'fixed', 
          bottom: '2rem', 
          right: '2rem', 
          width: '60px', 
          height: '60px', 
          borderRadius: '50%', 
          zIndex: 999, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 10px 25px rgba(212, 175, 55, 0.4)',
          border: '2px solid #FFFFFF'
        }}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Pane */}
      {isOpen && (
        <div 
          className="card glass-panel page-fade-in"
          style={{ 
            position: 'fixed', 
            bottom: '6.5rem', 
            right: '2rem', 
            width: '380px', 
            height: '520px', 
            zIndex: 999, 
            display: 'flex', 
            flexDirection: 'column', 
            padding: 0,
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(15, 30, 54, 0.15)',
            border: '2.5px solid var(--color-gold)'
          }}
        >
          {/* Header */}
          <div style={{ backgroundColor: 'var(--color-navy)', color: '#FFFFFF', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '2px solid var(--color-gold)' }}>
            <div style={{ background: 'var(--color-gold)', color: 'var(--color-navy-dark)', borderRadius: '50%', padding: '0.4rem', display: 'flex' }}>
              <Sparkles size={16} />
            </div>
            <div>
              <h3 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '700' }}>Seva AI</h3>
              <p style={{ fontSize: '0.7rem', color: 'var(--color-gold)' }}>Online • Sikh Street Assistant</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', opacity: 0.8 }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#FFFDF9' }}>
            {messages.map((msg, index) => (
              <div 
                key={index}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div 
                  style={{ 
                    padding: '0.75rem 1rem', 
                    borderRadius: '16px', 
                    borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
                    borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '16px',
                    backgroundColor: msg.sender === 'user' ? 'var(--color-navy)' : 'var(--color-beige-dark)', 
                    color: msg.sender === 'user' ? '#FFFFFF' : 'var(--color-navy-dark)',
                    fontSize: '0.85rem',
                    lineHeight: '1.4',
                    boxShadow: '0 2px 5px rgba(15,30,54,0.02)',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {msg.text}

                  {/* Dynamic product suggestion link */}
                  {msg.product && (
                    <div 
                      className="card"
                      onClick={() => {
                        setRoute('product-details', msg.product.id);
                        setIsOpen(false);
                      }}
                      style={{ 
                        marginTop: '0.75rem', 
                        padding: '0.5rem', 
                        background: '#FFFFFF', 
                        border: '1px solid var(--color-gold)', 
                        borderRadius: 'var(--border-radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer',
                        color: 'var(--color-navy)'
                      }}
                    >
                      <div style={{ width: '40px', height: '40px', borderRadius: '4px', overflow: 'hidden' }}>
                        {/* Inline render of SVG to avoid heavy assets */}
                        {msg.product.category === 'Turbans' && (
                          <div style={{ width: '100%', height: '100%' }}>
                            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                              <rect width="100" height="100" fill="var(--color-navy)" />
                              <circle cx="50" cy="50" r="25" fill="var(--color-gold)" opacity="0.6"/>
                            </svg>
                          </div>
                        )}
                        {msg.product.category !== 'Turbans' && (
                          <div style={{ width: '100%', height: '100%', background: 'var(--color-beige-dark)' }} />
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '0.75rem', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {msg.product.title}
                        </p>
                        <p style={{ fontSize: '0.7rem', color: 'var(--color-gold-hover)', fontWeight: 'bold' }}>
                          View Product Details
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem', padding: '0 0.25rem' }}>
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', gap: '0.25rem', padding: '0.5rem 1rem', borderRadius: '15px', backgroundColor: 'var(--color-beige-dark)', width: '60px', alignSelf: 'flex-start', justifyContent: 'center' }}>
                <span className="animate-float" style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-navy)', borderRadius: '50%' }}></span>
                <span className="animate-float" style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-navy)', borderRadius: '50%', animationDelay: '0.15s' }}></span>
                <span className="animate-float" style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-navy)', borderRadius: '50%', animationDelay: '0.3s' }}></span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick presets */}
          <div style={{ padding: '0.5rem', borderTop: '1px solid var(--color-beige-dark)', display: 'flex', gap: '0.35rem', overflowX: 'auto', backgroundColor: '#FFFFFF' }}>
            {presetQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q.query)}
                className="btn btn-outline-gold btn-sm"
                style={{ 
                  fontSize: '0.7rem', 
                  padding: '0.25rem 0.6rem', 
                  borderRadius: '12px',
                  whiteSpace: 'nowrap'
                }}
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input Panel */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
            style={{ padding: '0.75rem', borderTop: '1px solid var(--color-beige-dark)', display: 'flex', gap: '0.5rem', backgroundColor: '#FFFFFF' }}
          >
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Seva AI..."
              className="form-input"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
            />
            <button 
              type="submit" 
              className="btn btn-primary btn-icon" 
              style={{ width: '38px', height: '38px', flexShrink: 0, borderRadius: 'var(--border-radius-sm)' }}
            >
              <Send size={16} />
            </button>
          </form>

        </div>
      )}
    </>
  );
};

export default AIHelper;

import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { MessageSquare, X, Send, ChevronLeft, Sparkles, User, Store } from 'lucide-react';

const CustomerChatDrawer = () => {
  const { 
    messages, 
    sendDirectMessage, 
    userRole, 
    activeChatVendor, 
    setActiveChatVendor 
  } = useContext(AppContext);

  const customerName = 'Sejalpreet Singh';
  const [isOpen, setIsOpen] = useState(false);
  const [activePartner, setActivePartner] = useState('');
  const [chatTextInput, setChatTextInput] = useState('');
  const chatEndRef = useRef(null);

  // If a vendor is targeted via "Message this Seller" on the product detail page, expand the chat drawer
  useEffect(() => {
    if (activeChatVendor) {
      setIsOpen(true);
      setActivePartner(activeChatVendor);
    }
  }, [activeChatVendor]);

  // Handle auto-scroll on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activePartner, isOpen]);

  // Only render drawer for Customer view
  if (userRole !== 'customer') return null;

  // Filter messages for current customer
  const customerMessages = messages.filter(m => 
    m.sender === customerName || m.receiver === customerName ||
    m.senderName === customerName || m.receiver === 'customer'
  );

  // Extract unique conversation partners (vendors)
  const conversationPartners = Array.from(new Set(
    customerMessages.map(m => {
      if (m.senderName === customerName || m.sender === 'customer') {
        return m.receiver;
      }
      return m.senderName || m.sender;
    })
  )).filter(partner => partner && partner !== customerName && partner !== 'customer');

  // Active chat thread messages
  const activeChatMessages = customerMessages.filter(m => 
    (m.senderName === customerName && m.receiver === activePartner) ||
    (m.sender === 'customer' && m.receiver === activePartner) ||
    ((m.senderName === activePartner || m.sender === activePartner) && m.receiver === customerName)
  );

  const handleSendMessage = (text = chatTextInput) => {
    if (!text.trim()) return;
    if (!activePartner) {
      alert('Please select a store to chat.');
      return;
    }

    sendDirectMessage('customer', customerName, activePartner, text.trim());
    setChatTextInput('');
  };

  const customerQuickReplies = [
    'Is this item currently in stock?',
    'How long will delivery to my country take?',
    'Can I customize the turban width / voile grade?',
    'Is the Kada 100% pure iron (Sarbloh)?'
  ];

  const handleClose = () => {
    setIsOpen(false);
    setActiveChatVendor(null); // Reset global trigger
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-secondary pulse-gold-button"
        style={{ 
          position: 'fixed', 
          bottom: '2rem', 
          right: '7.5rem', 
          width: '60px', 
          height: '60px', 
          borderRadius: '50%', 
          zIndex: 998, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 10px 25px rgba(15, 30, 54, 0.12)',
          border: '2px solid var(--color-gold)',
          background: 'var(--color-card-bg)',
          color: 'var(--color-navy)'
        }}
        title="Direct Seller Chats"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Pane */}
      {isOpen && (
        <div 
          className="card glass-panel page-fade-in"
          style={{ 
            position: 'fixed', 
            bottom: '6.5rem', 
            right: '7.5rem', 
            width: '380px', 
            height: '520px', 
            zIndex: 998, 
            display: 'flex', 
            flexDirection: 'column', 
            padding: 0,
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(15, 30, 54, 0.15)',
            border: '2px solid var(--color-gold)'
          }}
        >
          {/* Header */}
          <div style={{ backgroundColor: 'var(--color-navy)', color: '#FFFFFF', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '2px solid var(--color-gold)' }}>
            {activePartner ? (
              <>
                <button 
                  onClick={() => { setActivePartner(''); setActiveChatVendor(null); }}
                  style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                  title="Back to inboxes"
                >
                  <ChevronLeft size={20} />
                </button>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>{activePartner}</h3>
                  <span style={{ fontSize: '0.65rem', color: 'var(--color-gold)' }}>Direct Seller Connection</span>
                </div>
              </>
            ) : (
              <>
                <div style={{ background: 'var(--color-gold)', color: 'var(--color-navy-dark)', borderRadius: '50%', padding: '0.4rem', display: 'flex' }}>
                  <Store size={14} />
                </div>
                <div>
                  <h3 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>Artisan Inbox</h3>
                  <p style={{ fontSize: '0.65rem', color: 'var(--color-gold)', margin: 0 }}>Secure Customer Routing</p>
                </div>
              </>
            )}
            <button 
              onClick={handleClose}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', opacity: 0.8 }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Body Content */}
          {activePartner ? (
            /* ACTIVE CHAT THREAD VIEW */
            <>
              {/* Messages bubbles */}
              <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', backgroundColor: '#FFFDF9' }}>
                {activeChatMessages.length === 0 ? (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>
                    <MessageSquare size={28} style={{ color: 'var(--color-gold)' }} />
                    <p>Start conversation with {activePartner}</p>
                  </div>
                ) : (
                  activeChatMessages.map((msg) => {
                    const isMe = msg.senderName === customerName || msg.sender === 'customer';
                    return (
                      <div 
                        key={msg.id}
                        style={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          alignItems: isMe ? 'flex-end' : 'flex-start',
                          maxWidth: '85%',
                          alignSelf: isMe ? 'flex-end' : 'flex-start'
                        }}
                      >
                        <div 
                          style={{ 
                            padding: '0.6rem 0.9rem', 
                            borderRadius: '16px', 
                            borderBottomRightRadius: isMe ? '4px' : '16px',
                            borderBottomLeftRadius: !isMe ? '4px' : '16px',
                            backgroundColor: isMe ? 'var(--color-navy)' : 'var(--color-beige-dark)', 
                            color: isMe ? '#FFFFFF' : 'var(--color-navy-dark)',
                            fontSize: '0.8rem',
                            lineHeight: '1.4',
                            boxShadow: '0 2px 4px rgba(15,30,54,0.01)'
                          }}
                        >
                          {msg.text}
                        </div>
                        <span style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem', padding: '0 0.25rem' }}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    );
                  })
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Replies Helper Presets */}
              <div style={{ padding: '0.5rem', borderTop: '1px solid var(--color-beige-dark)', display: 'flex', gap: '0.35rem', overflowX: 'auto', backgroundColor: '#FFFFFF' }}>
                {customerQuickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(reply)}
                    className="btn btn-outline-gold btn-sm"
                    style={{ 
                      fontSize: '0.65rem', 
                      padding: '0.25rem 0.6rem', 
                      borderRadius: '12px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {reply}
                  </button>
                ))}
              </div>

              {/* Message Input Panel */}
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                style={{ padding: '0.75rem', borderTop: '1px solid var(--color-beige-dark)', display: 'flex', gap: '0.5rem', backgroundColor: '#FFFFFF' }}
              >
                <input 
                  type="text" 
                  value={chatTextInput}
                  onChange={(e) => setChatTextInput(e.target.value)}
                  placeholder={`Send to {activePartner}...`}
                  className="form-input"
                  style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}
                />
                <button 
                  type="submit" 
                  className="btn btn-primary btn-icon" 
                  style={{ width: '38px', height: '38px', flexShrink: 0, borderRadius: 'var(--border-radius-sm)' }}
                >
                  <Send size={15} />
                </button>
              </form>
            </>
          ) : (
            /* CONVERSATIONS LIST (INBOX) VIEW */
            <div style={{ flex: 1, backgroundColor: '#FFFDF9', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
              {conversationPartners.length === 0 ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '2rem', color: 'var(--color-text-secondary)', textCenter: 'center' }}>
                  <Store size={36} style={{ color: 'var(--color-gold)' }} />
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--color-navy)', margin: 0 }}>No Chats Yet</h4>
                  <p style={{ fontSize: '0.75rem', textAlign: 'center', marginTop: '-0.25rem' }}>
                    Open a listing in the Catalog and click "Message this Seller" to query artisans about sizing or custom orders!
                  </p>
                </div>
              ) : (
                <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {conversationPartners.map((partner) => {
                    const threadMsgs = customerMessages.filter(m => 
                      (m.senderName === customerName || m.sender === 'customer') && m.receiver === partner ||
                      (m.senderName === partner || m.sender === partner) && m.receiver === customerName
                    );
                    const lastMsg = threadMsgs[threadMsgs.length - 1];

                    return (
                      <div
                        key={partner}
                        onClick={() => setActivePartner(partner)}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'auto 1fr',
                          gap: '0.75rem',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--border-radius-sm)',
                          cursor: 'pointer',
                          border: '1px solid var(--color-beige-dark)',
                          background: '#FFFFFF',
                          transition: 'var(--transition-smooth)'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-beige-dark)')}
                      >
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(214, 175, 55, 0.1)', border: '1px solid var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-navy)' }}>
                          <Store size={16} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div className="flex-between">
                            <h4 style={{ fontSize: '0.85rem', margin: 0, fontWeight: '800', color: 'var(--color-navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {partner}
                            </h4>
                            <span style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)' }}>
                              {lastMsg ? new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', margin: '0.15rem 0 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {lastMsg ? lastMsg.text : 'Click to start chat...'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CustomerChatDrawer;

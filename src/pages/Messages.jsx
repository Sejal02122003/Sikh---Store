import React, { useState, useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import { Send, MessageSquare, ShieldAlert, Sparkles, User, Store, Shield } from 'lucide-react';

const Messages = () => {
  const { 
    messages, 
    sendDirectMessage, 
    userRole, 
    selectedVendor, 
    vendors,
    setRoute 
  } = useContext(AppContext);

  // Simulated logged-in customer name
  const customerName = 'Sejalpreet Singh';

  // State to track the active chat partner
  const [activePartner, setActivePartner] = useState('');
  const [textInput, setTextInput] = useState('');
  
  const chatEndRef = useRef(null);

  // Determine current user ID / Name based on Role
  const currentUser = userRole === 'vendor' ? selectedVendor : customerName;

  // Filter messages for current user
  const userMessages = messages.filter(m => {
    if (userRole === 'vendor') {
      // Vendor sees messages where they are sender or receiver
      return m.sender === selectedVendor || m.receiver === selectedVendor;
    } else {
      // Customer sees messages where they are sender or receiver
      return m.sender === customerName || m.receiver === customerName;
    }
  });

  // Extract unique conversation partners
  const conversationPartners = Array.from(new Set(
    userMessages.map(m => {
      if (userRole === 'vendor') {
        // Partners are customers
        return m.sender === selectedVendor ? m.receiver : m.sender;
      } else {
        // Partners are vendors
        return m.sender === customerName ? m.receiver : m.sender;
      }
    })
  )).filter(partner => partner !== currentUser && partner !== 'customer'); // exclude generic tags

  // If no active partner is set, default to first conversation partner
  useEffect(() => {
    if (!activePartner && conversationPartners.length > 0) {
      setActivePartner(conversationPartners[0]);
    }
  }, [conversationPartners, activePartner]);

  // Scroll to bottom of chat on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activePartner]);

  // Active chat thread messages
  const activeChatMessages = userMessages.filter(m => {
    if (userRole === 'vendor') {
      return (m.sender === selectedVendor && m.receiver === activePartner) ||
             (m.sender === activePartner && m.receiver === selectedVendor);
    } else {
      return (m.sender === customerName && m.receiver === activePartner) ||
             (m.sender === activePartner && m.receiver === customerName);
    }
  });

  const handleSendMessage = (text = textInput) => {
    if (!text.trim()) return;
    if (!activePartner) {
      alert('Please select a conversation to message.');
      return;
    }

    if (userRole === 'vendor') {
      sendDirectMessage(selectedVendor, selectedVendor, activePartner, text.trim());
    } else {
      sendDirectMessage('customer', customerName, activePartner, text.trim());
    }

    setTextInput('');
  };

  // Quick replies tags
  const customerQuickReplies = [
    'Is this item currently in stock?',
    'How long will delivery to my country take?',
    'Can I customize the turban width / voile grade?',
    'Is the Kada 100% pure iron (Sarbloh)?'
  ];

  const vendorQuickReplies = [
    'Waheguru ji ka Khalsa! Your order has been dispatched.',
    'Yes, we custom dye/craft to your exact preferences.',
    'International delivery usually takes 5-8 business days.',
    'Akal Sahai! We are checking stock and will update you shortly.'
  ];

  const quickReplies = userRole === 'vendor' ? vendorQuickReplies : customerQuickReplies;

  return (
    <div className="container page-fade-in" style={{ paddingTop: '2.5rem' }}>
      
      {/* Header and indicator */}
      <div className="flex-between" style={{ marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="section-title" style={{ marginBottom: 0 }}>Secure Messaging</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
            Protected in-app communications between customers and international artisan vendors.
          </p>
        </div>

        {/* Current profile alert */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--color-beige-dark)', padding: '0.5rem 1rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--color-beige-hover)' }}>
          {userRole === 'vendor' ? (
            <>
              <Store size={16} style={{ color: 'var(--color-navy)' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                Chatting as Vendor: <span style={{ color: 'var(--color-navy)' }}>{selectedVendor}</span>
              </span>
            </>
          ) : userRole === 'admin' ? (
            <>
              <Shield size={16} style={{ color: 'var(--color-gold-hover)' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                Admin Support Channel
              </span>
            </>
          ) : (
            <>
              <User size={16} style={{ color: 'var(--color-navy)' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                Chatting as Customer: <span style={{ color: 'var(--color-navy)' }}>{customerName}</span>
              </span>
            </>
          )}
        </div>
      </div>

      {userRole === 'admin' ? (
        <div className="card text-center" style={{ padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
          <ShieldAlert size={48} style={{ color: 'var(--color-gold-hover)', margin: '0 auto 1.5rem auto' }} />
          <h3>Admin Moderation Channel</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginTop: '0.5rem', lineHeight: '1.6' }}>
            Administrators can monitor platform transactions and rules but cannot participate directly in private vendor-customer order communications. Please switch your profile to Customer or Vendor to chat.
          </p>
          <button 
            onClick={() => setRoute('home')}
            className="btn btn-gold"
            style={{ marginTop: '1.5rem' }}
          >
            Go to Home
          </button>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '300px 1fr', 
          gap: '1.5rem', 
          height: '600px',
          background: 'var(--color-card-bg)',
          border: '1px solid var(--color-beige-dark)',
          borderRadius: 'var(--border-radius-md)',
          boxShadow: 'var(--box-shadow-premium)',
          overflow: 'hidden'
        }}>
          
          {/* LEFT PANEL: Chat List */}
          <div style={{ 
            borderRight: '1px solid var(--color-beige-dark)', 
            display: 'flex', 
            flexDirection: 'column', 
            background: 'rgba(249, 246, 240, 0.4)' 
          }}>
            
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-beige-dark)', background: '#FFFFFF' }}>
              <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
                <MessageSquare size={16} style={{ color: 'var(--color-gold)' }} />
                Active Inboxes
              </h3>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
              {conversationPartners.length === 0 ? (
                <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>
                  No active conversations found. Open a product page and click "Contact Vendor" to initiate a chat.
                </div>
              ) : (
                conversationPartners.map((partner) => {
                  const isActive = activePartner === partner;
                  // Find last message in this thread
                  const threadMsgs = userMessages.filter(m => 
                    (m.sender === currentUser && m.receiver === partner) || 
                    (m.sender === partner && m.receiver === currentUser)
                  );
                  const lastMsg = threadMsgs[threadMsgs.length - 1];

                  return (
                    <div 
                      key={partner}
                      onClick={() => setActivePartner(partner)}
                      style={{ 
                        padding: '1rem', 
                        borderRadius: 'var(--border-radius-sm)', 
                        cursor: 'pointer',
                        background: isActive ? 'var(--color-beige-dark)' : 'transparent',
                        border: '1px solid transparent',
                        borderColor: isActive ? 'var(--color-gold)' : 'transparent',
                        marginBottom: '0.4rem',
                        transition: 'var(--transition-smooth)'
                      }}
                      onMouseEnter={(e) => !isActive && (e.currentTarget.style.background = 'var(--color-bg)')}
                      onMouseLeave={(e) => !isActive && (e.currentTarget.style.background = 'transparent')}
                    >
                      <div className="flex-between">
                        <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--color-navy)' }}>
                          {partner}
                        </span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)' }}>
                          {lastMsg ? new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden', marginTop: '0.2rem' }}>
                        {lastMsg ? lastMsg.text : 'Click to send message...'}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT PANEL: Message Window */}
          <div style={{ display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
            
            {activePartner ? (
              <>
                {/* Chat Header */}
                <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-beige-dark)', display: 'flex', alignItems: 'center', justifyBetween: 'space-between', background: 'rgba(249, 246, 240, 0.2)' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--color-navy)' }}>{activePartner}</h4>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-success)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-success)' }}></span>
                      Verified Secure Routing
                    </span>
                  </div>
                </div>

                {/* Messages Bubbles Container */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#FAF9F6' }}>
                  {activeChatMessages.length === 0 ? (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                      <MessageSquare size={32} style={{ color: 'var(--color-gold)' }} />
                      <p>Start conversation with {activePartner}</p>
                    </div>
                  ) : (
                    activeChatMessages.map((msg) => {
                      const isMe = msg.senderName === currentUser;
                      return (
                        <div 
                          key={msg.id}
                          style={{ 
                            alignSelf: isMe ? 'flex-end' : 'flex-start',
                            maxWidth: '70%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: isMe ? 'flex-end' : 'flex-start'
                          }}
                        >
                          <div style={{ 
                            background: isMe ? 'var(--color-navy)' : '#FFFFFF', 
                            color: isMe ? '#FFFFFF' : 'var(--color-text-primary)',
                            padding: '0.75rem 1rem', 
                            borderRadius: isMe ? '12px 12px 0 12px' : '12px 12px 12px 0',
                            border: isMe ? 'none' : '1px solid var(--color-beige-dark)',
                            boxShadow: '0 2px 5px rgba(15,30,54,0.02)',
                            fontSize: '0.85rem',
                            lineHeight: '1.4'
                          }}>
                            {msg.text}
                          </div>
                          <span style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      );
                    })
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Quick Reply Helper Presets */}
                <div style={{ padding: '0.5rem 1rem', background: 'rgba(249, 246, 240, 0.4)', borderTop: '1px solid var(--color-beige-dark)', display: 'flex', gap: '0.5rem', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                  {quickReplies.map((reply, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(reply)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        background: '#FFFFFF',
                        border: '1px solid var(--color-beige-dark)',
                        borderRadius: '15px',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        color: 'var(--color-navy)',
                        transition: 'var(--transition-smooth)',
                        flexShrink: 0
                      }}
                      onMouseEnter={(e) => { e.target.style.borderColor = 'var(--color-gold)'; e.target.style.background = 'var(--color-bg)'; }}
                      onMouseLeave={(e) => { e.target.style.borderColor = 'var(--color-beige-dark)'; e.target.style.background = '#FFFFFF'; }}
                    >
                      {reply}
                    </button>
                  ))}
                </div>

                {/* Input Text Bar */}
                <div style={{ padding: '1rem', borderTop: '1px solid var(--color-beige-dark)', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={`Type message secure routing to ${activePartner}...`}
                    className="form-input"
                    style={{ flex: 1, padding: '0.7rem 1rem', fontSize: '0.85rem' }}
                  />
                  <button 
                    onClick={() => handleSendMessage()}
                    className="btn btn-gold"
                    style={{ padding: '0.7rem 1.25rem', borderRadius: 'var(--border-radius-sm)' }}
                  >
                    <Send size={15} />
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: 'var(--color-text-secondary)' }}>
                <div style={{ background: 'var(--color-bg)', padding: '1rem', borderRadius: '50%' }}>
                  <MessageSquare size={36} style={{ color: 'var(--color-gold)' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--color-navy)' }}>Select a Conversation</h4>
                  <p style={{ fontSize: '0.8rem' }}>Choose an inbox on the left panel to begin secure messaging.</p>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};

export default Messages;

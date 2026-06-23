import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Building, 
  UploadCloud, 
  CreditCard, 
  FileText, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Info,
  X
} from 'lucide-react';

const VendorRegistration = () => {
  const { addVendorRegistrationRequest, setRoute, setIsRegisteredSeller, setVendors, setSelectedVendor, setUserRole } = useContext(AppContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Turbans');
  const [country, setCountry] = useState('India');

  // Document states
  const [docName, setDocName] = useState('');
  const [docUploading, setDocUploading] = useState(false);
  const [docProgress, setDocProgress] = useState(0);
  const [govIdName, setGovIdName] = useState('');
  const [idUploading, setIdUploading] = useState(false);
  const [idProgress, setIdProgress] = useState(0);

  // Bank states
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingCode, setRoutingCode] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const categories = ['Turbans', 'Accessories', 'Literature', 'Apparel'];
  const countries = ['India', 'Canada', 'United States', 'United Kingdom'];

  // Document upload simulation
  const simulateUpload = (type) => {
    if (type === 'doc') {
      setDocUploading(true);
      setDocProgress(0);
      setDocName('business_license_draft.pdf');
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setDocProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setDocUploading(false);
        }
      }, 150);
    } else {
      setIdUploading(true);
      setIdProgress(0);
      setGovIdName('national_id_card.png');
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setIdProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIdUploading(false);
        }
      }, 150);
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!businessName || !ownerName || !email || !phone) {
        alert('Please fill out all contact and business details.');
        return;
      }
    } else if (currentStep === 2) {
      if (!docName || !govIdName) {
        alert('Please upload both the business license and your ID documents to proceed.');
        return;
      }
      if (docUploading || idUploading) {
        alert('Please wait for the documents to finish uploading.');
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bankName || !accountNumber || !routingCode) {
      alert('Please fill in bank payout details.');
      return;
    }
    if (!agreeTerms) {
      alert('You must agree to the platform seller terms.');
      return;
    }

    // Submit request to AppContext
    addVendorRegistrationRequest({
      name: businessName,
      owner: ownerName,
      email,
      phone,
      category,
      country,
      docName,
      bankAccount: `${bankName} (${accountNumber.slice(-4)})`,
      status: 'approved' // Auto-approved for instant demo flow!
    });

    // Auto-approve and switch context immediately for the demo
    setVendors((prev) => {
      if (prev.includes(businessName)) return prev;
      return [...prev, businessName];
    });
    setSelectedVendor(businessName);
    setIsRegisteredSeller(true);
    setUserRole('vendor');

    alert(`Waheguru Ji Ka Khalsa! Your store "${businessName}" has been successfully registered and approved.\n\nRedirecting to your new Vendor Dashboard...`);
    setRoute('vendor');
  };

  if (submitted) {
    return (
      <div className="container page-fade-in" style={{ paddingTop: '4rem', maxWidth: '600px', margin: '0 auto' }}>
        <div className="card card-gold text-center animate-float" style={{ padding: '3.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-navy)', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid var(--color-gold)' }}>
            <ShieldCheck size={40} />
          </div>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Application Submitted!</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
              Your application for <strong>{businessName}</strong> has been received. Our administration team reviews documents within 24 hours. You will receive an notification token once approved.
            </p>
          </div>
          <div style={{ background: 'var(--color-bg)', padding: '1rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--color-beige-dark)', width: '100%', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
            <span style={{ fontWeight: 'bold', color: 'var(--color-navy)' }}>Demo Tip:</span> Switch to the <strong>Admin Console</strong> view in the top right navbar to approve this request instantly!
          </div>
          <button onClick={() => setRoute('home')} className="btn btn-gold" style={{ width: '100%', padding: '0.8rem' }}>
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-fade-in" style={{ paddingTop: '3rem', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Return link */}
      <button 
        onClick={() => setRoute('home')}
        className="btn btn-secondary btn-sm"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2rem', border: '1px solid var(--color-beige-dark)' }}
      >
        <ArrowLeft size={15} />
        Back to Store
      </button>

      {/* Step Progress Header */}
      <div className="card" style={{ padding: '1.5rem 2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', alignItems: 'center' }}>
          
          {/* Progress connector line */}
          <div style={{ position: 'absolute', top: '20px', left: '10%', right: '10%', height: '2px', background: 'var(--color-beige-dark)', zIndex: 1 }}></div>
          <div style={{ position: 'absolute', top: '20px', left: '10%', width: `${(currentStep - 1) * 40}%`, height: '2px', background: 'var(--color-gold)', zIndex: 1, transition: 'var(--transition-smooth)' }}></div>

          {[
            { step: 1, label: 'Profile', icon: <Building size={16} /> },
            { step: 2, label: 'Documents', icon: <FileText size={16} /> },
            { step: 3, label: 'Payouts', icon: <CreditCard size={16} /> }
          ].map((item) => {
            const isActive = currentStep >= item.step;
            const isCurrent = currentStep === item.step;
            return (
              <div key={item.step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 5, flex: 1 }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: isCurrent ? 'var(--color-navy)' : isActive ? 'var(--color-gold)' : 'var(--color-card-bg)',
                  color: isCurrent ? 'var(--color-text-light)' : isActive ? 'var(--color-navy-dark)' : 'var(--color-text-secondary)',
                  border: isCurrent ? '2px solid var(--color-gold)' : '2px solid var(--color-beige-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  boxShadow: isCurrent ? 'var(--box-shadow-gold)' : 'none',
                  transition: 'var(--transition-smooth)'
                }}>
                  {isActive && currentStep > item.step ? <Check size={16} /> : item.icon}
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: isActive ? '700' : '500', color: isActive ? 'var(--color-navy)' : 'var(--color-text-secondary)' }}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main wizard card */}
      <div className="card" style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', borderBottom: '1px solid var(--color-beige-dark)', paddingBottom: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--color-navy)', color: 'var(--color-gold)', borderRadius: '8px', padding: '0.5rem', display: 'flex' }}>
            <Sparkles size={22} className="animate-float" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Artisan Seller Registration</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
              Onboard your business to showcase products to thousands of global shoppers looking for authentic craftsmanship.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* STEP 1: BUSINESS PROFILE */}
          {currentStep === 1 && (
            <div className="page-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Business Identity Details</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Brand / Business Name *</label>
                  <input 
                    type="text" 
                    value={businessName} 
                    onChange={(e) => setBusinessName(e.target.value)} 
                    placeholder="e.g. Amritsar Handloom Hub" 
                    required 
                    className="form-input" 
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Owner Full Name *</label>
                  <input 
                    type="text" 
                    value={ownerName} 
                    onChange={(e) => setOwnerName(e.target.value)} 
                    placeholder="e.g. Gurpreet Singh" 
                    required 
                    className="form-input" 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Business Email *</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="e.g. partner@business.com" 
                    required 
                    className="form-input" 
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Phone Number *</label>
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="e.g. +91 98765-43210" 
                    required 
                    className="form-input" 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Primary Craft Category</label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    className="form-input"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Country of Origin</label>
                  <select 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)} 
                    className="form-input"
                  >
                    {countries.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DOCUMENTS UPLOADS */}
          {currentStep === 2 && (
            <div className="page-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Verify Business Identity</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '-1rem' }}>
                To maintain standard authenticity, we require proof of incorporation/tax registrations and owner identity.
              </p>

              {/* Document 1: Business License */}
              <div>
                <label className="form-label">Business Registration Certificate / Tax License *</label>
                <div 
                  onClick={() => simulateUpload('doc')}
                  style={{
                    border: '2px dashed var(--color-beige-dark)',
                    borderRadius: 'var(--border-radius-md)',
                    padding: '2rem 1.5rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: 'var(--color-bg)',
                    transition: 'var(--transition-smooth)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-gold)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-beige-dark)'}
                >
                  <UploadCloud size={32} style={{ color: 'var(--color-gold-hover)' }} />
                  {docName ? (
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-navy)' }}>{docName}</p>
                      {docUploading ? (
                        <div style={{ marginTop: '0.5rem', width: '200px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden', height: '6px', margin: '8px auto' }}>
                          <div style={{ height: '100%', background: 'var(--color-gold)', width: `${docProgress}%` }}></div>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.2rem', justifyContent: 'center', marginTop: '0.25rem' }}>
                          <Check size={12} /> Uploaded successfully
                        </span>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Drag and drop file, or click to upload</p>
                      <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>PDF, PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Document 2: Owner ID */}
              <div>
                <label className="form-label">Government Issued Owner ID (Passport, Driving License, National ID) *</label>
                <div 
                  onClick={() => simulateUpload('id')}
                  style={{
                    border: '2px dashed var(--color-beige-dark)',
                    borderRadius: 'var(--border-radius-md)',
                    padding: '2rem 1.5rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: 'var(--color-bg)',
                    transition: 'var(--transition-smooth)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-gold)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-beige-dark)'}
                >
                  <UploadCloud size={32} style={{ color: 'var(--color-gold-hover)' }} />
                  {govIdName ? (
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-navy)' }}>{govIdName}</p>
                      {idUploading ? (
                        <div style={{ marginTop: '0.5rem', width: '200px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden', height: '6px', margin: '8px auto' }}>
                          <div style={{ height: '100%', background: 'var(--color-gold)', width: `${idProgress}%` }}></div>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.2rem', justifyContent: 'center', marginTop: '0.25rem' }}>
                          <Check size={12} /> Uploaded successfully
                        </span>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Drag and drop file, or click to upload</p>
                      <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>PDF, PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* STEP 3: BANK DETAILS & SUBMIT */}
          {currentStep === 3 && (
            <div className="page-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Payout & Bank Details</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '-1rem' }}>
                Where should we deposit your net earnings after platform commissions?
              </p>

              <div className="form-group">
                <label className="form-label">Bank Name *</label>
                <input 
                  type="text" 
                  value={bankName} 
                  onChange={(e) => setBankName(e.target.value)} 
                  placeholder="e.g. State Bank of India, Royal Bank of Canada..." 
                  required 
                  className="form-input" 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Account Number / IBAN *</label>
                  <input 
                    type="password" 
                    value={accountNumber} 
                    onChange={(e) => setAccountNumber(e.target.value)} 
                    placeholder="Enter account number" 
                    required 
                    className="form-input" 
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Routing Transit Number / SWIFT *</label>
                  <input 
                    type="text" 
                    value={routingCode} 
                    onChange={(e) => setRoutingCode(e.target.value)} 
                    placeholder="e.g. SBIN0001827 or routing code" 
                    required 
                    className="form-input" 
                  />
                </div>
              </div>

              {/* Info alert */}
              <div style={{ display: 'flex', gap: '0.75rem', background: 'var(--color-bg)', padding: '1rem', border: '1px solid var(--color-beige-dark)', borderRadius: 'var(--border-radius-sm)', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
                <Info size={16} style={{ color: 'var(--color-gold-hover)', flexShrink: 0 }} />
                <span>
                  Sikh Street implements a standard <strong>5% platform fee</strong> on order checkouts. Payments are disbursed on request once buyer shipments are verified.
                </span>
              </div>

              {/* Terms checkbox */}
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
                <input 
                  type="checkbox" 
                  id="agree" 
                  checked={agreeTerms} 
                  onChange={(e) => setAgreeTerms(e.target.checked)} 
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <label htmlFor="agree" style={{ fontSize: '0.8rem', cursor: 'pointer', color: 'var(--color-text-primary)', fontWeight: '500' }}>
                  I agree to the Sikh Street Artisan Seller Terms, Customs Declarations, and Ethics Agreement.
                </label>
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2.5rem', borderTop: '1px solid var(--color-beige-dark)', paddingTop: '1.5rem' }}>
            {currentStep > 1 && (
              <button 
                type="button" 
                onClick={handleBack} 
                className="btn btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <ArrowLeft size={16} />
                Back
              </button>
            )}

            {currentStep < 3 ? (
              <button 
                type="button" 
                onClick={handleNext} 
                className="btn btn-gold"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
              >
                Continue
                <ArrowRight size={16} />
              </button>
            ) : (
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', backgroundColor: 'var(--color-navy)', color: '#FFFFFF' }}
              >
                Submit Registration
                <Check size={16} />
              </button>
            )}
          </div>

        </form>
      </div>

    </div>
  );
};

export default VendorRegistration;

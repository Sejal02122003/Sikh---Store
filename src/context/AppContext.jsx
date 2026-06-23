import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

// Dynamic SVG illustrations for products based on category/name
export const getProductSvg = (category, title, themeColor = '#D4AF37') => {
  // Return standard SVG structures for categories
  switch (category) {
    case 'Turbans':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#3B0A16" rx="10"/>
          {/* Turban wraps */}
          <path d="M20 70 C 25 50, 45 40, 80 50 C 70 30, 45 25, 20 40 Z" fill={themeColor} opacity="0.8"/>
          <path d="M20 40 C 35 25, 65 20, 80 40 C 70 50, 40 50, 20 70 Z" fill={themeColor}/>
          <path d="M25 45 C 40 35, 60 35, 75 45" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.5"/>
          <path d="M30 55 C 45 45, 55 45, 70 55" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.4"/>
          {/* Kalgi / Jewel in center */}
          <path d="M50 25 L 53 35 L 50 45 L 47 35 Z" fill="#D4AF37"/>
          <circle cx="50" cy="35" r="3" fill="#EF4444"/>
          <path d="M50 25 C 45 15, 55 15, 50 25" stroke="#D4AF37" strokeWidth="1" fill="none"/>
        </svg>
      );
    case 'Accessories':
      if (title.toLowerCase().includes('kada')) {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect width="100" height="100" fill="#3B0A16" rx="10"/>
            <circle cx="50" cy="50" r="28" stroke="#E5E7EB" strokeWidth="6" fill="none" />
            <circle cx="50" cy="50" r="28" stroke={themeColor} strokeWidth="2" fill="none" opacity="0.8" />
            {/* Metal shines */}
            <path d="M35 35 A 28 28 0 0 1 65 35" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7"/>
            <path d="M40 65 A 28 28 0 0 0 60 65" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5"/>
            {/* Sparkle */}
            <path d="M68 32 L 72 32 M 70 30 L 70 34" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        );
      } else if (title.toLowerCase().includes('kirpan')) {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect width="100" height="100" fill="#3B0A16" rx="10"/>
            {/* Curved Kirpan blade */}
            <path d="M30 75 C 35 60, 45 45, 65 30 C 60 40, 50 55, 35 77 Z" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.5"/>
            {/* Hilt */}
            <path d="M26 80 L 33 73 L 28 68 L 22 75 Z" fill="#D4AF37"/>
            <circle cx="23" cy="78" r="2" fill="#000000"/>
            {/* Sheath / cover decorations */}
            <path d="M32 73 C 38 65, 48 55, 68 35 C 72 31, 75 28, 77 25 C 75 30, 71 35, 67 39 C 48 59, 38 69, 32 73 Z" fill={themeColor} opacity="0.85"/>
            <path d="M36 68 L 40 72 M 45 59 L 49 63" stroke="#D4AF37" strokeWidth="1" opacity="0.6"/>
            {/* Gold tassel */}
            <path d="M22 75 C 18 80, 15 85, 18 87" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
          </svg>
        );
      } else { // Kalgi or general accessory
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect width="100" height="100" fill="#3B0A16" rx="10"/>
            {/* Gold pin structure */}
            <path d="M50 85 L 50 30" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round"/>
            <path d="M50 45 C 30 35, 30 15, 50 30 C 70 15, 70 35, 50 45" fill={themeColor}/>
            {/* Jewels */}
            <circle cx="50" cy="30" r="5" fill="#EF4444" stroke="#D4AF37" strokeWidth="1"/>
            <circle cx="40" cy="27" r="3" fill="#BD3158" stroke="#D4AF37" strokeWidth="0.5"/>
            <circle cx="60" cy="27" r="3" fill="#BD3158" stroke="#D4AF37" strokeWidth="0.5"/>
            {/* Golden Feathers */}
            <path d="M50 30 C 50 10, 45 5, 42 10" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
            <path d="M50 30 C 50 10, 55 5, 58 10" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
          </svg>
        );
      }
    case 'Literature':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#3B0A16" rx="10"/>
          {/* Book shape */}
          <path d="M30 20 L 70 20 C 73 20, 75 22, 75 25 L 75 80 C 75 83, 73 85, 70 85 L 30 85 C 27 85, 25 83, 25 80 L 25 25 C 25 22, 27 20, 30 20 Z" fill={themeColor}/>
          {/* Book pages edge */}
          <path d="M28 23 H 68 V 83 H 28 Z" fill="#FFFBEB" opacity="0.9"/>
          {/* Cover binder */}
          <path d="M25 20 H 30 V 85 H 25 Z" fill="#9E2346" opacity="0.3"/>
          {/* Golden Khanda symbol in center of book */}
          <g transform="translate(48, 50) scale(0.6)">
            {/* Double edged sword */}
            <path d="M 0,-25 L 2,-20 L 2,15 L -2,15 L -2,-20 Z" fill="#D4AF37"/>
            {/* Ring (Chakkar) */}
            <circle cx="0" cy="2" r="10" stroke="#D4AF37" strokeWidth="3" fill="none"/>
            {/* Two curved swords (Kirpans) */}
            <path d="M -12,18 C -15,0, -7,-12, -2,-8 C -5,-4, -8,5, -6,18 Z" fill="#D4AF37"/>
            <path d="M 12,18 C 15,0, 7,-12, 2,-8 C 5,-4, 8,5, 6,18 Z" fill="#D4AF37"/>
          </g>
          {/* Title lines */}
          <rect x="35" y="65" width="28" height="2" fill="#9E2346" opacity="0.5" rx="1"/>
          <rect x="40" y="70" width="18" height="2" fill="#9E2346" opacity="0.5" rx="1"/>
        </svg>
      );
    case 'Apparel':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#3B0A16" rx="10"/>
          {/* Traditional Chola outline */}
          <path d="M 35,25 L 42,20 L 50,23 L 58,20 L 65,25 L 75,40 L 68,43 L 65,37 L 65,80 C 65,83, 62,85, 59,85 L 41,85 C 38,85, 35,83, 35,80 L 35,37 L 32,43 L 25,40 Z" fill={themeColor}/>
          {/* Kamar Kasa (Waist sash) */}
          <rect x="35" y="52" width="30" height="6" fill="#D4AF37" rx="1"/>
          {/* Details & collar */}
          <path d="M 45,23 V 38" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          <path d="M 42,20 C 45,24, 55,24, 58,20" stroke="#D4AF37" strokeWidth="1" fill="none"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#3B0A16" rx="10"/>
          <circle cx="50" cy="50" r="20" fill={themeColor}/>
          <circle cx="50" cy="50" r="12" fill="#D4AF37"/>
        </svg>
      );
  }
};

export const renderProductImage = (p, overrideColor = null) => {
  if (p && p.image) {
    return <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />;
  }
  const color = overrideColor || (p ? p.themeColor : '#D4AF37');
  return getProductSvg(p ? p.category : '', p ? p.title : '', color);
};

const initialProducts = [
  {
    id: 1,
    title: 'Royal Amritsari Turban (Dastar)',
    price: 15.00,
    category: 'Turbans',
    rating: 4.9,
    themeColor: '#9E2346',
    description: 'Premium double-width F74 voile fabric turban, dyed in traditional royal crimson. Soft, breathable, and holds its structure perfectly. Perfect for all formal and spiritual events.',
    vendor: 'Amritsar Turban House',
    origin: 'India',
    stock: 45,
    material: 'F74 Voile Cotton',
    size: '6.5 Meters',
    design: 'Royal Amritsari Wrap',
    colorName: 'Royal Crimson',
    image: null
  },
  {
    id: 2,
    title: 'Classic Hand-Forged Sarbloh Kada',
    price: 12.00,
    category: 'Accessories',
    rating: 4.8,
    themeColor: '#D4AF37',
    description: 'Heavyweight pure iron (Sarbloh) Kada, hand-forged by master blacksmiths. Carefully smoothed and polished for a comfortable daily wear experience.',
    vendor: 'Khalsa Steel Crafts',
    origin: 'India',
    stock: 30,
    material: 'Pure Iron (Sarbloh)',
    size: '2.8 Inches (Standard)',
    design: 'Classic Hand-Forged Circular Ring',
    colorName: 'Metallic Dark Grey',
    image: null
  },
  {
    id: 3,
    title: 'Damascus Steel Ceremonial Kirpan',
    price: 75.00,
    category: 'Accessories',
    rating: 5.0,
    themeColor: '#8C1D40',
    description: 'Exquisite ceremonial Kirpan crafted from genuine Damascus steel. Featuring intricate brass engravings on the handle and a velvet-wrapped scabbard.',
    vendor: 'Shastar Mandir',
    origin: 'India',
    stock: 8,
    material: 'Damascus Steel & Brass',
    size: '9 Inches',
    design: 'Curved Ceremonial blade with Brass Hilt',
    colorName: 'Gold & Steel',
    image: null
  },
  {
    id: 4,
    title: 'Sri Guru Granth Sahib History & Hymns',
    price: 25.00,
    category: 'Literature',
    rating: 4.7,
    themeColor: '#C5A880',
    description: 'A scholarly introduction to Sikh history, core philosophical concepts, and line-by-line translations of key Gurbani hymns. Hardcover premium gold-gilt edition.',
    vendor: 'Sikh Heritage Books',
    origin: 'United Kingdom',
    stock: 20,
    material: 'Hardcover Gold-Gilt Paper',
    size: 'Standard A5 Hardback',
    design: 'Premium Golden Khanda Embossed Cover',
    colorName: 'Burgundy & Gold',
    image: null
  },
  {
    id: 5,
    title: 'Traditional Khalsa Crimson Warrior Chola',
    price: 35.00,
    category: 'Apparel',
    rating: 4.9,
    themeColor: '#9E2346',
    description: 'Authentic warrior Chola stitched from sturdy, pre-washed organic cotton. Features deep pockets, standard side cuts, and optimized fit for Gatka martial arts and prayers. Dyed in traditional rich crimson.',
    vendor: 'Singhs Outfitters',
    origin: 'India',
    stock: 15,
    material: 'Sturdy Organic Cotton',
    size: 'Medium (42)',
    design: 'Warrior Cut with Pockets & Side Slits',
    colorName: 'Warrior Crimson',
    image: null
  },
  {
    id: 6,
    title: 'Royal Brass Turban Ornament (Kalgi)',
    price: 40.00,
    category: 'Accessories',
    rating: 4.6,
    themeColor: '#F59E0B',
    description: 'Delicate gold-plated brass kalgi decorated with faux rubies and emeralds. Features a strong secure clasp to anchor beautifully onto your wedding turban.',
    vendor: 'Khalsa Steel Crafts',
    origin: 'Canada',
    stock: 10,
    material: 'Brass & Faux Ruby Gemstones',
    size: '3.5 Inches',
    design: 'Plumed Plated Plaque with Faux Plumes',
    colorName: 'Gold & Red Plume',
    image: null
  }
];

export const AppProvider = ({ children }) => {
  // Navigation Routing States
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [activeChatVendor, setActiveChatVendor] = useState(null);

  // Core Data States
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('sikh_street_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('sikh_street_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // User Authentication State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sikh_street_user');
    return saved ? JSON.parse(saved) : null;
  });

  // User Role State
  const [userRole, setUserRole] = useState(() => {
    const saved = localStorage.getItem('sikh_street_user');
    return saved ? JSON.parse(saved).role : 'customer';
  });

  const [isRegisteredSeller, setIsRegisteredSeller] = useState(() => {
    return localStorage.getItem('sikh_street_is_registered_seller') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('sikh_street_is_registered_seller', isRegisteredSeller.toString());
  }, [isRegisteredSeller]);

  // Vendors state
  const [vendors, setVendors] = useState(() => {
    const saved = localStorage.getItem('sikh_street_vendors');
    return saved ? JSON.parse(saved) : [
      'Khalsa Steel Crafts',
      'Amritsar Turban House',
      'Shastar Mandir',
      'Sikh Heritage Books',
      'Singhs Outfitters'
    ];
  });

  // Selected Active Vendor Profile
  const [selectedVendor, setSelectedVendor] = useState(() => {
    return localStorage.getItem('sikh_street_selected_vendor') || 'Khalsa Steel Crafts';
  });

  // Orders state
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('sikh_street_orders');
    return saved ? JSON.parse(saved) : [
      { id: '1092', product: 'Classic Hand-Forged Sarbloh Kada', qty: 2, destination: 'Canada', status: 'shipped', vendor: 'Khalsa Steel Crafts', date: '2026-06-22', price: 12.00, customerName: 'Harpreet Singh' },
      { id: '1098', product: 'Damascus Steel Ceremonial Kirpan', qty: 1, destination: 'United Kingdom', status: 'pending', vendor: 'Shastar Mandir', date: '2026-06-23', price: 75.00, customerName: 'Rajinder Singh' },
      { id: '1102', product: 'Royal Amritsari Turban (Dastar)', qty: 3, destination: 'India', status: 'pending', vendor: 'Amritsar Turban House', date: '2026-06-23', price: 15.00, customerName: 'Jaspreet Kaur' }
    ];
  });

  // Payout History state
  const [vendorPayouts, setVendorPayouts] = useState(() => {
    const saved = localStorage.getItem('sikh_street_payouts');
    return saved ? JSON.parse(saved) : [
      { id: 'PO-1001', vendor: 'Khalsa Steel Crafts', amount: 150.00, date: '2026-06-15', status: 'Completed' },
      { id: 'PO-1002', vendor: 'Amritsar Turban House', amount: 320.00, date: '2026-06-18', status: 'Completed' }
    ];
  });

  // Secure Messaging state
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('sikh_street_messages');
    return saved ? JSON.parse(saved) : [
      { id: 1, sender: 'customer', senderName: 'Harpreet Singh', receiver: 'Khalsa Steel Crafts', text: 'Akal Sahai! Is the Sarbloh Kada pure iron or does it have alloy?', timestamp: '2026-06-23T10:15:00.000Z', isRead: false },
      { id: 2, sender: 'Khalsa Steel Crafts', senderName: 'Khalsa Steel Crafts', receiver: 'Harpreet Singh', text: 'Waheguru ji ka Khalsa! It is hand-forged from 100% pure iron (Sarbloh) with no alloy. Smooth finished.', timestamp: '2026-06-23T10:20:00.000Z', isRead: true },
      { id: 3, sender: 'customer', senderName: 'Jaspreet Kaur', receiver: 'Amritsar Turban House', text: 'Hello, will the Crimson Turban arrive in Canada within 6 days?', timestamp: '2026-06-23T11:00:00.000Z', isRead: false },
      { id: 4, sender: 'Amritsar Turban House', senderName: 'Amritsar Turban House', receiver: 'Jaspreet Kaur', text: 'Yes, we ship via DHL Express for Canada. It usually takes 5-8 days, most orders arrive within 6 days.', timestamp: '2026-06-23T11:10:00.000Z', isRead: true }
    ];
  });

  // Currency Switcher States
  const [currency, setCurrency] = useState('USD');
  const conversionRates = {
    USD: 1.0,
    INR: 83.5,
    CAD: 1.36,
    GBP: 0.78,
  };
  const currencySymbols = {
    USD: '$',
    INR: '₹',
    CAD: 'C$',
    GBP: '£',
  };

  // Gamified Rewards State
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('sikh_street_coins');
    return saved ? parseInt(saved, 10) : 120; // Default coins to start
  });
  
  const [coupons, setCoupons] = useState(() => {
    const saved = localStorage.getItem('sikh_street_coupons');
    return saved ? JSON.parse(saved) : ['SIKH10']; // Default 10% coupon
  });

  const [spinAvailable, setSpinAvailable] = useState(true);

  // Admin Rules Configuration
  const [adminRules, setAdminRules] = useState(() => {
    const saved = localStorage.getItem('sikh_street_admin_rules');
    return saved ? JSON.parse(saved) : {
      commissionRate: 5.0, // 5%
      coinMultiplier: 1.0,  // 1x reward multiplier
      vendorApprovals: [
        { id: 1, name: 'Delhi Divinity Loom', category: 'Turbans', country: 'India', status: 'pending', email: 'loom@delhidivinity.com', docName: 'business_cert.pdf', bankAccount: 'IN-8930482048' },
        { id: 2, name: 'Sikh Pride Apparel', category: 'Apparel', country: 'Canada', status: 'pending', email: 'pride@sikhapparel.ca', docName: 'canada_tax_reg.pdf', bankAccount: 'CA-9023482049' }
      ]
    };
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('sikh_street_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sikh_street_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sikh_street_coins', coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('sikh_street_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
<<<<<<< HEAD
    localStorage.setItem('sikh_street_vendors', JSON.stringify(vendors));
  }, [vendors]);

  useEffect(() => {
    localStorage.setItem('sikh_street_selected_vendor', selectedVendor);
  }, [selectedVendor]);

  useEffect(() => {
    localStorage.setItem('sikh_street_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('sikh_street_payouts', JSON.stringify(vendorPayouts));
  }, [vendorPayouts]);

  useEffect(() => {
    localStorage.setItem('sikh_street_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('sikh_street_admin_rules', JSON.stringify(adminRules));
  }, [adminRules]);
=======
    if (user) {
      localStorage.setItem('sikh_street_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sikh_street_user');
    }
  }, [user]);
>>>>>>> 4d565ac711f54cdc854fea580dd553d4a616309f

  // Dynamic router setter helper
  const setRoute = (tab, productId = null) => {
    setActiveTab(tab);
    if (productId !== null) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    
    // Gamification bonus: Earn coins on adding items or shopping
    const earned = Math.round(product.price * adminRules.coinMultiplier * 2);
    setCoins((prev) => prev + earned);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Rewards Actions
  const spendCoins = (amount) => {
    if (coins >= amount) {
      setCoins((prev) => prev - amount);
      return true;
    }
    return false;
  };

  const claimCoupon = (couponCode, coinCost) => {
    if (coins >= coinCost) {
      setCoins((prev) => prev - coinCost);
      setCoupons((prev) => [...prev, couponCode]);
      return true;
    }
    return false;
  };

  // Auth actions
  const login = (email, password) => {
    // Mock login logic
    const mockUser = {
      id: Date.now(),
      name: email.split('@')[0],
      email,
      role: email.includes('vendor') ? 'vendor' : (email.includes('admin') ? 'admin' : 'customer')
    };
    setUser(mockUser);
    setUserRole(mockUser.role);
    setRoute(mockUser.role === 'vendor' ? 'vendor' : (mockUser.role === 'admin' ? 'admin' : 'home'));
    return true;
  };

  const signup = (name, email, password, isVendor) => {
    // Mock signup logic
    const mockUser = {
      id: Date.now(),
      name,
      email,
      role: isVendor ? 'vendor' : 'customer'
    };
    setUser(mockUser);
    setUserRole(mockUser.role);
    setRoute(mockUser.role === 'vendor' ? 'vendor' : 'home');
    return true;
  };

  const logout = () => {
    setUser(null);
    setUserRole('customer');
    setRoute('home');
  };

  // Vendor actions
  const addVendorProduct = (newProduct) => {
    setProducts((prev) => {
      const nextId = prev.length > 0 ? Math.max(...prev.map((p) => p.id)) + 1 : 1;
      return [...prev, { ...newProduct, id: nextId, rating: 5.0 }];
    });
  };

  const updateVendorProduct = (productId, updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => p.id === productId ? { ...p, ...updatedProduct } : p)
    );
  };

  const deleteVendorProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const quickUpdateStock = (productId, newStock) => {
    setProducts((prev) =>
      prev.map((p) => p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p)
    );
  };

  const addVendorRegistrationRequest = (req) => {
    setAdminRules((prev) => {
      const nextId = prev.vendorApprovals.length > 0 ? Math.max(...prev.vendorApprovals.map((v) => v.id)) + 1 : 1;
      return {
        ...prev,
        vendorApprovals: [...prev.vendorApprovals, { ...req, id: nextId, status: 'pending' }]
      };
    });
  };

  // Admin Actions
  const approveVendorRequest = (id) => {
    let approvedName = '';
    setAdminRules((prev) => {
      const updated = prev.vendorApprovals.map((v) => {
        if (v.id === id) {
          approvedName = v.name;
          return { ...v, status: 'approved' };
        }
        return v;
      });
      return {
        ...prev,
        vendorApprovals: updated,
      };
    });

    if (approvedName) {
      setVendors((prev) => {
        if (prev.includes(approvedName)) return prev;
        return [...prev, approvedName];
      });
    }
  };

  // Order processing actions
  const updateOrderStatus = (orderId, nextStatus) => {
    setOrders((prev) =>
      prev.map((o) => o.id === orderId ? { ...o, status: nextStatus } : o)
    );
  };

  // Payout actions
  const requestPayout = (vendorName, amount) => {
    setVendorPayouts((prev) => {
      const nextId = `PO-${Date.now().toString().slice(-4)}`;
      return [
        ...prev,
        {
          id: nextId,
          vendor: vendorName,
          amount,
          date: new Date().toISOString().split('T')[0],
          status: 'Processing'
        }
      ];
    });
  };

  // Send Direct Message action
  const sendDirectMessage = (sender, senderName, receiver, text) => {
    setMessages((prev) => {
      const nextId = prev.length > 0 ? Math.max(...prev.map((m) => m.id)) + 1 : 1;
      return [
        ...prev,
        {
          id: nextId,
          sender,
          senderName,
          receiver,
          text,
          timestamp: new Date().toISOString(),
          isRead: false
        }
      ];
    });
  };

  // Currency Converter helper
  const convertPrice = (priceInUSD) => {
    const rate = conversionRates[currency] || 1.0;
    const converted = priceInUSD * rate;
    const symbol = currencySymbols[currency] || '$';
    return `${symbol}${converted.toFixed(2)}`;
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        selectedProductId,
        setRoute,
        products,
        setProducts,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        user,
        login,
        signup,
        logout,
        userRole,
        setUserRole,
        currency,
        setCurrency,
        currencySymbols,
        convertPrice,
        coins,
        setCoins,
        coupons,
        setCoupons,
        spinAvailable,
        setSpinAvailable,
        adminRules,
        setAdminRules,
        claimCoupon,
        addVendorProduct,
        updateVendorProduct,
        deleteVendorProduct,
        quickUpdateStock,
        approveVendorRequest,
        conversionRates,
        vendors,
        setVendors,
        selectedVendor,
        setSelectedVendor,
        orders,
        setOrders,
        updateOrderStatus,
        vendorPayouts,
        requestPayout,
        messages,
        sendDirectMessage,
        addVendorRegistrationRequest,
        activeChatVendor,
        setActiveChatVendor,
        isRegisteredSeller,
        setIsRegisteredSeller,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

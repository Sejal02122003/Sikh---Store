import React, { useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIHelper from './components/AIHelper';
import CustomerChatDrawer from './components/CustomerChatDrawer';

import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Rewards from './pages/Rewards';
import VendorDashboard from './pages/VendorDashboard';
import InventoryManagement from './pages/InventoryManagement';
import AdminPanel from './pages/AdminPanel';
import VendorRegistration from './pages/VendorRegistration';

import './App.css';

const AppContent = () => {
  const { activeTab } = useContext(AppContext);

  // Simple and fast state-based tab routing
  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'catalog':
        return <Catalog />;
      case 'product-details':
        return <ProductDetails />;
      case 'cart':
        return <Cart />;
      case 'rewards':
        return <Rewards />;
      case 'vendor':
        return <VendorDashboard />;
      case 'vendor-inventory':
        return <InventoryManagement />;
      case 'admin':
        return <AdminPanel />;
      case 'vendor-register':
        return <VendorRegistration />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-container">
      {/* Dynamic top header bar */}
      <Navbar />

      {/* Target route container */}
      <main className="main-content">
        {renderActiveView()}
      </main>

      {/* Global footer branding & details */}
      <Footer />

      {/* AI Floating Assistant Chatbot (Seva AI) */}
      <AIHelper />

      {/* Customer Floating direct messaging portal */}
      <CustomerChatDrawer />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;

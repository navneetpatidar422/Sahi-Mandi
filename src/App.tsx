import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AuthModal from './components/auth/AuthModal';

import Home from './pages/Home';
import MandiDiscovery from './pages/MandiDiscovery';
import MandiDetails from './pages/MandiDetails';
import SmartAnalyzer from './pages/SmartAnalyzer';
import FarmerDashboard from './pages/FarmerDashboard';
import Admin from './pages/Admin';

import type { FarmerProfile } from './types';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLoginSuccess = (profile: FarmerProfile) => {
    setFarmerProfile(profile);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFarmerProfile(null);
  };

  const handleProfileUpdate = (profile: FarmerProfile) => {
    setFarmerProfile(profile);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header
          isLoggedIn={isLoggedIn}
          farmerProfile={farmerProfile}
          onLoginClick={() => setShowAuthModal(true)}
          onLogout={handleLogout}
        />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onLoginClick={() => setShowAuthModal(true)}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route path="/mandis" element={<MandiDiscovery />} />
            <Route path="/mandis/:id" element={<MandiDetails />} />
            <Route
              path="/analyzer"
              element={
                <SmartAnalyzer
                  isLoggedIn={isLoggedIn}
                  farmerProfile={farmerProfile}
                  onLoginClick={() => setShowAuthModal(true)}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <FarmerDashboard
                  farmerProfile={farmerProfile}
                  isLoggedIn={isLoggedIn}
                  onProfileUpdate={handleProfileUpdate}
                  onLogout={handleLogout}
                />
              }
            />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <Footer />

        {showAuthModal && (
          <AuthModal
            onClose={() => setShowAuthModal(false)}
            onSuccess={handleLoginSuccess}
          />
        )}

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: '12px',
              fontFamily: 'Poppins, sans-serif',
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}

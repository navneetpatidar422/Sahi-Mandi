import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Settings, TrendingUp, LogOut, Bell, Globe, Type, Mic, HelpCircle, Save } from 'lucide-react';
import { toast } from 'sonner';
import { CROPS, MANDIS, CURRENT_PRICES } from '../lib/mockData';
import type { FarmerProfile } from '../types';

interface FarmerDashboardProps {
  farmerProfile: FarmerProfile | null;
  isLoggedIn: boolean;
  onProfileUpdate: (profile: FarmerProfile) => void;
  onLogout: () => void;
}

type TabId = 'overview' | 'profile' | 'settings';

export default function FarmerDashboard({ farmerProfile, isLoggedIn, onProfileUpdate, onLogout }: FarmerDashboardProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [editProfile, setEditProfile] = useState<FarmerProfile | null>(farmerProfile);
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const [textSize, setTextSize] = useState('medium');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  if (!isLoggedIn || !farmerProfile) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">🌾</div>
        <h2 className="text-2xl font-bold mb-3">Please Login to View Dashboard</h2>
        <p className="text-gray-500 mb-6">Your personalized farmer dashboard awaits you.</p>
        <button onClick={() => navigate('/')} className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium">
          Go to Home
        </button>
      </div>
    );
  }

  const farmerCrops = CROPS.filter((c) => farmerProfile.crops.includes(c.id));

  const cropOpportunities = farmerCrops.map((crop) => {
    const mandiData = MANDIS.map((m) => ({
      mandi: m,
      price: CURRENT_PRICES[m.id]?.[crop.id] || 0,
    })).filter((x) => x.price > 0).sort((a, b) => b.price - a.price);

    return {
      crop,
      bestMandi: mandiData[0]?.mandi,
      bestPrice: mandiData[0]?.price || 0,
      worstPrice: mandiData[mandiData.length - 1]?.price || 0,
    };
  });

  const handleSaveProfile = () => {
    if (editProfile) {
      onProfileUpdate(editProfile);
      toast.success('Profile updated successfully!');
    }
  };

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp size={16} /> },
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={16} /> },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome bar */}
      <div className="hero-gradient rounded-2xl p-6 text-white mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-green-200 text-sm mb-1">नमस्ते 🙏</p>
          <h1 className="text-2xl font-bold">{farmerProfile.name}</h1>
          <p className="text-green-200 text-sm mt-1 flex items-center gap-1">
            <MapPin size={12} /> {farmerProfile.village}, {farmerProfile.district}, {farmerProfile.state}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="text-green-200 text-xs">Crops: {farmerCrops.length}</div>
          <div className="text-green-200 text-xs">{farmerProfile.phone}</div>
          {farmerProfile.farmSize && (
            <div className="text-green-200 text-xs">Farm: {farmerProfile.farmSize}</div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div>
            <h2 className="font-bold text-gray-900 mb-4 text-lg">Today's Crop Opportunities</h2>
            {cropOpportunities.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>No crops selected. Update your profile to see recommendations.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cropOpportunities.map(({ crop, bestMandi, bestPrice, worstPrice }) => {
                  const gain = bestPrice - worstPrice;
                  return (
                    <div key={crop.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 card-hover">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{crop.emoji}</span>
                          <div>
                            <div className="font-bold text-gray-900 text-sm">{crop.name}</div>
                            <div className="text-xs text-gray-400">{crop.nameHindi}</div>
                          </div>
                        </div>
                        <div className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full font-medium">
                          {crop.category}
                        </div>
                      </div>
                      <div className="bg-green-50 rounded-xl p-3 mb-3">
                        <div className="text-xs text-gray-500 mb-1">Best price today</div>
                        <div className="text-xl font-bold text-green-600">₹{bestPrice.toLocaleString('en-IN')}<span className="text-sm font-normal text-gray-400">/qtl</span></div>
                        {bestMandi && (
                          <div className="text-xs text-gray-500 mt-1">at {bestMandi.name}</div>
                        )}
                      </div>
                      {gain > 0 && (
                        <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-lg mb-3">
                          Save ₹{gain.toLocaleString('en-IN')}/qtl vs lowest mandi
                        </div>
                      )}
                      <button
                        onClick={() => navigate('/analyzer')}
                        className="w-full py-2 rounded-xl text-xs font-medium bg-gray-50 text-gray-600 hover:bg-green-600 hover:text-white transition-colors"
                      >
                        Analyze →
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div>
            <h2 className="font-bold text-gray-900 mb-4 text-lg">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: '🗺️', label: 'Find Mandis', action: () => navigate('/mandis') },
                { icon: '🧠', label: 'Smart Analyzer', action: () => navigate('/analyzer') },
                { icon: '📞', label: 'Kisan Helpline', action: () => window.open('tel:1800-180-1551') },
                { icon: '📰', label: 'Market News', action: () => {} },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:border-green-300 hover:shadow transition-all card-hover"
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-xs font-medium text-gray-600">{item.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && editProfile && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-lg mb-4">Edit Profile</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={editProfile.name}
                onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                value={editProfile.phone}
                readOnly
                className="w-full px-4 py-3 border border-gray-100 rounded-xl text-sm bg-gray-50 text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                value={editProfile.state}
                onChange={(e) => setEditProfile({ ...editProfile, state: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
              <input
                type="text"
                value={editProfile.district}
                onChange={(e) => setEditProfile({ ...editProfile, district: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Village</label>
              <input
                type="text"
                value={editProfile.village}
                onChange={(e) => setEditProfile({ ...editProfile, village: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
              <input
                type="text"
                value={editProfile.pincode}
                onChange={(e) => setEditProfile({ ...editProfile, pincode: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Farm Size</label>
            <select
              value={editProfile.farmSize || ''}
              onChange={(e) => setEditProfile({ ...editProfile, farmSize: e.target.value })}
              className="w-full sm:w-1/2 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="">Select farm size</option>
              {['< 1 acre', '1–2 acres', '2–5 acres', '5–10 acres', '10–25 acres', '25+ acres'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">My Crops</label>
            <div className="flex flex-wrap gap-2">
              {CROPS.map((crop) => {
                const selected = editProfile.crops.includes(crop.id);
                return (
                  <button
                    key={crop.id}
                    onClick={() => {
                      const crops = selected
                        ? editProfile.crops.filter((c) => c !== crop.id)
                        : [...editProfile.crops, crop.id];
                      setEditProfile({ ...editProfile, crops });
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                      selected ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-200 text-gray-500 hover:border-green-300'
                    }`}
                  >
                    {crop.emoji} {crop.name}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleSaveProfile}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-medium text-sm hover:bg-green-700 transition-colors"
          >
            <Save size={16} /> Save Changes
          </button>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-4">
          {/* Language */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Globe size={18} className="text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">Language</div>
                  <div className="text-xs text-gray-400">Select your preferred language</div>
                </div>
              </div>
              <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
                {(['EN', 'HI'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      lang === l ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    {l === 'EN' ? '🇬🇧 English' : '🇮🇳 हिंदी'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Text size */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Type size={18} className="text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">Text Size</div>
                  <div className="text-xs text-gray-400">Adjust reading comfort</div>
                </div>
              </div>
              <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
                {['small', 'medium', 'large'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setTextSize(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                      textSize === s ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    {s.charAt(0).toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Voice assistance */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                  <Mic size={18} className="text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">Voice Assistance</div>
                  <div className="text-xs text-gray-400">Read out prices and information</div>
                </div>
              </div>
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`w-12 h-6 rounded-full transition-all ${voiceEnabled ? 'bg-green-500' : 'bg-gray-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-all mx-0.5 ${voiceEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Bell size={18} className="text-orange-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">Price Notifications</div>
                  <div className="text-xs text-gray-400">Get alerts when prices change</div>
                </div>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-12 h-6 rounded-full transition-all ${notificationsEnabled ? 'bg-green-500' : 'bg-gray-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-all mx-0.5 ${notificationsEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          {/* Help */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
                <HelpCircle size={18} className="text-yellow-600" />
              </div>
              <div>
                <div className="font-medium text-gray-800">Help & Support</div>
                <div className="text-xs text-gray-400">Kisan Helpline: 1800-180-1551</div>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href="tel:1800-180-1551"
                className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-green-50 text-green-600 hover:bg-green-100 transition-colors text-center"
              >
                📞 Call Helpline
              </a>
              <button className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                💬 WhatsApp Support
              </button>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              onLogout();
              navigate('/');
              toast.success('Logged out successfully');
            }}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-red-50 text-red-600 font-semibold text-sm hover:bg-red-600 hover:text-white transition-all border border-red-100"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}

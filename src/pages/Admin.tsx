import { useState } from 'react';
import { Lock, BarChart2, TrendingUp, Users, DollarSign, Package, Edit3, Save } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { CROPS, CURRENT_PRICES } from '../lib/mockData';

const WEEKLY_DATA = [
  { day: 'Mon', transactions: 145, revenue: 2850000 },
  { day: 'Tue', transactions: 132, revenue: 2650000 },
  { day: 'Wed', transactions: 168, revenue: 3200000 },
  { day: 'Thu', transactions: 155, revenue: 2980000 },
  { day: 'Fri', transactions: 178, revenue: 3400000 },
  { day: 'Sat', transactions: 210, revenue: 4100000 },
  { day: 'Sun', transactions: 90, revenue: 1800000 },
];

const POPULAR_CROPS_DATA = [
  { name: 'Onion', sales: 450 },
  { name: 'Tomato', sales: 380 },
  { name: 'Wheat', sales: 320 },
  { name: 'Potato', sales: 290 },
  { name: 'Rice', sales: 250 },
  { name: 'Cotton', sales: 180 },
];

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [editingPrices, setEditingPrices] = useState<Record<string, number>>({});
  const [isEditing, setIsEditing] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Use admin / admin123');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock size={28} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Portal</h2>
            <p className="text-gray-500 text-sm mt-1">Mandi management dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="admin123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {loginError && (
              <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-xl">{loginError}</p>
            )}
            <p className="text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-xl">
              Demo credentials: <strong>admin</strong> / <strong>admin123</strong>
            </p>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Today's Transactions", value: '210', change: '+12%', icon: BarChart2, color: 'text-blue-600 bg-blue-50' },
    { label: 'Revenue Today', value: '₹41L', change: '+8%', icon: DollarSign, color: 'text-green-600 bg-green-50' },
    { label: 'Active Farmers', value: '1,284', change: '+5%', icon: Users, color: 'text-purple-600 bg-purple-50' },
    { label: 'Total Listings', value: '3,450', change: '+3%', icon: Package, color: 'text-orange-600 bg-orange-50' },
  ];

  const azadpurPrices = { ...CURRENT_PRICES['azadpur'], ...editingPrices };

  const handlePriceEdit = (cropId: string, value: string) => {
    const num = parseInt(value);
    if (!isNaN(num)) {
      setEditingPrices((prev) => ({ ...prev, [cropId]: num }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Azadpur Mandi — Management Portal</p>
        </div>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="px-4 py-2 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors flex items-center gap-2"
        >
          <Lock size={14} /> Logout
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon size={18} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{s.value}</div>
            <div className="text-xs text-gray-400">{s.label}</div>
            <div className="text-xs text-green-600 font-medium mt-1">{s.change} vs yesterday</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly transactions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-blue-600" /> Weekly Transactions
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={WEEKLY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="transactions" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Popular crops */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Package size={16} className="text-green-600" /> Popular Crops This Week
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={POPULAR_CROPS_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="sales" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue area chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign size={16} className="text-green-600" /> Weekly Revenue (₹)
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={WEEKLY_DATA}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
            <Tooltip formatter={(v: number) => [`₹${(v / 100000).toFixed(2)}L`, 'Revenue']} />
            <Area type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} fill="url(#revenueGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Price management table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <Edit3 size={16} className="text-green-600" /> Price Management — Azadpur Mandi
          </h3>
          <button
            onClick={() => {
              if (isEditing) {
                setIsEditing(false);
                alert('Prices updated successfully! (Demo mode — changes not persisted)');
              } else {
                setIsEditing(true);
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              isEditing
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isEditing ? <><Save size={14} /> Save Prices</> : <><Edit3 size={14} /> Edit Prices</>}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-5 py-3">Crop</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Current Price (₹/qtl)</th>
                {isEditing && <th className="px-5 py-3">New Price</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {CROPS.map((crop) => {
                const price = azadpurPrices[crop.id] || 0;
                return (
                  <tr key={crop.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 flex items-center gap-2 text-sm font-medium text-gray-800">
                      <span>{crop.emoji}</span> {crop.name}
                    </td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs">{crop.category}</span>
                    </td>
                    <td className="px-5 py-3 font-bold text-green-600 text-sm">₹{price.toLocaleString('en-IN')}</td>
                    {isEditing && (
                      <td className="px-5 py-3">
                        <input
                          type="number"
                          defaultValue={price}
                          onChange={(e) => handlePriceEdit(crop.id, e.target.value)}
                          className="w-28 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

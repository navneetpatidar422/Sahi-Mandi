import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, TrendingUp, Award, Navigation, ChevronDown, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CROPS, MANDIS, CURRENT_PRICES, TRUST_SCORES, PRICE_HISTORY } from '../lib/mockData';
import TrustScoreBadge from '../components/ui/TrustScoreBadge';
import type { FarmerProfile } from '../types';

interface SmartAnalyzerProps {
  isLoggedIn: boolean;
  farmerProfile: FarmerProfile | null;
  onLoginClick: () => void;
}

const CHART_COLORS = ['#16a34a', '#2563eb', '#ea580c', '#7c3aed', '#0891b2'];

export default function SmartAnalyzer({ isLoggedIn, farmerProfile, onLoginClick }: SmartAnalyzerProps) {
  const navigate = useNavigate();
  const [selectedCrop, setSelectedCrop] = useState('wheat');

  if (!isLoggedIn) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Smart Analyzer</h2>
          <p className="text-gray-500 mb-2">
            Get AI-powered mandi recommendations and price analysis tailored to your crops.
          </p>
          <p className="text-green-600 font-medium mb-6">Please login to access this feature</p>
          <div className="grid grid-cols-1 gap-3 mb-8 text-left">
            {[
              '🎯 Best mandi recommendation for your crops',
              '📊 7-day price trend analysis',
              '💰 Cost breakdown with net profit estimate',
              '🚗 Drive time and transport cost calculator',
            ].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2.5 rounded-xl">{f}</div>
            ))}
          </div>
          <button
            onClick={onLoginClick}
            className="w-full py-3.5 rounded-2xl bg-green-600 text-white font-bold text-base hover:bg-green-700 transition-colors"
          >
            Login / Register to Access
          </button>
        </div>
      </div>
    );
  }

  const crop = CROPS.find((c) => c.id === selectedCrop)!;

  // Sort mandis by price for selected crop
  const mandiRankings = MANDIS.map((mandi) => ({
    mandi,
    price: CURRENT_PRICES[mandi.id]?.[selectedCrop] || 0,
    trustScore: TRUST_SCORES[mandi.id] || 80,
  }))
    .filter((m) => m.price > 0)
    .sort((a, b) => b.price - a.price);

  const getBadge = (index: number, item: typeof mandiRankings[0]) => {
    if (index === 0) return { label: 'BEST PRICE', color: 'bg-green-600 text-white' };
    if (item.mandi.distance === Math.min(...MANDIS.map((m) => m.distance)))
      return { label: 'NEAREST', color: 'bg-blue-600 text-white' };
    if (item.trustScore === Math.max(...Object.values(TRUST_SCORES)))
      return { label: 'TOP RATED', color: 'bg-yellow-500 text-white' };
    return null;
  };

  // Price history data for chart
  const chartData = PRICE_HISTORY.map((entry) => ({
    date: entry.date,
    ...Object.fromEntries(
      mandiRankings.slice(0, 3).map((m) => [m.mandi.name.split(' ')[0], (entry[m.mandi.id] as number) || 0])
    ),
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Analyzer 🧠</h1>
        <p className="text-gray-500">
          Namaste, <strong className="text-green-600">{farmerProfile?.name}</strong>! Here's your personalized mandi recommendation.
        </p>
      </div>

      {/* Crop selector */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Crop to Analyze</label>
        <div className="relative max-w-xs">
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full appearance-none pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
          >
            {CROPS.map((c) => (
              <option key={c.id} value={c.id}>{c.emoji} {c.name} ({c.nameHindi})</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Mandi rankings */}
      <div className="space-y-4 mb-8">
        <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
          <TrendingUp size={18} className="text-green-600" />
          Best Mandis for {crop.emoji} {crop.name}
        </h2>
        {mandiRankings.map((item, index) => {
          const badge = getBadge(index, item);
          const transportCost = Math.round(item.mandi.distance * 15);
          const loadingCost = 50;
          const netProfit = item.price - transportCost - loadingCost;

          const reasons = [];
          if (index === 0) reasons.push('Highest price in the market today');
          if (item.trustScore >= 90) reasons.push('Excellent trust score & verified');
          if (item.mandi.distance < 15) reasons.push('Very close to you — saves transport cost');
          if (item.mandi.rating >= 4.5) reasons.push('Highly rated by other farmers');
          if (item.mandi.paymentMethods.includes('UPI')) reasons.push('Accepts UPI for instant payment');

          return (
            <div
              key={item.mandi.id}
              className={`bg-white rounded-2xl border shadow-sm p-5 ${index === 0 ? 'border-green-300 ring-2 ring-green-100' : 'border-gray-100'}`}
            >
              <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    #{index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{item.mandi.name}</h3>
                    <p className="text-xs text-gray-400">{item.mandi.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {badge && (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${badge.color}`}>
                      {badge.label}
                    </span>
                  )}
                  <TrustScoreBadge score={item.trustScore} size="sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-500 mb-1">Market Price</div>
                  <div className="font-bold text-green-600">₹{item.price.toLocaleString('en-IN')}</div>
                  <div className="text-xs text-gray-400">/quintal</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-500 mb-1">Transport Est.</div>
                  <div className="font-bold text-orange-600">-₹{transportCost}</div>
                  <div className="text-xs text-gray-400">{item.mandi.distance}km</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-500 mb-1">Loading Charge</div>
                  <div className="font-bold text-gray-600">-₹{loadingCost}</div>
                  <div className="text-xs text-gray-400">per qtl</div>
                </div>
                <div className={`rounded-xl p-3 text-center ${netProfit > 0 ? 'bg-blue-50' : 'bg-red-50'}`}>
                  <div className="text-xs text-gray-500 mb-1">Net Profit</div>
                  <div className={`font-bold ${netProfit > 0 ? 'text-blue-600' : 'text-red-600'}`}>
                    ₹{netProfit.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-gray-400">est./qtl</div>
                </div>
              </div>

              {/* Trust score bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">Trust Score</span>
                  <span className="font-medium text-gray-700">{item.trustScore}/100</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${item.trustScore}%` }} />
                </div>
              </div>

              {/* Why choose this */}
              {reasons.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-1 text-xs font-medium text-gray-500 mb-2">
                    <Info size={12} /> Why choose this mandi:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {reasons.map((r) => (
                      <span key={r} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs">✓ {r}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <Navigation size={12} />
                <span>{item.mandi.distance} km · ~{Math.ceil(item.mandi.distance * 2)} min drive</span>
              </div>

              <button
                onClick={() => navigate(`/mandis/${item.mandi.id}`)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
              >
                View Mandi Details →
              </button>
            </div>
          );
        })}
      </div>

      {/* 7-day price chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
          <Award size={18} className="text-green-600" />
          7-Day Price Trend: {crop.emoji} {crop.name}
        </h2>
        <p className="text-xs text-gray-400 mb-5">Prices per quintal (₹) across top 3 mandis</p>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${v}`} width={65} />
            <Tooltip formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, '']} />
            <Legend />
            {mandiRankings.slice(0, 3).map((item, i) => (
              <Line
                key={item.mandi.id}
                type="monotone"
                dataKey={item.mandi.name.split(' ')[0]}
                stroke={CHART_COLORS[i]}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Star, MapPin, TrendingUp, Shield, Bell, BarChart2, CheckCircle2, Users } from 'lucide-react';
import { useState } from 'react';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import ImageWithFallback from '../components/ui/ImageWithFallback';
import TrustScoreBadge from '../components/ui/TrustScoreBadge';
import { MANDIS, TRUST_SCORES, CURRENT_PRICES, CROPS } from '../lib/mockData';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

interface HomeProps {
  onLoginClick: () => void;
  isLoggedIn: boolean;
}

export default function Home({ onLoginClick, isLoggedIn }: HomeProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const featuredMandis = MANDIS.slice(0, 4);

  const features = [
    { icon: BarChart2, title: 'Smart Price Comparison', desc: 'Compare live prices across 500+ mandis instantly. Never undersell again.', color: 'text-blue-600 bg-blue-50' },
    { icon: Shield, title: 'Trusted Mandis', desc: 'Every mandi verified with trust scores, reviews, and facility ratings.', color: 'text-green-600 bg-green-50' },
    { icon: Bell, title: 'Real-time Updates', desc: 'Get price alerts for your crops. Know when the right time to sell is.', color: 'text-orange-600 bg-orange-50' },
    { icon: TrendingUp, title: 'Personalized Insights', desc: 'AI-powered recommendations based on your crops, location and market trends.', color: 'text-purple-600 bg-purple-50' },
  ];

  const steps = [
    { step: '1', title: 'Register', desc: 'Create your farmer profile in under 2 minutes. Select your crops and location.', icon: '📝' },
    { step: '2', title: 'Compare', desc: 'View and compare live prices across mandis near you. Filter by distance and crop.', icon: '📊' },
    { step: '3', title: 'Sell Smart', desc: 'Choose the best mandi with our Smart Analyzer and maximize your profit.', icon: '💰' },
  ];

  const testimonials = [
    { name: 'रामेश्वर दयाल', village: 'Mathura, UP', crop: 'Wheat Farmer', text: 'पहले मुझे नहीं पता था कि अलग-अलग मंडियों में भाव कितना अलग होता है। सही Mandi की वजह से मैं ₹200/quintal ज़्यादा कमा रहा हूँ।', stars: 5 },
    { name: 'Kavita Devi', village: 'Nasik, Maharashtra', crop: 'Onion Farmer', text: 'This app helped me find Lasalgaon mandi where onion prices were ₹300 more than my local mandi. Saved my whole season!', stars: 5 },
    { name: 'Gurpreet Singh', village: 'Ludhiana, Punjab', crop: 'Rice Farmer', text: 'Bahut achhi app hai. Price compare karna bahut easy ho gaya. Trust score feature se pata chalta hai kaunsi mandi reliable hai.', stars: 5 },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/mandis?q=${search}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              Live prices updated every hour
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-bold leading-tight mb-4">
              <span className="text-yellow-300">सही दाम,</span><br />
              <span>सही मंडी 🌾</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-green-100 font-medium mb-2">
              Apni fasal ka sahi daam paayein
            </motion.p>
            <motion.p variants={fadeUp} className="text-lg text-green-200 mb-8">
              Compare prices across 500+ mandis · Find trusted buyers · Maximize your profit
            </motion.p>

            <motion.form variants={fadeUp} onSubmit={handleSearch} className="flex gap-2 mb-6">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search mandi by name or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-white text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-yellow-400 text-gray-900 font-semibold text-sm hover:bg-yellow-300 transition-colors whitespace-nowrap flex items-center gap-2"
              >
                Search <ArrowRight size={16} />
              </button>
            </motion.form>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/mandis')}
                className="px-6 py-3 rounded-xl bg-white text-green-700 font-semibold text-sm hover:bg-green-50 transition-colors"
              >
                Explore Mandis
              </button>
              {!isLoggedIn && (
                <button
                  onClick={onLoginClick}
                  className="px-6 py-3 rounded-xl border-2 border-white/50 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
                >
                  Register Free →
                </button>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Crop price ticker */}
        <div className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-2 overflow-hidden">
          <div className="flex gap-8 animate-[marquee_30s_linear_infinite] whitespace-nowrap px-4">
            {CROPS.slice(0, 12).map((crop) => {
              const price = CURRENT_PRICES['azadpur'][crop.id];
              return (
                <span key={crop.id} className="text-sm text-white/80">
                  {crop.emoji} {crop.name}: <strong className="text-yellow-300">₹{price?.toLocaleString('en-IN')}</strong>/qtl
                </span>
              );
            })}
            {CROPS.slice(0, 12).map((crop) => {
              const price = CURRENT_PRICES['azadpur'][crop.id];
              return (
                <span key={`dup-${crop.id}`} className="text-sm text-white/80">
                  {crop.emoji} {crop.name}: <strong className="text-yellow-300">₹{price?.toLocaleString('en-IN')}</strong>/qtl
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Mandis Listed', target: 5000, suffix: '+' },
              { label: 'Crops Tracked', target: 500, suffix: '+' },
              { label: 'States Covered', target: 28, suffix: '' },
              { label: 'Farmers Served', target: 1000000, suffix: '+', prefix: '' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-1">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="text-green-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Why Choose <span className="text-green-600">सही Mandi?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 max-w-2xl mx-auto">
            We empower Indian farmers with technology to get the best prices for their crops.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                <f.icon size={22} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              कैसे काम करता है?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500">Simple steps to maximize your crop earnings</motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {steps.map((s, i) => (
              <motion.div key={s.step} variants={fadeUp} className="text-center relative">
                <div className="text-5xl mb-4">{s.icon}</div>
                <div className="w-10 h-10 rounded-full bg-green-600 text-white font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 right-0 w-1/2 border-t-2 border-dashed border-green-300" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Mandis */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">Featured Mandis</h2>
            <p className="text-gray-500">Top-rated agricultural markets near you</p>
          </div>
          <button
            onClick={() => navigate('/mandis')}
            className="hidden sm:flex items-center gap-2 text-green-600 font-medium hover:text-green-700"
          >
            View All <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMandis.map((mandi) => {
            const topCrops = ['onion', 'tomato', 'potato'].map((cropId) => ({
              crop: CROPS.find((c) => c.id === cropId)!,
              price: CURRENT_PRICES[mandi.id]?.[cropId] || 0,
            }));
            return (
              <motion.div
                key={mandi.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover group"
              >
                <div className="relative h-40 overflow-hidden">
                  <ImageWithFallback
                    src={mandi.image}
                    alt={mandi.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <TrustScoreBadge score={TRUST_SCORES[mandi.id]} size="sm" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1 truncate">{mandi.name}</h3>
                  <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
                    <MapPin size={12} />
                    <span className="truncate">{mandi.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-medium">{mandi.rating}</span>
                    </div>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{mandi.distance} km away</span>
                  </div>
                  <div className="space-y-1 mb-3">
                    {topCrops.map(({ crop, price }) => (
                      <div key={crop.id} className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{crop.emoji} {crop.name}</span>
                        <span className="font-semibold text-green-600">₹{price.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate(`/mandis/${mandi.id}`)}
                    className="w-full py-2 rounded-xl bg-green-50 text-green-700 text-sm font-medium hover:bg-green-600 hover:text-white transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <button onClick={() => navigate('/mandis')} className="text-green-600 font-medium flex items-center gap-1 mx-auto">
            View All Mandis <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Farmers Love Us ❤️</h2>
            <p className="text-gray-500">Real stories from real farmers across India</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex mb-3">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.village} · {t.crop}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {!isLoggedIn && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="hero-gradient rounded-3xl p-10 text-white"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                आज ही जुड़ें — यह बिल्कुल मुफ़्त है!
              </h2>
              <p className="text-green-100 text-lg mb-8">
                Join 10 lakh+ farmers who are getting better prices with Sahi Mandi
              </p>
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                {['Free to use', 'No commission', 'Works on any phone', 'Hindi & English support'].map((f) => (
                  <div key={f} className="flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full text-sm">
                    <CheckCircle2 size={14} className="text-green-300" />
                    {f}
                  </div>
                ))}
              </div>
              <button
                onClick={onLoginClick}
                className="px-8 py-4 rounded-2xl bg-yellow-400 text-gray-900 font-bold text-lg hover:bg-yellow-300 transition-colors shadow-lg flex items-center gap-2 mx-auto"
              >
                <Users size={20} /> Register as Farmer — Free!
              </button>
            </motion.div>
          </div>
        </section>
      )}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

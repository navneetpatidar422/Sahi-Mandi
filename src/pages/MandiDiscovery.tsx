import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, MapPin, Star, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { MANDIS, TRUST_SCORES, CURRENT_PRICES, CROPS } from '../lib/mockData';
import TrustScoreBadge from '../components/ui/TrustScoreBadge';
import ImageWithFallback from '../components/ui/ImageWithFallback';

type SortOption = 'distance' | 'rating' | 'name' | 'trust';

export default function MandiDiscovery() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [distFilter, setDistFilter] = useState<'all' | '10' | '25' | '50'>('all');
  const [ratingFilter, setRatingFilter] = useState<'all' | '4' | '3'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('distance');

  const filtered = useMemo(() => {
    let result = [...MANDIS];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) => m.name.toLowerCase().includes(q) || m.location.toLowerCase().includes(q) || m.state.toLowerCase().includes(q)
      );
    }

    if (distFilter !== 'all') {
      const maxDist = parseInt(distFilter);
      result = result.filter((m) => m.distance <= maxDist);
    }

    if (ratingFilter !== 'all') {
      const minRating = parseFloat(ratingFilter);
      result = result.filter((m) => m.rating >= minRating);
    }

    result.sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'trust') return (TRUST_SCORES[b.id] || 0) - (TRUST_SCORES[a.id] || 0);
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [search, distFilter, ratingFilter, sortBy]);

  const topCropIds = ['onion', 'tomato', 'potato', 'wheat', 'rice'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Mandi 🗺️</h1>
        <p className="text-gray-500">Discover {MANDIS.length} verified agricultural markets across India</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 space-y-4">
        {/* Search bar */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by mandi name, city, or state..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {/* Distance filter */}
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-500">Distance:</span>
            {(['all', '10', '25', '50'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDistFilter(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  distFilter === d ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {d === 'all' ? 'All' : `<${d}km`}
              </button>
            ))}
          </div>

          {/* Rating filter */}
          <div className="flex items-center gap-2">
            <Star size={14} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-500">Rating:</span>
            {(['all', '4', '3'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRatingFilter(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  ratingFilter === r ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {r === 'all' ? 'All' : `${r}+★`}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 ml-auto">
            <SlidersHorizontal size={14} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-500">Sort:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none pl-3 pr-7 py-1.5 border border-gray-200 rounded-lg text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
              >
                <option value="distance">Distance</option>
                <option value="rating">Rating</option>
                <option value="trust">Trust Score</option>
                <option value="name">Name</option>
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing <strong className="text-gray-800">{filtered.length}</strong> mandis
      </p>

      {/* Mandi grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No mandis found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((mandi, i) => {
            const topCrops = topCropIds.slice(0, 3).map((cropId) => ({
              crop: CROPS.find((c) => c.id === cropId)!,
              price: CURRENT_PRICES[mandi.id]?.[cropId] || 0,
            })).filter((x) => x.crop);

            return (
              <motion.div
                key={mandi.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover group"
              >
                <div className="relative h-44 overflow-hidden">
                  <ImageWithFallback
                    src={mandi.image}
                    alt={mandi.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <TrustScoreBadge score={TRUST_SCORES[mandi.id]} size="sm" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                    {mandi.distance} km away
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">{mandi.name}</h3>
                      <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                        <MapPin size={11} />
                        <span>{mandi.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star size={13} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold text-gray-700">{mandi.rating}</span>
                      <span className="text-xs text-gray-400">({mandi.reviews})</span>
                    </div>
                  </div>

                  {/* Top crop prices */}
                  <div className="bg-gray-50 rounded-xl p-3 mb-3 space-y-1.5">
                    {topCrops.map(({ crop, price }) => (
                      <div key={crop.id} className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{crop.emoji} {crop.name}</span>
                        <span className="font-bold text-green-600">₹{price.toLocaleString('en-IN')}<span className="font-normal text-gray-400">/qtl</span></span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/mandis/${mandi.id}`)}
                      className="flex-1 py-2.5 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => window.open(`tel:${mandi.phone}`)}
                      className="p-2.5 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-colors text-sm"
                      title="Call Mandi"
                    >
                      📞
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

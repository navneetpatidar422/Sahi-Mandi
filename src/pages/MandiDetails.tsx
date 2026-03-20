import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Phone, Navigation, Clock, CreditCard, Award, MessageSquare } from 'lucide-react';
import { MANDIS, TRUST_SCORES, CURRENT_PRICES, CROPS, REVIEWS, PRICE_CHANGE_PERCENT } from '../lib/mockData';
import TrustScoreBadge from '../components/ui/TrustScoreBadge';
import PriceChangeIndicator from '../components/ui/PriceChangeIndicator';
import ImageWithFallback from '../components/ui/ImageWithFallback';

type TabId = 'overview' | 'prices' | 'reviews' | 'location';

export default function MandiDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const mandi = MANDIS.find((m) => m.id === id);

  if (!mandi) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold mb-2">Mandi Not Found</h2>
        <p className="text-gray-500 mb-6">The mandi you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/mandis')} className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700">
          Back to Mandis
        </button>
      </div>
    );
  }

  const trustScore = TRUST_SCORES[mandi.id] || 80;
  const prices = CURRENT_PRICES[mandi.id] || {};
  const changes = PRICE_CHANGE_PERCENT[mandi.id] || {};
  const mandiReviews = REVIEWS.filter((r) => r.mandiId === mandi.id);

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <Award size={16} /> },
    { id: 'prices', label: 'Prices', icon: <Star size={16} /> },
    { id: 'reviews', label: `Reviews (${mandiReviews.length})`, icon: <MessageSquare size={16} /> },
    { id: 'location', label: 'Location', icon: <MapPin size={16} /> },
  ];

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = mandiReviews.filter((r) => r.rating === stars).length;
    return { stars, count, pct: mandiReviews.length > 0 ? (count / mandiReviews.length) * 100 : 0 };
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Back button */}
      <button
        onClick={() => navigate('/mandis')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back to Mandis</span>
      </button>

      {/* Hero */}
      <div className="relative h-52 sm:h-72 rounded-2xl overflow-hidden mb-6">
        <ImageWithFallback
          src={mandi.image}
          alt={mandi.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{mandi.name}</h1>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <MapPin size={14} />
                <span>{mandi.location}</span>
                <span>·</span>
                <span>{mandi.distance} km away</span>
              </div>
            </div>
            <TrustScoreBadge score={trustScore} size="md" />
          </div>
        </div>
      </div>

      {/* Quick action buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <a
          href={`tel:${mandi.phone}`}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white font-medium text-sm hover:bg-green-700 transition-colors"
        >
          <Phone size={16} /> Call Mandi
        </a>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(mandi.address)}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors"
        >
          <Navigation size={16} /> Get Directions
        </a>
        <div className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-yellow-50 text-yellow-700 text-sm font-medium">
          <Star size={15} className="fill-yellow-400 text-yellow-400" />
          {mandi.rating} · {mandi.reviews} reviews
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
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

      {/* Tab content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <Clock size={16} />
                <span className="text-sm font-medium">Operating Hours</span>
              </div>
              <p className="text-gray-800 font-semibold text-sm">{mandi.operatingHours}</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <Phone size={16} />
                <span className="text-sm font-medium">Phone</span>
              </div>
              <a href={`tel:${mandi.phone}`} className="text-green-600 font-semibold text-sm hover:underline">{mandi.phone}</a>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <CreditCard size={16} />
                <span className="text-sm font-medium">Payment Methods</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {mandi.paymentMethods.map((pm) => (
                  <span key={pm} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">{pm}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3">Facilities Available</h3>
            <div className="flex flex-wrap gap-2">
              {mandi.facilities.map((f) => (
                <span key={f} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-xl text-sm font-medium border border-green-100">
                  ✓ {f}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2">Address</h3>
            <p className="text-gray-600 text-sm">{mandi.address}</p>
          </div>

          {/* Trust score visualization */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3">Trust Score Breakdown</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl font-bold text-green-600">{trustScore}</div>
              <div>
                <TrustScoreBadge score={trustScore} size="md" />
                <p className="text-xs text-gray-400 mt-1">Based on farmer reviews & verified data</p>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-700"
                style={{ width: `${trustScore}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'prices' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <span className="font-semibold text-gray-700 text-sm">Crop Prices at {mandi.name}</span>
            <span className="text-xs text-gray-400">Updated just now</span>
          </div>
          <div className="divide-y divide-gray-50">
            {CROPS.map((crop) => {
              const price = prices[crop.id];
              const change = changes[crop.id] ?? 0;
              if (!price) return null;
              return (
                <div key={crop.id} className="flex items-center px-5 py-3 hover:bg-gray-50 transition-colors">
                  <span className="text-xl mr-3">{crop.emoji}</span>
                  <div className="flex-1">
                    <span className="font-medium text-gray-800 text-sm">{crop.name}</span>
                    <span className="text-xs text-gray-400 ml-2">({crop.nameHindi})</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">₹{price.toLocaleString('en-IN')}<span className="text-xs font-normal text-gray-400">/qtl</span></div>
                    <PriceChangeIndicator percent={change} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="space-y-6">
          {/* Rating summary */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex gap-6 items-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900">{mandi.rating}</div>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(mandi.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
                  ))}
                </div>
                <div className="text-xs text-gray-400 mt-1">{mandi.reviews} reviews</div>
              </div>
              <div className="flex-1 space-y-1.5">
                {ratingDistribution.map(({ stars, pct }) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-3">{stars}</span>
                    <Star size={11} className="text-yellow-400 fill-yellow-400" />
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-gray-400 w-8">{pct.toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Individual reviews */}
          <div className="space-y-4">
            {mandiReviews.length === 0 ? (
              <div className="text-center py-8 text-gray-400">No reviews yet for this mandi.</div>
            ) : (
              mandiReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">
                        {review.farmerName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{review.farmerName}</div>
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <MapPin size={10} /> {review.village}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">{review.date}</div>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'location' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin size={16} className="text-green-600" /> Address
            </h3>
            <p className="text-gray-600 mb-4">{mandi.address}</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="text-sm font-semibold text-gray-800">{mandi.distance} km</div>
                <div className="text-xs text-gray-500">Distance</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="text-sm font-semibold text-gray-800">~{Math.ceil(mandi.distance * 2)} min</div>
                <div className="text-xs text-gray-500">Drive time</div>
              </div>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(mandi.address)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors"
            >
              <Navigation size={16} /> Open in Google Maps
            </a>
          </div>

          {/* Map placeholder */}
          <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center border border-gray-200">
            <div className="text-center text-gray-400">
              <MapPin size={40} className="mx-auto mb-2 text-gray-300" />
              <p className="text-sm">Map view requires Google Maps API</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(mandi.address)}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 text-xs hover:underline mt-1 block"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

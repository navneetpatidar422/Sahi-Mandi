import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Phone, Shield, User, MapPin, Wheat, ChevronLeft, Check } from 'lucide-react';
import { toast } from 'sonner';
import type { FarmerProfile } from '../../types';
import { CROPS, INDIAN_STATES } from '../../lib/mockData';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (profile: FarmerProfile) => void;
}

export default function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [profile, setProfile] = useState<Partial<FarmerProfile>>({
    name: '', phone: '', state: '', district: '', pincode: '', village: '', crops: [],
  });

  useEffect(() => {
    if (step === 2) {
      setCountdown(60);
      setCanResend(false);
      const timer = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) { clearInterval(timer); setCanResend(true); return 0; }
          return c - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step]);

  const handleSendOtp = () => {
    if (phone.length !== 10) { toast.error('Please enter a valid 10-digit phone number'); return; }
    setProfile((p) => ({ ...p, phone: `+91${phone}` }));
    setStep(2);
    toast.success('OTP sent to +91' + phone);
  };

  const handleVerifyOtp = () => {
    if (otp !== '123456') { toast.error('Invalid OTP. Use 123456 for demo.'); return; }
    setStep(3);
  };

  const handleStep3 = () => {
    if (!profile.name || profile.name.length < 2) { toast.error('Please enter your name'); return; }
    setStep(4);
  };

  const handleStep4 = () => {
    if (!profile.state) { toast.error('Please select your state'); return; }
    if (!profile.district) { toast.error('Please enter your district'); return; }
    if (!profile.pincode || profile.pincode.length !== 6) { toast.error('Please enter a valid 6-digit pincode'); return; }
    if (!profile.village) { toast.error('Please enter your village'); return; }
    setStep(5);
  };

  const handleComplete = () => {
    if (!profile.crops || profile.crops.length === 0) { toast.error('Please select at least one crop'); return; }
    const finalProfile: FarmerProfile = {
      name: profile.name!,
      phone: profile.phone!,
      age: profile.age,
      gender: profile.gender,
      state: profile.state!,
      district: profile.district!,
      pincode: profile.pincode!,
      village: profile.village!,
      farmSize: profile.farmSize,
      crops: profile.crops!,
    };
    onSuccess(finalProfile);
    onClose();
    navigate('/dashboard');
    toast.success('Welcome to Sahi Mandi! 🌾', { description: `Namaste, ${finalProfile.name}!` });
  };

  const toggleCrop = (cropId: string) => {
    setProfile((p) => {
      const crops = p.crops || [];
      return {
        ...p,
        crops: crops.includes(cropId) ? crops.filter((c) => c !== cropId) : [...crops, cropId],
      };
    });
  };

  const TOTAL_STEPS = 5;
  const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  const stepIcons = [Phone, Shield, User, MapPin, Wheat];
  const stepLabels = ['Phone', 'OTP', 'Personal', 'Location', 'Crops'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl p-5 border-b border-gray-100 z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {step > 1 && (
                <button onClick={() => setStep(step - 1)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                  <ChevronLeft size={18} />
                </button>
              )}
              <h2 className="text-lg font-bold text-gray-900">
                {['Enter Phone', 'Verify OTP', 'Personal Info', 'Location', 'Select Crops'][step - 1]}
              </h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400">
              <X size={20} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
            <div
              className="bg-green-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step indicators */}
          <div className="flex justify-between">
            {stepIcons.map((Icon, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                  i + 1 < step ? 'bg-green-600 text-white' :
                  i + 1 === step ? 'bg-green-100 text-green-700 ring-2 ring-green-600' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {i + 1 < step ? <Check size={14} /> : <Icon size={14} />}
                </div>
                <span className={`text-xs ${i + 1 === step ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
                  {stepLabels[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5">
          {/* Step 1: Phone */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">Enter your mobile number to receive an OTP</p>
              <div className="flex gap-2">
                <div className="px-3 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium text-sm flex items-center">+91</div>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  maxLength={10}
                />
              </div>
              <button
                onClick={handleSendOtp}
                disabled={phone.length !== 10}
                className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send OTP
              </button>
            </div>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">Enter the 6-digit OTP sent to <strong>+91{phone}</strong></p>
              <p className="text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">Demo OTP: <strong>123456</strong></p>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-center text-2xl font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500"
                maxLength={6}
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  {canResend ? '' : `Resend in ${countdown}s`}
                </span>
                {canResend && (
                  <button onClick={() => { setStep(2); toast.success('OTP resent!'); }} className="text-green-600 font-medium hover:underline">
                    Resend OTP
                  </button>
                )}
              </div>
              <button
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6}
                className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-40"
              >
                Verify OTP
              </button>
            </div>
          )}

          {/* Step 3: Personal Info */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={profile.name || ''}
                  onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <select
                  value={profile.age || ''}
                  onChange={(e) => setProfile((p) => ({ ...p, age: e.target.value ? parseInt(e.target.value) : undefined }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                >
                  <option value="">Select age</option>
                  {Array.from({ length: 63 }, (_, i) => i + 18).map((age) => (
                    <option key={age} value={age}>{age} years</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <div className="flex gap-3">
                  {['Male', 'Female', 'Other'].map((g) => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={profile.gender === g}
                        onChange={(e) => setProfile((p) => ({ ...p, gender: e.target.value }))}
                        className="w-4 h-4 accent-green-600"
                      />
                      <span className="text-sm text-gray-700">{g}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                onClick={handleStep3}
                className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 4: Location */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                <select
                  value={profile.state || ''}
                  onChange={(e) => setProfile((p) => ({ ...p, state: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                >
                  <option value="">Select state</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                <input
                  type="text"
                  placeholder="Your district"
                  value={profile.district || ''}
                  onChange={(e) => setProfile((p) => ({ ...p, district: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                <input
                  type="text"
                  placeholder="6-digit pincode"
                  value={profile.pincode || ''}
                  onChange={(e) => setProfile((p) => ({ ...p, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  maxLength={6}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Village / Town *</label>
                <input
                  type="text"
                  placeholder="Your village or town"
                  value={profile.village || ''}
                  onChange={(e) => setProfile((p) => ({ ...p, village: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Farm Size (optional)</label>
                <select
                  value={profile.farmSize || ''}
                  onChange={(e) => setProfile((p) => ({ ...p, farmSize: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                >
                  <option value="">Select farm size</option>
                  {['< 1 acre', '1–2 acres', '2–5 acres', '5–10 acres', '10–25 acres', '25+ acres'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleStep4}
                className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 5: Crops */}
          {step === 5 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">Select all crops you grow (select at least one)</p>
              <div className="grid grid-cols-3 gap-2 max-h-72 overflow-y-auto pr-1">
                {CROPS.map((crop) => {
                  const selected = profile.crops?.includes(crop.id) || false;
                  return (
                    <button
                      key={crop.id}
                      onClick={() => toggleCrop(crop.id)}
                      className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border-2 transition-all text-xs font-medium ${
                        selected
                          ? 'border-green-600 bg-green-50 text-green-700'
                          : 'border-gray-100 bg-white text-gray-600 hover:border-green-300'
                      }`}
                    >
                      <span className="text-xl">{crop.emoji}</span>
                      <span className="text-center leading-tight">{crop.nameHindi}</span>
                      {selected && <Check size={12} className="text-green-600" />}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-gray-400 text-center">
                {profile.crops?.length || 0} crop(s) selected
              </p>
              <button
                onClick={handleComplete}
                disabled={!profile.crops || profile.crops.length === 0}
                className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-40"
              >
                Complete Registration 🌾
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

# 🌾 सही Mandi — मोल से मंज़िल तक...

> **Sahi Mandi** — From Price to Prosperity
>
> भारत की सबसे भरोसेमंद मंडी भाव पोर्टल | India's Most Trusted Agricultural Marketplace

---

## 📖 About / परिचय

**सही Mandi** is a comprehensive React-based agricultural marketplace platform designed to empower Indian farmers by helping them make informed decisions about **where and when to sell their crops for maximum profit**.

किसानों को सही मंडी चुनने, फसल के भाव जानने और अधिक मुनाफा कमाने में मदद करने के लिए बनाया गया एक आधुनिक डिजिटल मंच।

---

## ✨ Features / विशेषताएं

- 🔍 **Smart Price Comparison** — Compare crop prices across 10+ major Indian mandis
- 🗺️ **Mandi Discovery** — Find mandis near you with ratings, facilities & contact info
- 📊 **Smart Analyzer** — 7-day price history charts, cost breakdowns & profitability analysis
- 👨‍🌾 **Farmer Dashboard** — Personalized crop recommendations & profile management
- 🛡️ **Trust Scores** — Algorithmic trust ratings for each mandi
- 🔔 **Real-time Updates** — Live price indicators with ↑↓ change tracking
- 🌐 **Bilingual** — Full Hindi + English support throughout
- 📱 **Mobile-First** — Optimized for rural smartphone users
- 🔐 **5-Step Registration** — Phone OTP → Profile → Location → Crop selection
- 🛠️ **Admin Portal** — Mandi administrators can manage prices & view analytics

---

## 🚀 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18+ | UI Framework |
| TypeScript | 5.7 | Type Safety |
| Vite | 6.x | Build Tool |
| Tailwind CSS | v4 | Styling |
| Recharts | 2.x | Charts & Analytics |
| Lucide React | 0.469 | Icons |
| React Router | v6 | Client-side Routing |
| Framer Motion | 11.x | Animations |
| Sonner | 1.x | Toast Notifications |
| React Hook Form + Zod | Latest | Form Handling |

---

## 📁 Folder Structure

```
Sahi-Mandi/
├── index.html
├── package.json
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── vite.config.ts
├── public/
│   └── favicon.svg
└── src/
    ├── App.tsx                    # Root component, routing, auth state
    ├── main.tsx                   # Entry point
    ├── index.css                  # Global styles + Tailwind v4
    ├── types/
    │   └── index.ts               # TypeScript interfaces
    ├── lib/
    │   └── mockData.ts            # 25 crops, 10 mandis, prices, reviews
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx         # Sticky nav with auth state
    │   │   └── Footer.tsx         # Links, contact, social icons
    │   ├── auth/
    │   │   └── AuthModal.tsx      # 5-step registration wizard
    │   └── ui/
    │       ├── AnimatedCounter.tsx
    │       ├── TrustScoreBadge.tsx
    │       ├── PriceChangeIndicator.tsx
    │       └── ImageWithFallback.tsx
    └── pages/
        ├── Home.tsx               # Landing page
        ├── MandiDiscovery.tsx     # Browse & filter mandis
        ├── MandiDetails.tsx       # Individual mandi with 4 tabs
        ├── SmartAnalyzer.tsx      # Price comparison & charts
        ├── FarmerDashboard.tsx    # User hub (protected)
        └── Admin.tsx              # Mandi admin portal
```

---

## ⚙️ Setup & Run

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/navneetpatidar422/Sahi-Mandi.git
cd Sahi-Mandi

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔑 Demo Credentials

| Role | Credential |
|---|---|
| Farmer Login | Any 10-digit phone → OTP: **123456** |
| Admin Login | Username: **admin** / Password: **admin123** |

---

## 📸 Screenshots

> *Screenshots coming soon*

| Home Page | Mandi Discovery | Smart Analyzer |
|---|---|---|
| 🏡 Hero + Features | 🗺️ Search & Filter | 📊 Price Charts |

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License — Free to use, modify, and distribute.

---

## 🙏 Acknowledgements

- Real mandi data inspired by [Agmarknet](https://agmarknet.gov.in/) — India's official agricultural marketing information network
- Prices are **indicative** and for demonstration purposes only. Actual prices may vary.

---

<div align="center">
  <strong>Made with ❤️ for Indian Farmers | भारतीय किसानों के लिए ❤️ से बनाया</strong>
  <br><br>
  🌾 सही Mandi — मोल से मंज़िल तक...
</div>

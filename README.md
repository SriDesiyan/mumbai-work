# M-Pulse: Mumbai Health Command System

> **AI-Driven Smart Hospital Platform for Outbreak Prediction & Resource Management**

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://lovable.dev/projects/d96c63e9-f825-43e9-8418-8ba5e61bdc5d)
[![Built with React](https://img.shields.io/badge/built%20with-React-61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC)](https://www.typescriptlang.org/)

**M-Pulse** is a comprehensive, AI-powered civic technology platform designed to predict disease outbreaks, optimize hospital resource allocation, and issue real-time public health advisories for Mumbai. Built for the **Mumbai Hacks Round 2** hackathon, it combines environmental data, hospital metrics, and machine learning to create a living command center for the city's healthcare infrastructure.

---

## 🎯 System Overview

M-Pulse operates as an intelligent health command system with four interconnected modules:

### 🔹 **1. Data Aggregator**
Collects and processes real-time civic data:
- **Rainfall levels** → Predicts waterborne disease risk (leptospirosis, dengue)
- **Air Quality Index (AQI)** → Forecasts respiratory illness surges
- **Event density** → Anticipates trauma cases from crowd gatherings
- **Historical patterns** → Leverages seasonal outbreak data

### 🔹 **2. Outbreak Forecaster**
AI-powered prediction engine that:
- Generates 7-day disease outbreak forecasts
- Provides confidence scores for each prediction
- Analyzes correlations between environmental factors and disease patterns
- Exports detailed reports for stakeholders

### 🔹 **3. Logistics Coordinator (Hospital Command Center)**
Resource management dashboard featuring:
- Real-time bed availability across 5 major hospitals
- Doctor deployment tracking
- AI-based resource allocation recommendations
- Alert level monitoring (Low/Moderate/High)
- Interactive Mumbai map with hospital locations

### 🔹 **4. Public Alert System**
Citizen-facing advisory platform with:
- Multilingual support (English, Hindi, Marathi)
- Ward-specific health alerts
- Preventive measure guidelines
- Emergency contact information
- SMS/notification simulation

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     M-Pulse Frontend                         │
│                 (React + TypeScript + Vite)                  │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐     │
│  │  Dashboard  │  │  Hospitals   │  │  Forecaster   │     │
│  │    Page     │  │   Command    │  │   (AI ML)     │     │
│  └─────────────┘  └──────────────┘  └───────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐    │
│  │  Advisories  │  │  Admin Auth  │  │  AI Assistant │    │
│  │   (i18n)     │  │   (Login)    │  │   Sidebar     │    │
│  └──────────────┘  └──────────────┘  └───────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │    Mock Data Layer (Simulated APIs)   │
        │  • Hospital metrics                   │
        │  • Civic data (rainfall, AQI, events) │
        │  • Outbreak predictions               │
        │  • Public advisories                  │
        └───────────────────────────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │      Visualization & Mapping           │
        │  • Mapbox (interactive Mumbai map)    │
        │  • Recharts (analytics & forecasts)   │
        │  • Framer Motion (animations)         │
        └───────────────────────────────────────┘
```

---

## 🔄 Data Flow

### 1️⃣ **Data Collection & Aggregation**
```typescript
generateCivicData() → {
  rainfall: number,      // mm in last 24h
  aqi: number,          // Air Quality Index
  eventDensity: enum,   // Low/Moderate/High
  predictedOutbreak: string,
  confidence: number,   // 0-100%
  riskLevel: enum       // low/moderate/high
}
```

### 2️⃣ **Risk Assessment Logic**
```
IF rainfall > 100mm → High risk of Leptospirosis (85-100% confidence)
IF aqi > 200 → High risk of Respiratory Issues (75-95% confidence)
IF eventDensity = High → Moderate trauma risk (70-85% confidence)
ELSE → Calculate baseline risk from historical data
```

### 3️⃣ **Hospital Resource Allocation**
```
Auto-Allocate Algorithm:
1. Identify hospitals with >80% occupancy → HIGH alert
2. Identify hospitals with <40% occupancy → LOW alert
3. Calculate optimal doctor/bed distribution
4. Generate resource transfer recommendations
5. Trigger notifications to hospital administrators
```

### 4️⃣ **Public Advisory Generation**
```
Advisory Priority:
HIGH → Waterborne/respiratory outbreaks with >80% confidence
MODERATE → Seasonal disease warnings, event-related alerts
LOW → General health guidelines, preventive tips

Distribution Channels:
- SMS to affected wards
- In-app notifications
- WhatsApp broadcasts
- Multilingual support (EN/HI/MR)
```

---

## 🎨 Design System

M-Pulse uses a **semantic token-based design system** with a professional civic-tech aesthetic:

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `hsl(217, 91%, 40%)` | Deep blue for trust & authority |
| `--secondary` | `hsl(187, 85%, 45%)` | Teal for healthcare tech |
| `--success` | `hsl(142, 71%, 45%)` | Green for low risk |
| `--warning` | `hsl(38, 92%, 50%)` | Orange for moderate risk |
| `--destructive` | `hsl(0, 84%, 60%)` | Red for high risk alerts |

### Gradients
- `--gradient-primary`: Blue to teal (135deg)
- `--gradient-hero`: Dynamic blue gradient for hero sections
- `--gradient-card`: Subtle surface gradient for depth

### Animations
- `fade-in`: Smooth entry animations (0.5s)
- `slide-up`: Content reveal effect (0.6s)
- `pulse-glow`: Alert indicator animation (2s loop)

---

## 🚀 Features

### ✅ Fully Functional Components
- [x] **Interactive Mumbai Map** with hospital markers (Mapbox)
- [x] **Real-time Data Refresh** with simulated API calls
- [x] **AI Outbreak Forecaster** with 7-day predictions
- [x] **Hospital Command Table** with resource allocation
- [x] **Public Advisory System** with i18n support
- [x] **Admin Authentication** with mock login
- [x] **AI Assistant Sidebar** for queries
- [x] **Dark Mode Toggle** with smooth transitions
- [x] **Responsive Design** for mobile/tablet/desktop
- [x] **Data Export** (JSON download for forecasts)

### 🔐 Security Features
- Input sanitization on all forms
- Mock JWT authentication flow
- HTTPS-ready configuration
- Rate limiting simulation
- Error handling with user-friendly messages

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + TypeScript | Component-based UI |
| **Styling** | Tailwind CSS + shadcn/ui | Design system |
| **Animations** | Framer Motion | Smooth transitions |
| **Charts** | Recharts | Data visualization |
| **Maps** | Mapbox GL JS | Interactive geospatial data |
| **Routing** | React Router v6 | SPA navigation |
| **State** | React Query | Data fetching & caching |
| **Build** | Vite | Fast development server |
| **Deployment** | Lovable/Vercel | Instant deployment |

---

## 🎯 Getting Started

### Prerequisites
- **Node.js** 18+ and **npm** (or Bun/Yarn)
- **Mapbox API Key** (get free at [mapbox.com](https://mapbox.com))

### Installation

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd m-pulse
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:8080
```

### Mapbox Configuration
When you first open the app, you'll be prompted to enter your Mapbox public token. Get one at:
- https://account.mapbox.com/access-tokens/

---

## 🎮 Usage Guide

### Dashboard
- View real-time civic metrics (rainfall, AQI, event density)
- Monitor risk forecast with confidence meter
- Click "Update Data" to simulate fresh data ingestion
- Explore interactive Mumbai map with hospital locations

### Hospital Command Center
- Review bed availability and doctor deployment
- Click "Auto-Allocate Resources" for AI recommendations
- View detailed hospital information in modal
- Analyze capacity trends with bar charts

### Outbreak Forecaster
- Click "Run Forecast" to generate 7-day predictions
- Review AI confidence scores for each disease
- Download JSON report via "Export Report" button
- Understand methodology in the info section

### Public Advisories
- Switch languages (EN/HI/MR) with language toggle
- Click "Send Alert" to simulate SMS/notification
- Review preventive guidelines and emergency contacts

### AI Assistant
- Click chat icon in header to open sidebar
- Ask queries like:
  - "Predict dengue risk next week"
  - "Show hospitals with high trauma load"
  - "What's the leptospirosis forecast?"
- Receive simulated AI responses based on keywords

### Admin Login
- Navigate to `/login` route
- Demo credentials:
  - **Email**: admin@mpulse.gov.in
  - **Password**: demo123

---

## 📊 Mock Data Structure

### Hospital Schema
```typescript
interface Hospital {
  id: string;
  name: string;
  ward: string;
  bedsAvailable: number;
  totalBeds: number;
  doctorsOnDuty: number;
  alertLevel: 'low' | 'moderate' | 'high';
  coordinates: [longitude, latitude];
}
```

### Civic Data Schema
```typescript
interface CivicData {
  rainfall: number;        // 0-150 mm
  aqi: number;            // 50-350
  eventDensity: 'Low' | 'Moderate' | 'High';
  predictedOutbreak: string;
  confidence: number;     // 0-100%
  riskLevel: 'low' | 'moderate' | 'high';
}
```

### Outbreak Prediction Schema
```typescript
interface OutbreakPrediction {
  date: string;           // ISO date
  disease: string;
  cases: number;          // 20-120
  confidence: number;     // 70-100%
}
```

---

## 🌍 Deployment

### Lovable Platform (Recommended)
1. Click **Publish** in Lovable editor
2. Your app is live instantly at `yourapp.lovable.app`
3. Configure custom domain in Settings → Domains

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

---

## 🔮 Future Enhancements

- [ ] Real backend API integration (Supabase/Firebase)
- [ ] Actual AI/ML model training on historical health data
- [ ] Live WhatsApp/SMS gateway integration
- [ ] Real-time WebSocket updates for hospital metrics
- [ ] Predictive modeling with TensorFlow.js
- [ ] Integration with BMC (Brihanmumbai Municipal Corporation) APIs
- [ ] Advanced geospatial analytics with heatmaps
- [ ] Mobile app (React Native)
- [ ] PWA support for offline access

---

## 👥 Contributing

Built for **Mumbai Hacks Round 2** as a demonstration of full-stack civic tech capabilities. The codebase is designed to be:
- **Modular**: Easy to add new hospital or ward data
- **Extensible**: Mock APIs can be replaced with real backends
- **Educational**: Clear code structure for learning React/TypeScript

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 🙏 Acknowledgments

- **Lovable** - For the amazing full-stack development platform
- **shadcn/ui** - For beautiful accessible components
- **Mapbox** - For geospatial mapping capabilities
- **Mumbai Hacks** - For inspiring civic technology innovation

---

## 📞 Contact

For questions, feedback, or collaboration:
- **Project URL**: [https://lovable.dev/projects/d96c63e9-f825-43e9-8418-8ba5e61bdc5d](https://lovable.dev/projects/d96c63e9-f825-43e9-8418-8ba5e61bdc5d)
- **Demo Credentials**: admin@mpulse.gov.in / demo123

---

<div align="center">
  <strong>🚀 M-Pulse: Where Technology Meets Healthcare for a Healthier Mumbai 🏥</strong>
</div>

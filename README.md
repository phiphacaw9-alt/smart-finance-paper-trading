# Smart Finance Paper Trading Bot

## 🚀 Professional Bot Trading System

A production-ready automated trading system with paper trading, backtesting, real-time analytics, and risk management.

### Key Features

✅ **Paper Trading** - Practice with virtual balance before live trading  
✅ **Real-time Monitoring** - WebSocket connections for live price updates  
✅ **Backtesting Engine** - Historical analysis with equity curves  
✅ **Risk Management** - Stop-loss, take-profit, trailing stops, drawdown limits  
✅ **Multi-Exchange** - Support for Binance, Coinbase, Kraken via CCXT  
✅ **Terminal UI** - Retro-tech glassmorphism dashboard  
✅ **Advanced Analytics** - Performance metrics, trade history, logs  
✅ **Notifications** - Toast, email, optional Telegram/Discord  
✅ **Secure** - JWT auth, encrypted secrets, RLS database policies  
✅ **Scalable** - Docker deployment, CI/CD with GitHub Actions  

---

## 📋 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14, React 18, Tailwind CSS |
| **Backend API** | Next.js API Routes, Node.js |
| **Trading Engine** | CCXT, WebSocket, Custom signals |
| **Database** | Supabase (PostgreSQL) |
| **Charts** | Lightweight Charts |
| **Worker** | Node.js process, message queue |
| **Deployment** | Docker, GitHub Actions, VPS |

---

## 📁 Project Structure

```
.
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/          # Authentication pages
│   │   ├── (dashboard)/     # Protected dashboard pages
│   │   ├── api/             # API routes
│   │   └── layout.tsx       # Root layout
│   ├── components/          # Reusable React components
│   │   ├── ui/              # Base UI (Button, Card, etc)
│   │   ├── dashboard/       # Dashboard components
│   │   └── charts/          # Trading charts
│   ├── lib/                 # Utilities & helpers
│   │   ├── supabase.ts      # Database client
│   │   ├── auth.ts          # Authentication logic
│   │   └── validators.ts    # Zod schemas
│   ├── services/            # Business logic
│   │   ├── exchange.ts      # CCXT integration
│   │   ├── strategy.ts      # Trading strategies
│   │   └── notification.ts  # Notifications
│   ├── hooks/               # React hooks
│   └── types/               # TypeScript types
├── worker/                  # Trading engine (Node.js process)
│   ├── index.ts             # Worker entry
│   ├── engine.ts            # Core trading logic
│   ├── backtest.ts          # Backtesting
│   └── signals.ts           # Signal generation
├── database/                # SQL migrations & seeds
│   ├── migrations/
│   └── seeds/
├── scripts/                 # Development utilities
├── public/                  # Static assets
├── .github/workflows/       # CI/CD pipelines
├── docker-compose.yml       # Local development
└── Dockerfile               # Production container
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Exchange API keys (optional for paper trading)

### Installation

```bash
# Clone and install
git clone https://github.com/phiphacaw9-alt/smart-finance-paper-trading.git
cd smart-finance-paper-trading
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Database setup
npm run db:migrate
npm run db:seed

# Start development
npm run dev          # Frontend on localhost:3000
npm run worker:dev   # Worker on localhost:3001 (in another terminal)
```

### Running Tests

```bash
npm run test
npm run test:watch
```

### Backtesting

```bash
npm run backtest -- --symbol BTC/USDT --from 2024-01-01 --to 2024-06-30
```

---

## 📚 Documentation

- [Architecture Overview](./docs/architecture.md)
- [API Reference](./docs/api.md)
- [Database Schema](./docs/database.md)
- [Trading Strategy Guide](./docs/strategies.md)
- [Deployment Guide](./docs/deployment.md)

---

## 🛣️ Roadmap

### Phase 1: MVP (Week 1-2)
- ✅ Project setup & folder structure
- ✅ Database schema
- ✅ Auth system (signup/login)
- ✅ Dashboard UI
- ⏳ Paper trading engine
- ⏳ Basic strategy

### Phase 2: Beta (Week 3-4)
- WebSocket real-time updates
- Backtesting engine
- Advanced risk management
- Trade history & analytics
- Email notifications

### Phase 3: Production (Week 5+)
- Live trading mode
- Multi-exchange support
- Telegram/Discord webhooks
- Advanced strategies
- Docker deployment
- CI/CD pipeline

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🤝 Contributing

Contributions welcome! Please follow our [Contributing Guidelines](./CONTRIBUTING.md)

---

**Made with ❤️ for traders worldwide**

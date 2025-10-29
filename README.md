# 🪙 Bitcoin Realtime Dashboard & AI Chatbot

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-green?logo=fastapi)
![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-blue?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/status-developing-orange)

> **A modern realtime Bitcoin analytics web app** powered by **FastAPI + Next.js**,  
> with **AI Chatbot (DeepSeek R1 / Gemini)** that can analyze charts, predict trends,  
> and explain market behavior in natural language.

---

## 📖 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Example Usage](#-example-usage)
- [Future Work](#-future-work)
- [Contributors](#-contributors)
- [License](#-license)

---

## 🌍 Overview
This project provides an **interactive Bitcoin dashboard** with realtime price charts,  
statistical indicators, and an integrated **AI chatbot** capable of:

- Explaining price movements and market volatility.
- Predicting short-term prices (15m / 1h / 24h).
- Processing uploaded images (e.g., chart screenshots) to extract insights.

It combines **data engineering**, **machine learning**, and **modern web development**  
to deliver a complete data-driven analytics experience.

---

## ✨ Features

| Module | Description |
|--------|-------------|
| 📈 **Multi-Symbol Dashboard** | Interactive charts for BTC, ETH, BNB, SOL, XRP with price, volume, and volatility metrics. |
| 📊 **Technical Indicators** | Moving averages (MA7, MA30), volume analysis, and 7-day volatility tracking. |
| 📈 **Realtime Charts** | Live Bitcoin price streaming from Binance/CoinGecko via WebSocket. |
| 📊 **Indicators** | RSI, MACD, volatility, sentiment, and Google Trends integration. |
| 🤖 **AI Chatbot** | DeepSeek R1 (Ollama) or Gemini API for natural-language Q&A and predictions. |
| 🖼️ **Image Upload & Vision** | Upload chart/news images for AI-based analysis (OCR & pattern recognition). |
| 🔮 **Forecast Models** | Naïve, EWMA, Prophet, ARIMA/SARIMAX, and LSTM/GRU models for prediction. |
| 🧠 **Data Pipeline** | Celery collectors fetch price, sentiment, and trend data into TimescaleDB. |
| 💾 **Persistent Storage** | Time-series data stored in TimescaleDB, cached in Redis for fast access. |
| 💬 **Chat History** | User sessions and chat logs (optional, for future analytics). |
| 📦 **Dockerized Deployment** | Fully containerized stack ready for Railway / Fly.io / VPS hosting. |

---

## 🏗️ Architecture

```plaintext
                    ┌───────────────────────────┐
                    │        FRONTEND           │
                    │  Next.js + Tailwind +     │
                    │  Recharts                 │
                    │  (Realtime Charts + UI)   │
                    └─────────────┬─────────────┘
                                  │ REST / WS
                                  ▼
           ┌─────────────────────────────────────────────┐
           │                BACKEND (FastAPI)            │
           │  - /api/chart-data  (REST)                  │
           │  - /ws/price        (WebSocket realtime)    │
           │  - /api/forecast    (ML models)             │
           │  - /api/chat        (LLM Gateway)           │
           │  - /api/upload-image (Vision stub)          │
           └──────────────────────┬──────────────────────┘
                                  │
               ┌──────────────────┼────────────────────┐
               ▼                  ▼                    ▼
        TimescaleDB           Redis Cache           Celery Workers
     (store OHLCV,        (short-term cache)      (collectors: Binance,
     sentiment, trends)                          News, Trends, Model jobs)
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js, React, TailwindCSS, Recharts |
| **Backend** | FastAPI (Python), WebSocket, Pydantic |
| **Database** | TimescaleDB (PostgreSQL Extension), Redis |
| **Background Jobs** | Celery + Celery Beat |
| **Machine Learning** | Prophet, ARIMA/SARIMAX, LSTM/GRU (PyTorch) |
| **LLM Integration** | DeepSeek R1 (Ollama) / Gemini API |
| **Deployment** | Docker Compose → Railway / Fly.io / VPS |
| **Version Control** | Git + GitHub Pages (for HTML prototypes) |

---

## 🧩 Installation

### 1️⃣ Clone repository
```bash
git clone https://github.com/<your-username>/btc-dashboard.git
cd btc-dashboard
```

### 2️⃣ Setup environment
Create `.env` (or `.env.local`) from `.env.example`:
```bash
POSTGRES_USER=postgres
POSTGRES_PASSWORD=1234
POSTGRES_DB=btcdb
REDIS_URL=redis://redis:6379/0
APP_ENV=development
GEMINI_API_KEY=your_key_here
OLLAMA_BASE_URL=http://localhost:11434
```

### 3️⃣ Quick Start - Multi-Symbol Dashboard

**Option A: Simple HTML Dashboard (No backend required)**
```bash
# Windows
start-server.bat

# Linux/Mac
chmod +x start-server.sh
./start-server.sh

# Or manually
python -m http.server 8000
```

Then open: **http://localhost:8000/frontend/dashboard.html**

This standalone dashboard reads data from `data/dataset_total_clean.csv` and displays:
- Interactive price charts with MA7 and MA30
- Volume analysis
- 7-day volatility metrics
- Summary statistics (current price, 7-day return, 30-day volatility)
- Support for BTC, ETH, BNB, SOL, XRP

### 4️⃣ Full Stack with Docker Compose
```bash
docker compose up --build
```
Services will start:
- Frontend → http://localhost:3000  
- Backend → http://localhost:8000/docs  
- Database → TimescaleDB + Redis

---

## 🗂️ Project Structure
```
/
 ├── data/
 │    ├── dataset_total_clean.csv  # Combined dataset for all symbols
 │    ├── BTC/
 │    ├── ETH/
 │    ├── BNB/
 │    ├── SOL/
 │    └── XRP/
 ├── frontend/
 │    ├── dashboard.html     # Multi-symbol interactive dashboard
 │    ├── index.html         # Home page
 │    ├── chart.html         # Chart page
 │    ├── chatbot.html       # AI Chatbot interface
 │    ├── forecast.html      # Forecast page
 │    └── assets/
 │         └── css/
 │              └── style.css
 ├── project/
 │    └── FULL_STACK.ipynb   # Jupyter notebook with analysis
 ├── start-server.bat        # Windows server startup script
 ├── start-server.sh         # Linux/Mac server startup script
 ├── backend/
 │    ├── src/
 │    │    ├── api/          # FastAPI routers (REST endpoints)
 │    │    ├── ws/           # WebSocket handlers
 │    │    ├── tasks/        # Celery tasks (collectors, forecasts)
 │    │    ├── models/       # SQLAlchemy & Pydantic models
 │    │    ├── services/     # Binance, CoinGecko, News, Trends (stubs)
 │    │    └── main.py       # FastAPI entrypoint
 │    └── requirements.txt
 ├── deploy/
 │    └── docker-compose.yml
 └── README.md
```

---

## 📡 API Endpoints

| Endpoint | Method | Description |
|-----------|---------|-------------|
| `/api/chart-data` | GET | Get Bitcoin OHLCV data (JSON) |
| `/ws/price` | WS | Realtime price stream |
| `/api/forecast` | POST | Predict future price using selected model |
| `/api/chat` | POST | Chatbot (DeepSeek / Gemini) |
| `/api/upload-image` | POST | Upload image for vision analysis |
| `/health` | GET | Health check |

---

## 💬 Example Usage

```bash
# Get chart data
curl http://localhost:8000/api/chart-data

# Request forecast
curl -X POST http://localhost:8000/api/forecast?horizon=1h
```

---

## 🧠 Future Work
- [ ] Integrate real Binance/CoinGecko/Trends APIs  
- [ ] Connect sentiment analysis (Reddit, NewsAPI)  
- [ ] Train LSTM/GRU model & store weights  
- [ ] Add user accounts & preferences  
- [ ] Enhance vision model (chart pattern recognition)  
- [ ] CI/CD via GitHub Actions + Railway auto deploy  

---

## 👥 Contributors
| Name | Role |
|------|------|
| **Ngọc Linh** | Project Owner, Full-Stack Developer |
| **AI Assistant (GPT-5)** | Architecture & Code Generation Support |

---

## 📄 License
This project is released under the **MIT License**.  
Feel free to fork, modify, and contribute.

---

> _“Turning Bitcoin data into insights — one chart at a time.”_ 🪩

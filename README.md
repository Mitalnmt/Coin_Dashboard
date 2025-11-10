# [📄 Report (.docx)](https://github.com/Mitalnmt/Coin_Dashboard/blob/43abbdecc0cba89a1b2b4264bee2ebc7572e0670/report/DAP391m%20Report.pdf)  
# [🎞️ Slide (.pptx)](https://github.com/Mitalnmt/Coin_Dashboard/blob/0bb71f2d67c22b291bb50c5f67e78133bbeed66e/report/DAP391m.pptx)  

---

# 🪙 BTC DASHBOARD – Cryptocurrency Analytics & AI Chatbot

![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python)
![Flask](https://img.shields.io/badge/Flask-3.0+-black?logo=flask)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-blue?logo=tailwindcss)
![Chart.js](https://img.shields.io/badge/Chart.js-4.0-orange?logo=chartdotjs)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/status-active-brightgreen)

> **A modern cryptocurrency analysis platform**  
> combining **Python + Flask backend** with **interactive HTML dashboard**,  
> powered by **real-time data visualization** and an **AI chatbot (LLaMA / Gemini)**.

---

## 📖 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Main Pages](#-main-pages)
- [AI Chatbot Backend](#-ai-chatbot-backend)
- [Future Work](#-future-work)
- [Contributors](#-contributors)
- [License](#-license)

---

## 🌍 Overview
**BTC Dashboard** là hệ thống **thu thập – xử lý – trực quan hóa dữ liệu tiền điện tử** (BTC, ETH, BNB, SOL, XRP),  
đồng thời tích hợp **AI Chatbot** có thể phân tích biểu đồ, chỉ số thị trường, và phản hồi bằng ngôn ngữ tự nhiên.

Dự án được xây dựng phục vụ **môn DAP391m – Data Analytics Project (UEH)**,  
với mục tiêu ứng dụng kỹ năng **Python, Data Pipeline, và Visualization** trong một sản phẩm thực tế.

---

## ✨ Features

| Module | Description |
|--------|-------------|
| 📈 **Multi-Coin Dashboard** | Hiển thị dữ liệu cho nhiều đồng (BTC, ETH, BNB, SOL, XRP). |
| 📊 **Auto Data Pipeline** | Tự động thu thập từ Binance, Blockchain.info, Alternative.me, Pytrends. |
| 📈 **Interactive Charts** | Biểu đồ giá, khối lượng, biến động, Fear & Greed, và Google Trends. |
| 🧠 **AI Chatbot Integration** | Phân tích dữ liệu và trả lời truy vấn bằng mô hình LLaMA hoặc Gemini. |
| 💬 **Natural Language Queries** | Cho phép người dùng hỏi AI về xu hướng, biểu đồ hoặc dự đoán. |
| 🖼️ **Chart Gallery** | Bộ sưu tập hình ảnh phân tích sinh tự động từ Jupyter Pipeline. |
| 💾 **Auto Merge & Clean** | Gộp dữ liệu nhiều đồng → `dataset_total_clean.csv`. |
| 🔄 **Realtime Update** | Tự động refresh dữ liệu và hiển thị timestamp cập nhật cuối cùng. |

---

## 🏗️ System Architecture

```plaintext
                 ┌──────────────────────────────┐
                 │        FRONTEND (HTML)       │
                 │ index.html / dashboard.html  │
                 │ chart.html / chatbot.html    │
                 │ Tailwind + Chart.js + JS API │
                 └───────────────┬──────────────┘
                                 │
                                 ▼
             ┌──────────────────────────────┐
             │        BACKEND (Flask)       │
             │ app.py → Flask API + CORS    │
             │ load_dotenv for config       │
             │ connect with AI model (LLaMA)│
             └───────────────┬──────────────┘
                                 │
                   ┌─────────────┴──────────────┐
                   ▼                            ▼
        Local Datasets (.csv)          AI Model / Ollama API
       (BTC, ETH, BNB, SOL, XRP)     (Chatbot & Analysis Engine)
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | HTML5, TailwindCSS, Chart.js, Vanilla JS |
| **Backend** | Flask, Flask-CORS, python-dotenv, requests |
| **Data Processing** | Pandas, Pytrends, Binance API |
| **Visualization** | Matplotlib, Seaborn, Chart.js |
| **AI / LLM** | Ollama (LLaMA 3), Gemini API |
| **Automation** | Jupyter Notebook + Batch scripts |

---

## 🧩 Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/<your-username>/BTC_Dashboard.git
cd BTC_Dashboard/ai-backend-flask
```

### 2️⃣ Setup Virtual Environment
```bash
python -m venv venv
venv\Scripts\activate
pip install flask flask-cors python-dotenv requests
```

### 3️⃣ Run Flask Backend
```bash
python app.py
```
→ Server chạy tại: http://127.0.0.1:5000

### 4️⃣ Run Local Web Server
```bash
start-server.bat
```
→ Giao diện hoạt động tại: http://localhost:8000/frontend/index.html

---

## 🗂️ Project Structure
```
Coin_Dashboard-main/
│
├── ai-backend-flask/         → Flask backend (Chatbot + API)
│   ├── app.py
│   ├── .env
│   └── venv/
│
├── frontend/                 → Giao diện chính
│   ├── index.html
│   ├── dashboard.html
│   ├── chart.html
│   ├── chatbot.html
│   └── assets/
│
├── data/                     → Dữ liệu và ảnh biểu đồ
│   ├── BTC/, ETH/, SOL/, ...
│   ├── dataset_total_clean.csv
│   └── picture/
│
├── notebooks/
│   ├── FULL_AUTO.ipynb
│   ├── process_clean.ipynb
│   └── Final_Data.ipynb
│
└── start-server.bat
```

---

## 🧠 AI Chatbot Backend
- Sử dụng **Flask API** làm cổng giao tiếp giữa frontend và mô hình AI (Ollama hoặc Gemini).  
- Các chức năng chính:
  - Nhận câu hỏi từ người dùng (qua fetch API).  
  - Phân tích nội dung, truy xuất dữ liệu phù hợp.  
  - Trả lời dưới dạng text hoặc hình ảnh biểu đồ.  
- Tích hợp `python-dotenv` để đọc cấu hình từ `.env`,  
  và `flask_cors` để cho phép truy cập từ `localhost:8000`.

---

## 📈 Main Pages
| Trang | Mô tả |
|--------|-------|
| **index.html** | Trang tổng quan thị trường (Market Cap, Volume, Sentiment). |
| **dashboard.html** | Phân tích chi tiết từng đồng (Price, Volume, Return, Volatility). |
| **chart.html** | Thư viện biểu đồ EDA & Forecast. |
| **chatbot.html** | Tương tác AI – hỏi & phân tích dữ liệu. |

---

## 🚀 Future Work
- [ ] Mở rộng dữ liệu sang ADA, DOGE, MATIC,...  
- [ ] Thêm API Realtime từ Binance Futures.  
- [ ] Kết nối Google Trends ổn định (chống 429).  
- [ ] Tích hợp login và lưu hội thoại chatbot.  
- [ ] Triển khai phiên bản online qua Railway / Fly.io.

---

## 👥 Contributors
| Thành viên | Vai trò |
|-------------|----------|
| **Ngọc Linh** | Data Engineer / Frontend Developer |
| **GPT-5** | Code & Report Assistant |

---

## 📄 License
This project is licensed under the **MIT License**.  
All data used are publicly available (Binance, Alternative.me, Blockchain.info).

---

> _“From data pipelines to insights — visualize, analyze, and interact.”_ 🚀

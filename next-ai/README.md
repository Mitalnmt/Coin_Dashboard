# Next.js AI Chat Frontend

React frontend that connects to the Flask + Ollama backend via API proxy.

## Quick Setup

### 1. Install Dependencies

```bash
cd next-ai
npm install
```

### 2. Configure Backend URL

```bash
cp env.local.example .env.local
```

Edit `.env.local` and set your ngrok URL:
```
NEXT_PUBLIC_BACKEND_BASE=https://your-subdomain.ngrok-free.app
```

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:3001

## Features

- ✅ Real-time chat with AI
- ✅ Message history and context
- ✅ Responsive design
- ✅ API proxy for CORS handling
- ✅ Loading states and error handling
- ✅ TypeScript support

## API Flow

```
Browser → Next.js API Route → ngrok → Flask → Ollama → Response
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

# Clarity - AI Output Evaluation Tool

A full-stack web application that provides real-time evaluation of AI responses through a side panel alongside a Claude-like chat interface.

## Tech Stack

**Frontend:**
- React + TypeScript
- Tailwind CSS
- Vite
- Zustand (state management)
- Axios (HTTP client)
- Lucide React (icons)
- React Markdown

**Backend:**
- Node.js + Express + TypeScript
- G( q)BLma 3 7B
- Server-Sent Events (SSE) for streaming

## Project Structure

```
clarity/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Express server
│   │   ├── routes/
│   │   │   └── chat.ts       # POST /api/chat with SSE streaming
│   │   ├── services/
│   │   │   ├── claude.ts     # Anthntpicntpicropic SDK wrapper
│   │   │   └── evaluator.ts  # Evaluation prompt builder + parser
│   │   └── types.ts          # TypeScript interfaces
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── main.tsx
    │   ├── App.tsx           # Two-panel layout
    │   ├── store/
    │   │   └── useStore.ts   # Zustand store
    │   ├── components/
    │   │   ├── ChatPanel/    # Chat interface components
    │   │   ├── ClarityPanel/ # Evaluation panel components
    │   │   └── shared/       # Shared UI components
    │   ├── hooks/
    │   │   └── useChat.ts    # SSE connection hook
    │   └── types.ts
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.ts
    └── .env
```

## Setup Instructions

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file and add your Groq API key:
GROQ_API_KEY=your_actual_api_key_here
PORT=3001

# Start development server
npm run dev
```

The backend will run on `http://localhost:3001`

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## Environment Variables

**Backend (.env):**
```
GROQ_API_KEY=your_key_here
PORT=3001
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:3001
```

## Features

- **Two-panel layout**: Chat interface (65%) and Clarity evaluation panel (35%)
- **Real-time streaming**: Server-Sent Events for streaming AI responses
- **Inline annotations**: Color-coded underlines for assumptions, statistics, and uncertain claims
- **Multi-dimensional evaluation**: Scores for Correctness, Completeness, Reasoning Quality, Usefulness, and Uncertainty
- **Confidence calibration**: Track user confidence before and after evaluation
- **Collapsible panels**: Toggle visibility of the Clarity panel
- **Multiple tabs**: Overview, Details, Trace, and Improve tabs for different evaluation views

## API Endpoints

### POST /api/chat
Streams the AI response and evaluation via SSE.

**Request Body:**
```json
{
  "prompt": "Your question here",
  "conversationHistory": []
}
```

**SSE Events:**
- `chunk`: Streaming response text
- `evaluation`: Complete evaluation JSON
- `done`: Signals completion

### POST /api/confidence
Stores user's pre-clarity confidence rating.

**Request Body:**
```json
{
  "rating": 4,
  "responseId": "response-id"
}
```

## Development

### Building for Production

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## Deployment

### Backend Deployment on Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) and sign up
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Render will detect the `render.yaml` file in the backend folder
6. Configure environment variables:
   - `GROQ_API_KEY`: Your Groq API key
   - `PORT`: 3001 (already set in render.yaml)
7. Click "Deploy Web Service"

The backend will be deployed and you'll get a URL like `https://clarity-backend.onrender.com`

### Frontend Deployment on Netlify/Vercel

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `dist` folder to Netlify or Vercel
3. Update the frontend environment variable `VITE_API_URL` to point to your Render backend URL

### Environment Variables for Production

**Backend (Render):**
- `GROQ_API_KEY`: Your Groq API key
- `PORT`: 3001

**Frontend (Netlify/Vercel):**
- `VITE_API_URL`: Your Render backend URL (e.g., `https://clarity-backend.onrender.com`)

## Important Notes

1. The main AI response and the evaluation are TWO SEPARATE API calls
2. Stream the main response first using SSE, then start the evaluation call
3. The annotation engine uses fuzzy substring matching for spanText
4. All evaluation data is rendered through UI components (never raw JSON)
5. The "Before Clarity" confidence dots appear above the response after streaming
6. Handle SSE errors gracefully with "Evaluation unavailable" state
7. The right panel is collapsible with a toggle button

## License

MIT

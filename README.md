# Direct Funeral Services - Pre-Planning Platform

AI-powered funeral planning and analytics platform built with Next.js 16, React 19, and Google Gemini.

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Google Gemini API key

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd 2025T1-is215-dbtt-grp-3
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Copy the template file
cp env.template .env.local

# Edit .env.local and add your Gemini API key
```

Get your Gemini API key at: [Google AI Studio](https://aistudio.google.com/app/apikey)

## Running the Application

### Development Mode
```bash
npm run dev
```

Application runs at: [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Application Features

- **Chat Interface** (`/`) - AI chatbot for casket and package selection
- **Pre-Planning Portal** (`/pre-planning`) - Customer pre-arrangement portal
- **Products Catalog** (`/products`) - Browse caskets and packages
- **Staff Analytics** (`/analytics`) - Real-time business analytics with AI insights

---

**Group 3 - IS215 DBTT - 2025 Term 1**

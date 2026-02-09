# TalkON Web App

The web application for TalkON messaging platform, built with Next.js 14 and React 18.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- npm 10.0.0 or higher

### Installation

From the monorepo root:

```bash
npm install
```

Or from this directory:

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm run start
```

## 📁 Project Structure

```
packages/web-app/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Homepage
│   │   └── globals.css      # Global styles
│   └── components/          # React components
│       ├── auth/            # Authentication components
│       ├── layout/          # Layout components
│       └── shared/          # Shared components
├── public/                  # Static assets
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Real-time**: Socket.io Client
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 🧪 Development

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## 🌍 Environment Variables

Create a `.env.local` file (copy from `.env.example`):

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_APP_URL`: Application URL
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NEXT_PUBLIC_WS_URL`: WebSocket server URL

## 📦 Deployment

See [DEPLOYMENT.md](../../DEPLOYMENT.md) for detailed deployment instructions.

### Deploy to Vercel

The easiest way to deploy is using Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/talkon)

## 🎨 Styling

This project uses Tailwind CSS for styling. Key features:

- **Utility-first**: Use Tailwind classes directly in JSX
- **Custom theme**: Extended colors and settings in `tailwind.config.js`
- **Dark mode**: Ready for dark mode implementation
- **Responsive**: Mobile-first responsive design

## 🔧 Configuration

### Next.js Config

- **React Strict Mode**: Enabled
- **SWC Minification**: Enabled for faster builds
- **Image Optimization**: Configured for production

### TypeScript Config

- **Strict Mode**: Enabled
- **Path Aliases**: `@/*` maps to `src/*`
- **JSX**: Preserve (handled by Next.js)

## 🤝 Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) in the monorepo root.

## 📄 License

See [LICENSE](../../LICENSE) in the monorepo root.

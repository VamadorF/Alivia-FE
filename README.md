# Alivia - Healthcare Platform Frontend

Modern healthcare platform built with Next.js, React, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe code
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **Class Variance Authority** - Component variants
- **Lucide React** - Icon library

## 🎨 Design System

- **Theme**: Sky/Indigo color palette
- **Style**: Rounded borders and smooth panels
- **Typography**: Clean and modern
- **Components**: Modular and reusable

## 📦 Project Structure

```
/
├── app/                      # Next.js pages
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Homepage with mock appointments
│   ├── servicios/            # Services page
│   │   └── page.tsx
│   └── globals.css           # Global styles (sky/indigo theme)
├── components/          
│   ├── ui/                   # shadcn/ui base components
│   │   ├── button.tsx        # Styled button with variants
│   │   ├── card.tsx          # Card container with sections
│   │   └── badge.tsx         # Badge component
│   ├── layout/               # Layout components
│   │   ├── header.tsx        # Reusable header with nav
│   │   └── footer.tsx        # Reusable footer
│   ├── services/             # Service-related components
│   │   └── service-card.tsx  # Service display card
│   ├── appointments/         # Appointment components
│   │   └── appointment-card.tsx  # Appointment display
│   └── stats/                # Statistics components
│       └── stat-card.tsx     # Stat display card
├── data/                     # Mock data
│   ├── mock-appointments.ts  # Mock appointment data
│   └── mock-services.ts      # Mock services data
├── lib/
│   └── utils.ts              # Utility functions (cn helper)
├── types/
│   └── index.ts              # TypeScript type definitions
└── public/                   # Static assets
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
```

### Production

```bash
npm run start
```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📝 Development Guidelines

- **TypeScript**: Strict typing, no `any` types
- **Components**: Modular and typed
- **Render Logic**: Keep render functions clean, avoid heavy logic
- **Data**: Use static or mock data only
- **Code Style**: Follow ESLint and Prettier configurations

## 🎯 Features

- Healthcare service listing
- Appointment management (mock data)
- Responsive design
- Modern UI with sky/indigo theme
- Type-safe components
- Optimized performance

## 📄 License

Private - All rights reserved

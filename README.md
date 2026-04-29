# Chrono

Chrono is a lightweight and intuitive application designed to help management record working hours across specific projects. It provides a simple interface and a clear overview for managers to monitor project effort, productivity, and resource allocation.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 16 (App Router)
- **Language:** TypeScript 5
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Components:** [shadcn/ui](https://ui.shadcn.com/) (radix-nova style)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [Sonner](https://sonner.emilkowal.dev/)
- **Date Utilities:** date-fns, react-day-picker

## Project Structure

```
chrono_frontend/
├── app/
│   ├── (auth)/               # Public routes (login)
│   │   ├── layout.tsx
│   │   └── login/
│   │       └── page.tsx      # Login form with credentials auth
│   ├── (dashboard)/          # Protected routes (requires auth)
│   │   ├── layout.tsx        # Reads user cookie, renders sidebar
│   │   ├── page.tsx          # Home / dashboard
│   │   ├── employees/        # Employee management
│   │   ├── enterprise/       # Enterprise view
│   │   └── settings/         # App settings
│   ├── api/
│   │   └── auth/
│   │       └── login/
│   │           └── route.ts  # Login API proxy to backend
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Tailwind + theme variables
├── components/
│   ├── sidebar.tsx           # Navigation sidebar with user info & logout
│   └── ui/                   # shadcn/ui components (button, sonner)
├── lib/
│   └── utils.ts              # cn() utility for class merging
├── proxy.ts                  # Middleware — route protection & token validation
├── types.d.ts                # Global type declarations (AuthUser, AuthResponse)
└── public/                   # Static assets (logo, icons)
```

## Authentication

Chrono uses a token-based authentication flow proxied through the Next.js API:

1. **Login** — Credentials are sent to `/api/auth/login`, which proxies to the backend. On success, the backend token and user info are stored in HTTP-only cookies.
2. **Route Protection** — `proxy.ts` acts as middleware. It validates the token against the backend on every request and redirects unauthenticated users to `/login`.
3. **Logout** — Clears the `token` and `user` cookies client-side and redirects to `/login`.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

```bash
# Install dependencies
npm install

# Create a .env.local file with the backend API URL
echo "NEXT_PUBLIC_API_BASE_URL=http://your-backend-url" > .env.local
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Environment Variables

| Variable                    | Description                   | Required |
|-----------------------------|-------------------------------|----------|
| `NEXT_PUBLIC_API_BASE_URL`  | Base URL of the backend API   | Yes      |
| `NODE_ENV`                  | `production` enables secure cookies | No  |

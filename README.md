[한국어](./README.ko.md)

# Bolier plate Next.js 16

A production-ready Next.js 16 boilerplate with React 19, TypeScript, and Feature-Sliced Design architecture.

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16, React 19 |
| **Language** | TypeScript 5.7 |
| **Styling** | Tailwind CSS 4, CVA |
| **State Management** | Zustand 5, TanStack Query 5 |
| **Forms** | React Hook Form, Zod |
| **UI Components** | Radix UI |
| **Testing** | Vitest, Testing Library |
| **Documentation** | Storybook 10 |
| **Code Quality** | ESLint 9, Prettier |
| **Real-time** | STOMP.js (WebSocket) |

## Project Structure

This project follows the [Feature-Sliced Design](https://feature-sliced.design/) architecture:

```
src/
├── app/          # Next.js App Router, global styles, providers
├── pages/        # Compositional layer for page components
├── widgets/      # Large self-contained UI blocks
├── features/     # User interactions and business logic
├── entities/     # Business entities (models, types, API)
└── shared/       # Reusable utilities, UI components, configs
    ├── api/      # API client, React Query setup, WebSocket
    ├── config/   # Environment variables, test setup
    ├── lib/      # Hooks, utility functions
    ├── types/    # Common TypeScript types
    └── ui/       # Base UI components (Button, etc.)
```

## Getting Started

### Prerequisites

- Node.js 20+
- Bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd boilerplate_nextjs16

# Install dependencies
bun install

# Start development server with Turbopack
bun dev
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_WS_URL=ws://localhost:8080/ws
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start dev server with Turbopack |
| `bun run build` | Create production build |
| `bun start` | Start production server |
| `bun lint` | Run ESLint |
| `bun lint:fix` | Run ESLint with auto-fix |
| `bun format` | Format code with Prettier |
| `bun format:check` | Check code formatting |
| `bun run test` | Run tests with Vitest (watch mode) |
| `bun run test:run` | Run tests once (for CI) |
| `bun run test:ui` | Run tests with UI |
| `bun run test:coverage` | Run tests with coverage |
| `bun storybook` | Start Storybook dev server |
| `bun build-storybook` | Build Storybook for deployment |
| `bun typecheck` | Run TypeScript type checking |

> **Note**: Use `bun run test` instead of `bun test`. The latter uses Bun's built-in test runner, which doesn't use the Vitest configuration.

## Key Features

### Type-Safe API Client

A lightweight, type-safe HTTP client with automatic error handling:

```typescript
import { api } from '@shared/api';

// GET request
const users = await api.get<User[]>('/users');

// POST request
const newUser = await api.post<User>('/users', { name: 'John' });
```

### Zod Form Integration

Seamless form validation with React Hook Form and Zod:

```typescript
import { useZodForm } from '@shared/lib/hooks';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginForm() {
  const form = useZodForm(schema);
  // ...
}
```

### Reusable UI Components

Accessible, customizable components built with Radix UI and CVA:

```tsx
import { Button } from '@shared/ui';

<Button variant="primary" size="lg">
  Click me
</Button>
```

### Path Aliases

Clean imports using TypeScript path aliases:

```typescript
import { Button } from '@shared/ui';
import { useZodForm } from '@shared/lib/hooks';
import { api } from '@shared/api';
```

## Development

### Adding a New Feature

1. Create a new folder in `src/features/`
2. Add `index.ts` for public exports
3. Organize code into `ui/`, `model/`, `api/` subdirectories as needed

### Adding a New Entity

1. Create a new folder in `src/entities/`
2. Define types in `model/types.ts`
3. Add API queries in `api/queries.ts`
4. Export public API through `index.ts`

### Component Development

1. Create component in appropriate layer
2. Add Storybook stories for documentation
3. Write tests with Testing Library
4. Export through layer's index file

## License

MIT License - see the [LICENSE](LICENSE) file for details.

# 🐟 Jagalchi

Collaborative flow-chart editor with real-time collaboration.

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Server State | React Query |
| Client State | Zustand |
| Styling | Tailwind CSS |
| UI Components | Radix UI |
| Real-time | STOMP (WebSocket) |
| Form | React Hook Form + Zod |
| Testing | Vitest + React Testing Library |
| Documentation | Storybook |

## Getting Started

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Run tests
bun test

# Run Storybook
bun storybook
```

## Architecture (FSD)

이 프로젝트는 [Feature-Sliced Design](https://feature-sliced.design/) 아키텍처를 따릅니다.

```
src/
├── app/          # Next.js App Router + 전역 설정
├── pages/        # 페이지 컴포넌트 (FSD layer)
├── widgets/      # 독립적인 UI 블록
├── features/     # 사용자 액션 단위 기능
├── entities/     # 비즈니스 엔티티
└── shared/       # 공용 유틸, UI, API
```

### Layer Dependencies

```
app → pages → widgets → features → entities → shared
```

**규칙**: 상위 레이어는 하위 레이어만 import 가능

### Layer 설명

| Layer | 역할 | 예시 |
|-------|------|------|
| `app` | 앱 전역 설정, 라우팅, 프로바이더 | `providers/`, `layout.tsx` |
| `pages` | 라우트와 매칭되는 페이지 | `auth/`, `flow-chart/` |
| `widgets` | features/entities 조합 UI 블록 | `header/`, `flow-canvas/` |
| `features` | 사용자 액션 | `login/`, `create-node/` |
| `entities` | 비즈니스 도메인 객체 | `user/`, `node/`, `memo/` |
| `shared` | 공용 코드 | `ui/`, `api/`, `lib/` |

### Slice 내부 구조

```
feature-name/
├── ui/           # 컴포넌트
├── model/        # 비즈니스 로직, 훅, 상태
├── api/          # API 호출
└── index.ts      # Public API
```

## Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | 개발 서버 실행 |
| `bun build` | 프로덕션 빌드 |
| `bun test` | 테스트 실행 |
| `bun test:ui` | Vitest UI 실행 |
| `bun test:coverage` | 커버리지 리포트 |
| `bun storybook` | 스토리북 실행 |
| `bun lint` | ESLint 검사 |
| `bun format` | Prettier 포맷팅 |
| `bun typecheck` | TypeScript 타입 검사 |

## Path Aliases

```typescript
import { Button } from "@shared/ui";
import { useLogin } from "@features/auth";
import { UserAvatar } from "@entities/user";
```

| Alias | Path |
|-------|------|
| `@/*` | `src/*` |
| `@app/*` | `src/app/*` |
| `@pages/*` | `src/pages/*` |
| `@widgets/*` | `src/widgets/*` |
| `@features/*` | `src/features/*` |
| `@entities/*` | `src/entities/*` |
| `@shared/*` | `src/shared/*` |

## ESLint Rules

FSD 레이어 의존성 규칙이 ESLint로 강제됩니다:

- `shared`는 다른 레이어를 import할 수 없음
- `entities`는 `features` 이상 import 불가
- `features`는 `widgets` 이상 import 불가
- `widgets`는 `pages` import 불가

위반 시 ESLint 에러 발생.

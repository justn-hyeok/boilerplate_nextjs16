[English](./README.md)

# 보일러 플레이트 Next.js 16

React 19, TypeScript, Feature-Sliced Design 아키텍처를 적용한 프로덕션 레디 Next.js 16 보일러플레이트입니다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| **프레임워크** | Next.js 16, React 19 |
| **언어** | TypeScript 5.7 |
| **스타일링** | Tailwind CSS 4, CVA |
| **상태 관리** | Zustand 5, TanStack Query 5 |
| **폼** | React Hook Form, Zod |
| **UI 컴포넌트** | Radix UI |
| **테스팅** | Vitest, Testing Library |
| **문서화** | Storybook 10 |
| **코드 품질** | ESLint 9, Prettier |
| **실시간 통신** | STOMP.js (WebSocket) |

## 프로젝트 구조

이 프로젝트는 [Feature-Sliced Design](https://feature-sliced.design/) 아키텍처를 따릅니다:

```
src/
├── app/          # Next.js App Router, 전역 스타일, 프로바이더
├── pages/        # 페이지 컴포넌트 조합 레이어
├── widgets/      # 대형 독립 UI 블록
├── features/     # 사용자 인터랙션 및 비즈니스 로직
├── entities/     # 비즈니스 엔티티 (모델, 타입, API)
└── shared/       # 재사용 가능한 유틸리티, UI 컴포넌트, 설정
    ├── api/      # API 클라이언트, React Query 설정, WebSocket
    ├── config/   # 환경 변수, 테스트 설정
    ├── lib/      # 훅, 유틸리티 함수
    ├── types/    # 공통 TypeScript 타입
    └── ui/       # 기본 UI 컴포넌트 (Button 등)
```

## 시작하기

### 사전 요구사항

- Node.js 20+
- Bun

### 설치

```bash
# 저장소 클론
git clone <repository-url>
cd boilerplate_nextjs16

# 의존성 설치
bun install

# Turbopack으로 개발 서버 시작
bun dev
```

### 환경 변수

프로젝트 루트에 `.env.local` 파일을 생성하세요:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_WS_URL=ws://localhost:8080/ws
```

## 사용 가능한 스크립트

| 명령어 | 설명 |
|--------|------|
| `bun dev` | Turbopack으로 개발 서버 시작 |
| `bun run build` | 프로덕션 빌드 생성 |
| `bun start` | 프로덕션 서버 시작 |
| `bun lint` | ESLint 실행 |
| `bun lint:fix` | ESLint 자동 수정 실행 |
| `bun format` | Prettier로 코드 포맷팅 |
| `bun format:check` | 코드 포맷팅 검사 |
| `bun run test` | Vitest로 테스트 실행 (watch 모드) |
| `bun run test:run` | 테스트 1회 실행 (CI용) |
| `bun run test:ui` | UI로 테스트 실행 |
| `bun run test:coverage` | 커버리지 포함 테스트 실행 |
| `bun storybook` | Storybook 개발 서버 시작 |
| `bun build-storybook` | 배포용 Storybook 빌드 |
| `bun typecheck` | TypeScript 타입 검사 실행 |

> **참고**: `bun test` 대신 `bun run test`를 사용하세요. `bun test`는 Vitest 설정을 사용하지 않는 Bun 내장 테스트 러너를 실행합니다.

## 주요 기능

### 타입 세이프 API 클라이언트

자동 에러 핸들링이 포함된 경량 타입 세이프 HTTP 클라이언트:

```typescript
import { api } from '@shared/api';

// GET 요청
const users = await api.get<User[]>('/users');

// POST 요청
const newUser = await api.post<User>('/users', { name: 'John' });
```

### Zod 폼 통합

React Hook Form과 Zod를 활용한 원활한 폼 유효성 검사:

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

### 재사용 가능한 UI 컴포넌트

Radix UI와 CVA로 구축된 접근성 있고 커스터마이징 가능한 컴포넌트:

```tsx
import { Button } from '@shared/ui';

<Button variant="primary" size="lg">
  클릭하세요
</Button>
```

### 경로 별칭

TypeScript 경로 별칭을 사용한 깔끔한 import:

```typescript
import { Button } from '@shared/ui';
import { useZodForm } from '@shared/lib/hooks';
import { api } from '@shared/api';
```

## 개발 가이드

### 새 기능 추가하기

1. `src/features/`에 새 폴더 생성
2. 공개 export를 위한 `index.ts` 추가
3. 필요에 따라 `ui/`, `model/`, `api/` 하위 디렉토리로 코드 정리

### 새 엔티티 추가하기

1. `src/entities/`에 새 폴더 생성
2. `model/types.ts`에 타입 정의
3. `api/queries.ts`에 API 쿼리 추가
4. `index.ts`를 통해 공개 API export

### 컴포넌트 개발

1. 적절한 레이어에 컴포넌트 생성
2. 문서화를 위한 Storybook 스토리 추가
3. Testing Library로 테스트 작성
4. 레이어의 index 파일을 통해 export

## 라이선스

MIT 라이선스 - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

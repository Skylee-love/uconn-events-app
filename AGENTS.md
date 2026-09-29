# AGENTS.md

UConn events: an Expo/React Native app (SDK 57) for students to find local events. Mobile-first, cross-platform (iOS/Android/web). Placeholder/fake data is used everywhere so far: the home screen (`src/app/index.tsx`) lists searchable fake events from `src/data/events.ts` — reuse that module instead of inventing new data until a real backend exists. `explore.tsx` is still template code.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. This repo is Expo SDK 57 (`expo` ~57.0.24) — fetch `https://docs.expo.dev/versions/v57.0.0/`.
2. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

This project uses npm (`package-lock.json` present) — use `npx`, not `bunx`/`yarn`/`pnpm`.

```bash
npm install                  # install deps
npx expo start               # dev server
npx expo install <package>   # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npm run lint                 # lint (expo lint)
npx tsc --noEmit             # typecheck
npx expo-doctor              # diagnose dependency and config issues
npx expo install --fix       # fix incompatible package versions
```

- Verification order before declaring a task done: `npm run lint` → `npx tsc --noEmit`.
- **`npx tsc --noEmit` fails on a fresh clone** with `Cannot find module '*.css'` errors until `npx expo start` has run once — the dev server generates the gitignored `expo-env.d.ts` (which references `expo/types`, including CSS module declarations). Start it if typecheck reports CSS errors.
- **No test runner is configured** — don't invent test commands; if tests are needed, set up Jest per https://docs.expo.dev/develop/unit-testing/ first.
- ESLint is configured (`eslint.config.js` via `eslint-config-expo`, bootstrapped by `expo lint`).
- `npm run reset-project` is **interactive and destructive**: it moves or deletes `src/` and `scripts/` (into gitignored `example/`) and rewrites `src/app/`. Never run it unless explicitly asked.

## Architecture

- Single package, no monorepo. All code lives under `src/`, assets under `assets/`, fake event data under `src/data/`.
- **Routes:** `src/app/` — every file is a screen (`index.tsx`, `explore.tsx`), `_layout.tsx` defines the navigator. Keep non-route code (components, hooks, utils) outside `src/app/`. Import `Link`, `router`, `useLocalSearchParams` from `expo-router`. Docs: https://docs.expo.dev/router/introduction.md
- **Tab bar is not declared in `_layout.tsx`:** the root layout (`src/app/_layout.tsx`) renders `AppTabs` from `src/components/app-tabs.tsx`, which uses `NativeTabs` from `expo-router/unstable-native-tabs` (correct for SDK 55–57; SDK 58+ renames it to `expo-router/native-tabs`). Adding a tab route requires a matching `NativeTabs.Trigger` in `app-tabs.tsx`, not just a file in `src/app/`.
- **Path aliases** (tsconfig): `@/*` → `./src/*`, `@/assets/*` → `./assets/*`. Use them; don't write relative `../../` imports.
- **Platform split convention:** components/hooks use `.web.tsx` / `.web.ts` variants alongside the native file (e.g. `app-tabs.web.tsx`, `use-color-scheme.web.ts`). Web-only styling uses CSS modules (`animated-icon.module.css`) and `src/global.css` (imported via `@/constants/theme.ts`).
- `app.json` enables `experiments.typedRoutes` and `experiments.reactCompiler` — route strings are type-checked, and React Compiler handles memoization (don't add manual `React.memo`/`useMemo` for perf without measuring).
- Deep-link scheme: `uconneventsapp`. Web build output is `static`.
- `README.md` is stale template boilerplate (refers to an "app" directory and "app-example"; the real layout is `src/` and `example/`). Trust `package.json`, `app.json`, and `scripts/` over the README.

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `npx eas-cli@latest <command>`; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- `ios/` and `android/` do not exist and are gitignored — they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
- No CI workflows or pre-commit hooks exist in this repo — lint/typecheck only run when you run them.

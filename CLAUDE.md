# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Sami Hindi (samihindi.com). Built with Next.js 15, React 19, Tailwind CSS v4, Framer Motion, and TypeScript. The site features animated UI elements, an interactive audio player, and quote displays.

## Development Commands

- **Start development server**: `bun dev` (uses Turbopack)
- **Build for production**: `bun run build` (uses Turbopack)
- **Start production server**: `bun start`
- **Lint**: `bun run lint`

## Architecture

### App Router Structure

- **App Directory** (`src/app/`): Uses Next.js 15 App Router
  - `layout.tsx`: Root layout with Noto Serif font and metadata
  - `page.tsx`: Main homepage (client component with animations)
  - `globals.css`: Global styles with Tailwind v4 `@theme inline` syntax

### Component Organization

- **UI Components** (`src/components/`):
  - `AudioPlayer.tsx`: Fixed bottom audio player with track navigation
  - `quote/QuoteList.tsx` & `quote/Quote.tsx`: Quote display components
  - `icons/`: SVG icon components (Play, Previous, Next, Copy, XIcon, GithubIcon, etc.)

### Type System

- **Types** (`src/types/index.ts`): Shared TypeScript types
  - `Quote`: Individual quote with author and X link
  - `QuoteList`: Array of quotes
  - `Song`: Audio track metadata

### Utilities

- **Utils** (`src/lib/utils.ts`): Helper functions
  - `cn()`: Conditional class name merger (simple implementation)

## Key Technical Details

### Animations

- Uses Framer Motion extensively for page transitions and micro-interactions
- Common animation pattern: `initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}` with ease `[0.22, 1, 0.36, 1]`
- `AnimatePresence` wraps components that mount/unmount

### Email Obfuscation

Homepage uses runtime email decoding (ASCII array) to prevent scraping:
```typescript
const _e = [115, 97, 109, 105, ...]; // ASCII codes
const _d = () => _e.map(c => String.fromCharCode(c)).join('');
```

### Audio Player State

- Manages play/pause state, track index, and audio ref
- Auto-advances on track end
- Fixed positioning at bottom with backdrop blur

### Styling

- Tailwind CSS v4 with `@theme inline` syntax in globals.css
- Dark mode via `prefers-color-scheme` media query
- Custom CSS variables: `--background`, `--foreground`
- Font: Noto Serif via Next.js font optimization

### Path Aliases

TypeScript configured with `@/*` alias pointing to `./src/*`

## Important Patterns

1. **Client Components**: Most interactive components use `"use client"` directive
2. **Icon Transitions**: Icons use stacked absolute positioning with opacity/rotate animations for hover effects
3. **Type Safety**: All data structures (quotes, songs) are properly typed
4. **Accessibility**: Popover uses proper ARIA attributes (`aria-haspopup`, `aria-expanded`)

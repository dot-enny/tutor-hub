---
description: Project-specific guidelines and preferences
---

# TutorHub Dashboard - Project Guidelines

## Technology Stack
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (New York style)
- **Icons**: Lucide React
- **Type Safety**: TypeScript

## Component Guidelines

### Use shadcn/ui First
**CRITICAL**: Always use shadcn/ui components when available. Only create custom components when:
1. The component doesn't exist in shadcn/ui
2. You need to compose multiple shadcn components into a domain-specific component (e.g., SessionCard)

### Available shadcn/ui Components
Check https://ui.shadcn.com/docs/components for the complete list. Currently installed:
- calendar
- card
- badge
- button
- avatar
- tabs
- dialog
- table
- select
- input
- label

### Custom Components Should:
1. Build on top of shadcn primitives
2. Be domain-specific (e.g., SessionCard, not GenericCard)
3. Use shadcn styling patterns (`cn()` utility)
4. Follow shadcn naming conventions

## Architecture Preferences

### Student-First Dashboard
- Building student view first
- Will add tutor views later with role-based access
- Separate views for different user types

### Layout Structure
- Sidebar navigation (fixed left)
- Main content area (right)
- Responsive grid layouts
- Mobile-friendly design

## Code Style

### Components
- Use `"use client"` only when needed (interactivity, hooks)
- Server components by default
- Prefer composition over complex components
- Keep components focused and single-purpose

### Icons
- **Always use Lucide React icons** - Never use emoji or icon fonts
- ✅ `<Video className="h-4 w-4" />`
- ❌ `<span>🎥</span>`
- ❌ emoji characters in any form

### Naming
- Files: kebab-case (e.g., `session-card.tsx`)
- Components: PascalCase (e.g., `SessionCard`)
- Functions: camelCase (e.g., `handleJoinSession`)

### Imports
```tsx
// shadcn components
import { Button } from "@/components/ui/button";

// Custom components
import { SessionCard } from "@/components/session-card";

// Utils and types
import { cn } from "@/lib/utils";
import { Session } from "@/lib/types";
```

## Development Workflow

### Feature Development
1. Plan the feature
2. Check if shadcn has needed components
3. Install missing shadcn components if available
4. Build custom components only if needed
5. Test and iterate
6. Review with user at each major step

### When Adding Components
```bash
# Always check shadcn first
pnpm dlx shadcn@latest add [component-name]
```

## UI/UX Principles
- Clean, modern dashboard aesthetic
- Clear visual hierarchy
- Responsive design (mobile-first)
- Accessible (keyboard navigation, screen readers)
- Consistent spacing and typography
- shadcn's design system throughout

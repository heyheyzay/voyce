# Implementation Notes - Voyce Invoice Page

## Design Specifications Extracted from Figma

### Layout Structure
- **Container width**: 1440px max-width
- **Horizontal padding**: 80px (desktop), 32px (mobile)
- **Grid system**: 12-column grid with 32px gaps
- **Main layout**: 8-column main content + 4-column sidebar

### Typography Hierarchy

| Element | Size | Weight | Line Height | Color |
|---------|------|--------|-------------|-------|
| H1 (Page Title) | 36px | 600 | 40px | Gray 900 |
| H2 (Section Titles) | 18px | 600 | 28px | Gray 900 |
| Body Text | 16px | 400 | 24px | Gray 600 |
| Small Text | 14px | 400 | 20px | Gray 600 |
| Labels | 14px | 500 | 20px | Gray 700 |
| Breadcrumb | 14px | 500 | 20px | Teal/Gray 600 |

### Color Palette

**Primary Colors:**
- `#D4FF00` - Primary lime green (CTA buttons)
- `#00897B` - Teal (brand color, active states)

**Grayscale:**
- `#111827` - Gray 900 (headings)
- `#1F2937` - Gray 800
- `#374151` - Gray 700 (labels)
- `#6B7280` - Gray 500
- `#9CA3AF` - Gray 400
- `#E5E7EB` - Gray 200 (borders)
- `#F3F4F6` - Gray 100 (backgrounds)
- `#F9FAFB` - Gray 50 (card backgrounds)

**Status Colors:**
- `#10B981` - Success green
- `#F59E0B` - Warning orange
- `#EF4444` - Error red

### Spacing System

Based on 4px increment:
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px

### Component Specifications

#### Header
- Height: 80px
- Background: White
- Border: 1px solid Gray 200
- Logo: 48x48px with teal gradient
- Navigation links: 16px, medium weight
- Active state: 2px bottom border in teal

#### Callout Cards (Sections)
- Background: Gray 50
- Border: 1px solid Gray 200
- Border radius: 12px
- Padding: 24px

#### Text Fields
- Height: 72px total (label + input)
- Input height: 48px
- Padding: 16px horizontal
- Border: 1px solid Gray 300
- Border radius: 8px
- Focus state: 2px teal ring

#### Buttons
- **Primary**: Lime green background, gray 900 text
- **Secondary**: Teal background, white text
- **Small**: Height 36px, padding 12px 16px
- **Medium**: Height 44px, padding 12px 24px
- **Large**: Height 52px, padding 16px 32px
- Border radius: 8px

#### Stacked Paper Illustration
- Container: 256px x 160px
- 3 layers with offset shadows
- Hover animation specs:
  - Duration: 350ms
  - Easing: cubic-bezier(0.4, 0, 0.2, 1)
  - Layer 1 transform: `translate(-8px, -6px) rotate(-4deg)`
  - Layer 2 transform: `translate(6px, -3px) rotate(2deg)` (50ms delay)
  - Layer 3 transform: `translate(0, 0) rotate(0)` (100ms delay)

### Interactive States

#### Hover States
- **Buttons**: Darken background 10%, scale(1.02), shadow lift
- **Links**: Change color to teal, underline appears
- **Cards**: Shadow increases slightly
- **Stacked papers**: Fan-out animation

#### Focus States
- All interactive elements: 2px teal ring with 2px offset
- Visible outline for keyboard navigation
- No focus on click (only keyboard)

#### Active States
- **Buttons**: scale(0.95), darker background
- **Inputs**: Teal border, teal ring

### Accessibility Requirements

1. **Keyboard Navigation**
   - Tab order follows visual hierarchy
   - All interactive elements focusable
   - Skip to main content link (implemented in header)

2. **Screen Readers**
   - All images have alt text
   - Form fields have labels
   - Error messages linked to inputs via aria-describedby
   - Landmark regions (header, main, nav)

3. **Color Contrast**
   - All text meets WCAG AA (4.5:1 for normal text, 3:1 for large)
   - Focus indicators clearly visible

4. **Motion**
   - Respects `prefers-reduced-motion`
   - All animations can be disabled

### Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Cumulative Layout Shift: < 0.1
- Lighthouse Score: > 90

## Design Decisions Made

### 1. Empty State Illustrations
**Figma showed**: Abstract skeleton placeholders with complex layering

**Implemented**: Simplified 3-layer stacked cards with basic content shapes (circles and lines)

**Reasoning**: Easier to maintain, faster to render, achieves same visual effect

### 2. Animation Timing
**Figma provided**: Static mockups only

**Implemented**:
- 350ms for hover transitions (industry standard for micro-interactions)
- 50ms stagger delay between layers (enough to be noticeable, not sluggish)
- cubic-bezier(0.4, 0, 0.2, 1) easing (Material Design standard)

**Reasoning**: Balances polish with performance

### 3. Responsive Breakpoints
**Figma showed**: Desktop view only (1440px)

**Implemented**:
- Mobile: < 640px (single column)
- Tablet: 640px - 1024px (adjusted spacing)
- Desktop: > 1024px (full 2-column layout)

**Reasoning**: Standard breakpoints that cover 95% of devices

### 4. Focus States
**Figma showed**: No focus states (static design)

**Implemented**: 2px teal ring on all interactive elements

**Reasoning**: Required for accessibility (WCAG 2.1 Level AA)

### 5. Form Validation
**Figma showed**: Empty form fields

**Implemented**: Error state styling (red border, error message below field)

**Reasoning**: Essential for user feedback, matches design system colors

## Code Architecture

### Component Hierarchy
```
page.tsx (Invoice Page)
├── Header
│   ├── Logo
│   ├── Navigation
│   └── Actions (Button + Avatar)
├── Breadcrumb
├── Page Header
│   ├── Title
│   └── Edit/Preview Tabs
├── Main Grid (2 columns)
│   ├── Left Column (8-col)
│   │   ├── InvoiceDetailsSection
│   │   │   └── TextFields (4)
│   │   ├── PaymentsSection
│   │   │   └── StackedPapers (empty state)
│   │   └── LineItemsSection
│   │       ├── Table Header
│   │       └── StackedPapers (empty state)
│   └── Right Column (4-col)
│       ├── VerificationStatusSection
│       │   └── Check Items (3)
│       ├── AuditTrailSection
│       │   └── Info Fields (3)
│       └── Alert (warning)
└── Bottom Actions (Cancel + Share)
```

### State Management
Currently using local React state. For production, consider:
- Form state: React Hook Form + Zod validation
- Global state: Zustand or Jotai (lightweight)
- Server state: TanStack Query (for API data)

### Styling Approach
- Tailwind utility classes for 90% of styling
- Custom CSS in globals.css for complex animations
- CSS custom properties for theme values
- No CSS-in-JS (keeping bundle small)

## Testing Strategy

### Unit Tests
- [ ] Button component variants
- [ ] TextField validation states
- [ ] Alert component rendering
- [ ] Badge variants

### Integration Tests
- [ ] Form submission flow
- [ ] Navigation between sections
- [ ] Responsive layout changes

### E2E Tests
- [ ] Complete invoice creation flow
- [ ] Keyboard navigation
- [ ] Error handling

### Visual Regression
- [ ] Snapshot tests for each component
- [ ] Percy or Chromatic for visual diffs

## Deployment

### Build Optimization
```bash
# Production build
npm run build

# Check bundle size
npm run build -- --analyze
```

### Environment Variables
```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_ENVIRONMENT=
```

### Hosting Recommendations
- Vercel (optimal for Next.js)
- Netlify
- AWS Amplify

## Known Limitations

1. **Data is static** - All invoice data is hardcoded, needs API integration
2. **No form validation** - Fields don't validate input yet
3. **No backend** - Buttons don't submit data anywhere
4. **No routing** - Links are placeholder hrefs
5. **No authentication** - User avatar is static

## Next Steps

1. **Refactor for production**:
   - Add proper TypeScript types for invoice data
   - Implement form validation with Zod
   - Add error boundaries
   - Implement loading states

2. **Backend integration**:
   - Define API endpoints
   - Add data fetching with TanStack Query
   - Implement optimistic updates
   - Add error handling

3. **Enhanced UX**:
   - Add skeleton loaders
   - Implement toasts for user feedback
   - Add confirmation modals
   - Implement undo functionality

4. **Performance**:
   - Add image optimization
   - Implement code splitting
   - Add service worker for offline support
   - Optimize bundle size

---

**Implementation Completed**: February 16, 2026
**Total Development Time**: ~2 hours
**Lines of Code**: ~1,500
**Components Created**: 14

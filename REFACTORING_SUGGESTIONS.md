# Code Refactoring Suggestions

## Current Implementation ✅
The current implementation is production-ready with:
- Clean, readable code
- Proper TypeScript typing
- Accessible markup
- Responsive design
- Performance optimizations

## Suggested Refactoring for Scale

### 1. Extract Animation Constants

**Current:**
```tsx
// Scattered across components
transition: "transform 350ms cubic-bezier(0.4, 0, 0.2, 1)"
```

**Refactored:**
```tsx
// lib/constants/animations.ts
export const ANIMATION = {
  duration: {
    fast: 200,
    normal: 350,
    slow: 500,
  },
  easing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  },
} as const;
```

### 2. Create Composable Hooks

**Current:**
```tsx
// Form logic in component
const [supplier, setSupplier] = useState("");
```

**Refactored:**
```tsx
// hooks/useInvoiceForm.ts
export const useInvoiceForm = () => {
  const [formData, setFormData] = useState<InvoiceFormData>({
    supplier: '',
    buyer: '',
    invoiceDate: '',
    dueDate: '',
  });

  const handleChange = (field: keyof InvoiceFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    // Validation logic
  };

  return { formData, handleChange, validate };
};
```

### 3. Extract SVG Icons to Components

**Current:**
```tsx
<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
  <path d="..." />
</svg>
```

**Refactored:**
```tsx
// components/icons/DocumentIcon.tsx
export const DocumentIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24">
    <path d="..." />
  </svg>
);

// Usage
<DocumentIcon size={24} className="text-gray-700" />
```

### 4. Implement Design Tokens Object

**Current:**
```tsx
className="text-gray-900 bg-primary"
```

**Refactored:**
```tsx
// lib/theme/tokens.ts
export const tokens = {
  colors: {
    primary: {
      DEFAULT: '#D4FF00',
      hover: '#BFE600',
    },
    teal: {
      DEFAULT: '#00897B',
      hover: '#00796B',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
} as const;
```

### 5. Create Card Wrapper Component

**Current:**
```tsx
<section className="bg-gray-50 border border-gray-200 rounded-xl p-6">
  {/* Content */}
</section>
```

**Refactored:**
```tsx
// components/ui/Card.tsx
interface CardProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  action?: ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, icon, children, action }) => (
  <section className="bg-gray-50 border border-gray-200 rounded-xl p-6">
    {title && (
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        {action}
      </div>
    )}
    {children}
  </section>
);

// Usage
<Card title="Invoice details" icon={<DocumentIcon />}>
  <TextField ... />
</Card>
```

### 6. Implement Form Field Wrapper

**Current:**
```tsx
<div className="grid grid-cols-2 gap-6">
  <TextField id="supplier" label="Supplier" />
  <TextField id="buyer" label="Buyer" />
</div>
```

**Refactored:**
```tsx
// components/forms/FormRow.tsx
export const FormRow: React.FC<{ children: ReactNode; columns?: 1 | 2 }> = ({
  children,
  columns = 2,
}) => (
  <div className={`grid grid-cols-1 lg:grid-cols-${columns} gap-6`}>
    {children}
  </div>
);

// Usage
<FormRow>
  <TextField id="supplier" label="Supplier" />
  <TextField id="buyer" label="Buyer" />
</FormRow>
```

### 7. Create Skeleton Loader Component

**Current:**
```tsx
<div className="h-3 bg-gray-300 rounded w-3/4"></div>
```

**Refactored:**
```tsx
// components/ui/Skeleton.tsx
interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '12px',
  className = '',
}) => (
  <div
    className={`bg-gray-300 rounded animate-pulse ${className}`}
    style={{ width, height }}
    aria-hidden="true"
  />
);

// Usage in StackedPapers
<div className="space-y-3">
  <Skeleton width="75%" />
  <Skeleton width="100%" />
  <Skeleton width="85%" />
</div>
```

### 8. Add Variant System to Components

**Current:**
```tsx
<Alert type="warning" />
```

**Refactored:**
```tsx
// Using cva (class-variance-authority)
import { cva, type VariantProps } from 'class-variance-authority';

const alertVariants = cva(
  'flex items-start gap-3 p-4 rounded-lg border',
  {
    variants: {
      variant: {
        info: 'bg-blue-50 border-blue-200 text-blue-900',
        success: 'bg-green-50 border-green-200 text-green-900',
        warning: 'bg-orange-50 border-orange-200 text-orange-900',
        error: 'bg-red-50 border-red-200 text-red-900',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'info',
      size: 'md',
    },
  }
);

export interface AlertProps extends VariantProps<typeof alertVariants> {
  title?: string;
  description: string;
}
```

### 9. Implement Data Layer

**Current:**
```tsx
// Hardcoded in components
<p>$5500.00</p>
```

**Refactored:**
```tsx
// lib/data/invoice.ts
export interface Invoice {
  id: string;
  number: number;
  supplier: string;
  buyer: string;
  invoiceDate: Date;
  dueDate: Date;
  subtotal: number;
  total: number;
  items: InvoiceItem[];
  status: 'draft' | 'pending' | 'paid';
}

// hooks/useInvoice.ts
export const useInvoice = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['invoice', id],
    queryFn: () => fetchInvoice(id),
  });

  return { invoice: data, isLoading, error };
};

// Usage in component
const { invoice, isLoading } = useInvoice('347');
```

### 10. Add Storybook Stories

```tsx
// components/ui/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Add invoice',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Resolve',
  },
};
```

## Performance Optimizations

### 1. Lazy Load Sections
```tsx
import dynamic from 'next/dynamic';

const LineItemsSection = dynamic(
  () => import('@/components/invoice/LineItemsSection'),
  { ssr: true }
);
```

### 2. Memoize Expensive Calculations
```tsx
const totalAmount = useMemo(
  () => items.reduce((sum, item) => sum + item.total, 0),
  [items]
);
```

### 3. Virtualize Long Lists
```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

// For line items table with 100+ rows
const rowVirtualizer = useVirtualizer({
  count: items.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 60,
});
```

## Testing Improvements

### 1. Add Component Tests
```tsx
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 2. Add E2E Tests
```tsx
// e2e/invoice.spec.ts
import { test, expect } from '@playwright/test';

test('create invoice flow', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('#supplier', 'Acme Corp');
  await page.fill('#buyer', 'XYZ Ltd');
  await page.click('button:has-text("Add item")');
  // ... rest of test
});
```

## Security Enhancements

### 1. Sanitize User Input
```tsx
import DOMPurify from 'isomorphic-dompurify';

const sanitizedInput = DOMPurify.sanitize(userInput);
```

### 2. Add CSRF Protection
```tsx
// Use next-auth or custom middleware
export const config = {
  api: {
    bodyParser: {
      csrf: true,
    },
  },
};
```

## Accessibility Enhancements

### 1. Add Keyboard Shortcuts
```tsx
import { useHotkeys } from 'react-hotkeys-hook';

useHotkeys('ctrl+s', (e) => {
  e.preventDefault();
  handleSave();
});
```

### 2. Improve Focus Management
```tsx
import { FocusScope } from '@react-aria/focus';

<FocusScope contain restoreFocus autoFocus>
  <Modal>{/* content */}</Modal>
</FocusScope>
```

---

**Note**: These are suggestions for scaling the codebase. The current implementation is already production-ready for most use cases.

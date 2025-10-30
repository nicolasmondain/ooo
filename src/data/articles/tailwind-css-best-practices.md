# Tailwind CSS Best Practices for 2024

Tailwind CSS has revolutionized how we write CSS. Here are the best practices to help you build maintainable and beautiful user interfaces.

## 1. Use @apply Sparingly

While `@apply` is convenient, overusing it defeats the purpose of utility-first CSS:

```css
/* ❌ Avoid */
.btn {
  @apply px-4 py-2 bg-blue-500 text-white rounded;
}

/* ✅ Better - Use utilities directly */
<button className="px-4 py-2 bg-blue-500 text-white rounded">
  Click me
</button>
```

## 2. Create Component Abstractions

Instead of repeating utility classes, create React components:

```tsx
export function Button({ children, variant = 'primary' }) {
  const baseClasses = 'px-4 py-2 rounded font-semibold'
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  }
  
  return (
    <button className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </button>
  )
}
```

## 3. Use the Theme Configuration

Extend Tailwind's theme with your brand colors:

```css
@theme {
  --color-brand-primary: #3b82f6;
  --color-brand-secondary: #8b5cf6;
}
```

## 4. Responsive Design First

Always think mobile-first:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Content */}
</div>
```

## 5. Use Dark Mode

Support dark mode from the start:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content that works in both modes
</div>
```

## 6. Organize Classes Logically

Group related utilities together:

```tsx
<div className="
  /* Layout */
  flex items-center justify-between
  /* Spacing */
  p-4 mb-6
  /* Colors */
  bg-white text-gray-900
  /* Effects */
  rounded-lg shadow-md
">
  Content
</div>
```

## 7. Use CSS Variables for Dynamic Values

Combine Tailwind with CSS variables for dynamic styling:

```tsx
<div 
  style={{ '--progress': '75%' } as React.CSSProperties}
  className="w-full bg-gray-200 rounded"
>
  <div className="h-2 bg-blue-500" style={{ width: 'var(--progress)' }} />
</div>
```

## Conclusion

Following these best practices will help you build better, more maintainable applications with Tailwind CSS. Remember: the goal is to write less custom CSS while maintaining code quality.


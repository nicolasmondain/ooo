# 10 TypeScript Tips Every Developer Should Know

TypeScript has become essential for building robust JavaScript applications. Here are ten tips to help you write better TypeScript code.

## 1. Use Strict Mode

Always enable strict mode in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

This enables all strict type checking options.

## 2. Leverage Type Inference

Let TypeScript infer types when possible:

```ts
// ❌ Redundant
const name: string = "John"

// ✅ Better
const name = "John" // TypeScript knows it's a string
```

## 3. Use Union Types

Union types are powerful for handling multiple types:

```ts
type Status = 'loading' | 'success' | 'error'

function handleStatus(status: Status) {
  switch (status) {
    case 'loading':
      return 'Loading...'
    case 'success':
      return 'Success!'
    case 'error':
      return 'Error occurred'
  }
}
```

## 4. Embrace Generics

Generics make your code reusable:

```ts
function first<T>(arr: T[]): T | undefined {
  return arr[0]
}

const num = first([1, 2, 3]) // number | undefined
const str = first(['a', 'b']) // string | undefined
```

## 5. Use Type Guards

Type guards help narrow types:

```ts
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function process(value: unknown) {
  if (isString(value)) {
    // TypeScript knows value is a string here
    console.log(value.toUpperCase())
  }
}
```

## 6. Discriminated Unions

Great for handling different states:

```ts
type Result<T> = 
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }
  | { status: 'loading' }

function handleResult<T>(result: Result<T>) {
  switch (result.status) {
    case 'success':
      return result.data // TypeScript knows data exists
    case 'error':
      return result.error // TypeScript knows error exists
    case 'loading':
      return null
  }
}
```

## 7. Utility Types

Use built-in utility types:

```ts
interface User {
  id: number
  name: string
  email: string
}

// Make all properties optional
type PartialUser = Partial<User>

// Make all properties required
type RequiredUser = Required<PartialUser>

// Pick specific properties
type UserPreview = Pick<User, 'id' | 'name'>

// Omit specific properties
type UserWithoutEmail = Omit<User, 'email'>
```

## 8. Const Assertions

Use `as const` for literal types:

```ts
// Without as const
const colors = ['red', 'blue'] // string[]

// With as const
const colors = ['red', 'blue'] as const // readonly ['red', 'blue']

type Color = typeof colors[number] // 'red' | 'blue'
```

## 9. Never Type for Exhaustiveness

Ensure all cases are handled:

```ts
type Shape = 
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number }

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'square':
      return shape.size ** 2
    default:
      const _exhaustive: never = shape
      return _exhaustive // Compiler error if we add a new shape
  }
}
```

## 10. Type-Safe Event Handlers

Create type-safe event handlers in React:

```ts
import { ChangeEvent, FormEvent } from 'react'

function Form() {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
    </form>
  )
}
```

## Conclusion

These TypeScript tips will help you write more maintainable and type-safe code. Remember: TypeScript is there to help you, not fight you. Embrace its features and your code quality will improve dramatically.

Happy typing! 🎯


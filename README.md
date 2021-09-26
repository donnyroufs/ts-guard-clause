# ts-guard-clause

> yarn add ts-guard-clause

**Before:**

```ts
if (!body.name) {
  throw new Error('Name is undefined')
}

console.log(name)
```

**After:**

```ts
const name = Guard.against.undefined(body.name)

console.log(name)
```

---

## Add Custom Guard Clauses

First you will need to extend the types:

```ts
// @types/ts-guard-clause/index.d.ts
import 'ts-guard-clause'

declare module 'ts-guard-clause' {
  interface IGuardClause {
    hello<T>(prop: T): T
  }
}
```

If everything went well then the AddExtension method will give
you intellisense for the `hello` clause.

```ts
import { Guard, GuardFactory } from 'ts-guard-clause'

GuardFactory.AddExtension('hello', (prop) => prop === 1)

Guard.against.Hello(1) // Throws
```

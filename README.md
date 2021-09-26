# ts-guard-clause

> yarn add ts-guard-clause

**Before:**

```ts
if (body.name !== undefined) {
  throw new Error('Name is undefined')
}

console.log(name)
```

**After:**

```ts
const name = Guard.against.undefined(body.name)

console.log(name)
```

**Shorter version:**

```ts
const name = Against.undefined(body.name)

console.log(name)
```

**Add a custom message/error**

```ts
Guard.against.undefined(body.name, 'Custom Error')
// OR
Guard.against.undefined(body.name, new MyCustomError('Some Error'))
```

---

## Add your own guard clause(s)

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

If everything went well then the AddExtension method will give you intellisense for the `hello` clause.

```ts
import { Guard, GuardFactory } from 'ts-guard-clause'

GuardFactory.AddExtension('hello', (prop) => prop === 1)

Guard.against.Hello(1) // Throws
```

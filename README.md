# ts-guard-clause

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

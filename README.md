# TypeScript Kotlin Extensions

An extension library in TypeScript, to extend the functions of Arrays.

```ts
[1, 2, 3, 4, 5].first() // 1
[1, 2, 3, 4, 5].last() // 5
[null, 2, null, 4, 5].first((e) => e != null) // 2
```

## Designs

Most of functions are copied from Kotlin Standard Library.
Some of them are not very easy to implement, so I used another way to do like the reverse loop parts.

Almost all the functions that throws are turned into returning `undefined` like `first` of an empty array.

## Credit

I like code in Kotlin very much, for its extension methods. So every time I code in TypeScript, I wonder if I can bring that to TS.
And this project just be created.

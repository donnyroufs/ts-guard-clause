export type NonNullish<T> = T extends null | undefined ? never : T
export type NonNullable<T> = T extends null ? never : T
export type NonUndefined<T> = T extends undefined ? never : T
export type CustomError = string | Error
export type Predicate<T> = (prop: T) => boolean

export type GuardClauseFn<T = unknown> = (
  prop: T,
  customError?: CustomError
) => T

import {
  NonNullish,
  NonUndefined,
  CustomError,
  Predicate,
  NonNullable,
} from './types'

export interface IGuardClause {
  null<T>(prop: T, customError?: CustomError): NonNullable<T>
  undefined<T>(prop: T, customError?: CustomError): NonUndefined<T>
  nullish<T>(prop: T, customError?: CustomError): NonNullish<T>
  nullishOrEmpty<T>(prop: T, customError?: CustomError): NonNullish<T>
  expression<T>(prop: T, predicate: Predicate<T>, customError?: CustomError): T
}

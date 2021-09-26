import { CustomError, Predicate } from './types'

export interface IGuardClause {
  null<T>(prop: T, errorHandler?: CustomError): T
  undefined<T>(prop: T, errorHandler?: CustomError): T
  nullish<T>(prop: T, errorHandler?: CustomError): T
  nullishOrEmpty<T>(prop: T, errorHandler?: CustomError): T
  expression<T>(prop: T, predicate: Predicate<T>, errorHandler?: CustomError): T
}

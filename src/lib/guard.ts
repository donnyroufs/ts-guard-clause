import { GuardClauseException } from './guard-clause.exception'
import { IGuardClause } from './guard-clause.interface'
import {
  NonNullish,
  NonUndefined,
  CustomError,
  Predicate,
  NonNullable,
} from './types'

export class Guard implements IGuardClause {
  private constructor() {}

  /**
   * @description makes sure that the given value is not null
   */
  null<T>(prop: T, customError?: CustomError): NonNullable<T> {
    if (prop === null) {
      this.handleThrow('null', customError)
    }

    return prop as unknown as NonNullable<T>
  }

  /**
   * @description makes sure that the given value is not undefined
   */
  undefined<T>(prop: T, customError?: CustomError): NonUndefined<T> {
    if (prop === undefined || typeof prop === 'undefined') {
      this.handleThrow('undefined', customError)
    }

    return prop as NonUndefined<T>
  }

  /**
   * @description makes sure that the given value is not null or undefined
   */
  nullish<T>(prop: T, customError?: CustomError): NonNullish<T> {
    this.null(prop, customError)
    this.undefined(prop, customError)

    return prop as NonNullish<T>
  }

  /**
   * @description makes sure that the given value is not null, undefined and not an empty array.
   */
  nullishOrEmpty<T>(prop: T, customError?: CustomError): NonNullish<T> {
    if (!Array.isArray(prop)) {
      this.handleThrow('nullishOrEmpty', customError)
    }

    if (Array.isArray(prop) && prop.length === 0) {
      this.handleThrow('nullishOrEmpty', customError)
    }

    return prop as unknown as NonNullish<T>
  }

  /**
   * @description guard against a custom expression.
   */
  expression<T>(prop: T, predicate: Predicate<T>, customError?: CustomError) {
    if (predicate(prop)) {
      this.handleThrow('expression', customError)
    }

    return prop
  }

  static get against(): IGuardClause {
    return new Guard()
  }

  private handleThrow(clause: keyof IGuardClause, error?: string | Error) {
    if (!error) {
      throw new GuardClauseException(clause)
    }

    if (this.isError(error)) {
      throw error
    }

    if (typeof error === 'string') {
      throw new GuardClauseException(clause, error)
    }
  }

  private isError(err: string | Error): err is Error {
    return err instanceof Error
  }
}

import { GuardClauseException } from './guard-clause.exception'
import { Guard } from '../lib/guard'
import { IGuardClause } from './guard-clause.interface'
import { Predicate } from './types'

export class GuardFactory {
  /**
   * @description Add a custom guard clause to @Guard
   * make sure to also extend its interface @IGuardClause
   */
  static AddExtension<T>(clause: keyof IGuardClause, predicate: Predicate<T>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(Guard.prototype as any)[clause] = (prop: T, error?: string | Error) => {
      if (predicate(prop)) {
        if (!error) {
          throw new GuardClauseException(clause)
        }

        if (error instanceof Error) {
          throw error
        }

        if (typeof error === 'string') {
          throw new GuardClauseException(clause, error)
        }
      }

      return prop!
    }
  }
}

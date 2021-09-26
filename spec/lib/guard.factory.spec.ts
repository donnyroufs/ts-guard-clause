// @ts-nocheck
import { GuardFactory } from '../../src/lib/guard.factory'
import { Guard } from '../../src/lib/guard'
import { GuardClauseException } from '../../src/lib/guard-clause.exception'

export class CustomError extends Error {}

describe('guard-factory', () => {
  describe('AddExtension', () => {
    beforeAll(() => {
      GuardFactory.AddExtension('sample', (prop) => prop === 1)
    })

    test('throws error', () => {
      const fn = () => Guard.against.sample(1)

      expect(fn).toThrowError(GuardClauseException)
    })

    test('returns the value', () => {
      const result = Guard.against.sample(2)

      expect(result).toBe(2)
    })

    test('throws with a custom message/error', () => {
      const customMessage = () => Guard.against.sample(1, 'error')

      const customError = () =>
        Guard.against.sample(1, new CustomError('error'))

      expect(customMessage).toThrowError(
        new GuardClauseException(undefined!, 'error')
      )
      expect(customError).toThrowError(new CustomError('error'))
    })
  })
})

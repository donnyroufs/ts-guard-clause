import { GuardClauseException } from '../../src/lib/guard-clause.exception'
import { Guard } from '../../src/lib/guard'

export class CustomError extends Error {}

describe('guard', () => {
  let sut: Guard

  beforeAll(() => {
    sut = Guard.against
  })

  test('be defined', () => {
    expect(sut).toBeDefined()
  })

  describe('null', () => {
    test('throws if null', () => {
      const isNullValue = null

      const isNull = () => sut.null(isNullValue)

      expect(isNull).toThrowError(GuardClauseException)
    })

    test('returns the value', () => {
      const isNotNullValue = 'notNull'

      const notNull = sut.null(isNotNullValue)

      expect(notNull).toBe(isNotNullValue)
    })

    test('throws with a custom message/error', () => {
      const isNullValue = null

      const isNull = () => sut.null(isNullValue, 'custom message')
      const isNullCustommError = () =>
        sut.null(isNullValue, new CustomError('custom message'))

      expect(isNull).toThrowError('custom message')
      expect(isNullCustommError).toThrowError(new CustomError('custom message'))
    })
  })

  describe('undefined', () => {
    test('throws if undefined', () => {
      const isUndefinedValue = undefined

      const isUndefined = () => sut.undefined(isUndefinedValue)

      expect(isUndefined).toThrowError(GuardClauseException)
    })

    test('returns the value', () => {
      const isNotUndefinedValue = 'notUndefined'

      const isNotUndefined = sut.undefined(isNotUndefinedValue)

      expect(isNotUndefined).toBe(isNotUndefinedValue)
    })

    test('throws with a custom message/error', () => {
      const isUndefinedValue = undefined

      const isUndefined = () =>
        sut.undefined(isUndefinedValue, 'custom message')
      const isUndefinedCustomError = () =>
        sut.undefined(isUndefinedValue, new CustomError('custom message'))

      expect(isUndefined).toThrowError('custom message')
      expect(isUndefinedCustomError).toThrowError(
        new CustomError('custom message')
      )
    })
  })

  describe('nullish', () => {
    test('throws if undefined or null', () => {
      ;[null, undefined].forEach((v) => {
        const func = () => sut.nullish(v)

        expect(func).toThrowError(GuardClauseException)
      })
    })

    test('returns the value', () => {
      const notNullishValue = 'value'

      const isNotNullish = sut.nullish(notNullishValue)

      expect(isNotNullish).toBe(notNullishValue)
    })

    test('throws with a custom message/error', () => {
      ;[null, undefined].forEach((v) => {
        const customMessage = () => sut.nullish(v, 'error')
        const customError = () => sut.nullish(v, new CustomError('error'))

        expect(customMessage).toThrowError('error')
        expect(customError).toThrowError(new CustomError('error'))
      })
    })
  })

  describe('nullishOrEmpty', () => {
    test('throws if nullish or empty array', () => {
      ;[undefined, null, []].forEach((v) => {
        const fn = () => sut.nullishOrEmpty(v)
        expect(fn).toThrowError(GuardClauseException)
      })
    })

    test('returns the value', () => {
      const notNullishOrEmptyValue = [1]

      const value = sut.nullishOrEmpty(notNullishOrEmptyValue)

      expect(value).toEqual(notNullishOrEmptyValue)
    })

    test('throws with a custom message/error', () => {
      ;[undefined, null, []].forEach((v) => {
        const customMessage = () => sut.nullishOrEmpty(v, 'error')
        const customError = () =>
          sut.nullishOrEmpty(v, new CustomError('error'))

        expect(customMessage).toThrowError('error')
        expect(customError).toThrowError(new CustomError('error'))
      })
    })
  })

  describe('expression', () => {
    test('throws if predicare is truthy', () => {
      const prop = {}

      const fn = () => sut.expression(prop, (p) => Object.keys(p).length === 0)
      const noThrowFn = () =>
        sut.expression(prop, (p) => Object.keys(p).length !== 0)

      expect(fn).toThrowError(GuardClauseException)
      expect(noThrowFn).not.toThrow()
    })

    test('returns the value', () => {
      const prop = {
        id: 1,
      }

      const value = sut.expression(prop, (p) => Object.keys(p).length === 0)

      expect(value).toEqual(prop)
    })

    test('throws with a custom message/error', () => {
      const prop = {
        id: 1,
      }

      const customMessage = () =>
        sut.expression(prop, (p) => p.id === 1, 'error')
      const customError = () =>
        sut.expression(prop, (p) => p.id === 1, new CustomError('error'))

      expect(customMessage).toThrowError('error')
      expect(customError).toThrowError(new CustomError('error'))
    })
  })
})

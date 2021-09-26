import { IGuardClause } from './guard-clause.interface'

export class GuardClauseException extends Error {
  constructor(clause: keyof IGuardClause, message?: string) {
    message ??= `Failed against ${clause} clause.`

    super(message)
  }
}

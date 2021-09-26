import { Guard as LibGuard } from './lib/guard'

export * from './lib/guard-clause.exception'
export * from './lib/guard-clause.interface'
export * from './lib/types'

export const Guard = LibGuard
export const Against = LibGuard.against

export default Guard

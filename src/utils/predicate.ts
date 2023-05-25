export type Predicate<T> = (what: T) => boolean

/**
 * @deprecated Use `Predicate<T>` instead
 */
export type PredicateLike<T> = ((what: T) => boolean)

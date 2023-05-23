export interface Predicate<T> {
    (): boolean
}

export type PredicateLike<T> = Predicate<T> | ((what: T) => boolean)

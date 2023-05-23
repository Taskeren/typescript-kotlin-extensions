export interface Transform<T, R> {
    (what: T): R
}

export type TransformLike<T, R> = Transform<T, R> | ((what: T) => R)

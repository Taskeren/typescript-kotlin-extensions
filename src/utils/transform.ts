import { Comparable } from "./comparable"

export interface Transform<T, R> {
    (what: T): R
}

export type TransformLike<T, R> = Transform<T, R> | ((what: T) => R)
export type TransformComparableLike<T, R extends Comparable<R>> = TransformLike<T, R>

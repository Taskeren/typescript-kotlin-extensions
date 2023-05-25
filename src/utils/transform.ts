import { Comparable } from "./comparable"

export type Transform<T, R> = (what: T) => R
export type TransformComparable<T, R extends Comparable<R>> = Transform<T, R>

/**
 * @deprecated Use `Transform<T, R>` instead
 */
export type TransformLike<T, R> = Transform<T, R> | ((what: T) => R)

/**
 * @deprecated Use `TransformComparable<T, R>` instead
 */
export type TransformComparableLike<T, R extends Comparable<R>> = Transform<T, R>

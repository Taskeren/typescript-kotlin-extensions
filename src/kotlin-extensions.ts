import { Random } from "random-js"
import { Comparable } from "./utils/comparable"
import { PredicateLike } from "./utils/predicate"
import { TransformLike } from "./utils/transform"

export * from "./arrays/arrays"
export * from "./utils/comparable"
export * from "./utils/generators"
export * from "./numbers/numbers"
export * from "./utils/predicate"
export * from "./utils/transform"

declare global {
    interface Array<T> {
        contains(element: T): boolean
        elementAt(index: number): T | undefined
        elementAtOrElse(index: number, defaultValue: (index: number) => T): T
        elementAtOrNull(index: number): T | null
        find(predicate: PredicateLike<T>): T | undefined
        findLast(predicate: PredicateLike<T>): T | undefined
        first(predicate?: PredicateLike<T>): T | undefined
        firstNotNullOf<R>(transform: TransformLike<T, R>): R | undefined
        firstNotNullOfOrNull<R>(transform: TransformLike<T, R>): R | null
        firstOrNull(predicate?: PredicateLike<T>): T | null
        getOrElse(index: number, defaultValue: (index: number) => T): T
        getOrNull(index: number): T | null
        indexOf(element: T): number | -1
        indexOfFirst(predicate: PredicateLike<T>): number | -1
        indexOfLast(predicate: PredicateLike<T>): number | -1
        last(predicate?: PredicateLike<T>): T | undefined
        lastIndexOf(element: T): number | -1
        lastOrNull(predicate?: PredicateLike<T>): T | null
        random(random?: Random): T | undefined
        randomOrNull(random?: Random): T | null
        /**
         * Returns the single element, or throws an exception if the array is empty or has more than one element.
         */
        single(predicate?: PredicateLike<T>): T | undefined
        singleOrNull(predicate?: PredicateLike<T>): T | null
        drop(count: number): Array<T>
        dropLast(count: number): Array<T>
        dropLastWhile(predicate: PredicateLike<T>): Array<T>
        dropWhile(predicate: PredicateLike<T>): Array<T>
        // filter, filterIndexed: JS has its standard implementation
        // filterIsInstance, filterIsInstanceTo: unable to implement on TS, because the type are wiped on runtime
        filterNot(predicate: PredicateLike<T>): Array<T>
        filterNotNull(): Array<T>
        filterNotNullTo(destination: Array<T>): Array<T>
        filterNotTo(destination: Array<T>, predicate: PredicateLike<T>): Array<T>
        filterTo(destination: Array<T>, predicate: PredicateLike<T>): Array<T>
        slice(start: number, endInclusive: number): Array<T>
        // slice(Iterable<Int>): unable to use the same name for a function, so renamed to sliceIndices
        sliceIndices(indices: number[]): Array<T>
        // sliceArray: skipped because I don't know what is the difference to sliceIndices
        take(count: number): Array<T>
        takeLast(count: number): Array<T>
        takeLastWhile(predicate: PredicateLike<T>): Array<T>
        takeWhile(predicate: PredicateLike<T>): Array<T>
        // reverse: JS has its standard implementation, and exact same with the KT's
        // reverse(Int, Int): unable to use the same name for a function, so renamed to reverseRange
        reverseRange(fromIndex: number, toIndex: number): void
        reversed(): Array<T>
        // reversedArray: skipped because there is no difference between reversed and reversedArray
        shuffle(random?: Random): void

        copyOfRange(start: number, endInclusive: number): Array<T>

        /* added by kotlin-extensions: inspired from `firstNotNullOf` and `firstNotNullOfOrNull` */
        firstTruthyOf<R>(transform: TransformLike<T, R>): R | undefined
        firstTruthyOfOrNull<R>(transform: TransformLike<T, R>): R | null
        /* end */
    }

    interface Number extends Comparable<Number> {
        coerceAtLeast(minimumValue: number): number
        coerceAtMost(maximumValue: number): number
        coerceIn(minimumValue: number, maximumValue: number): number
    }
}
import { Random } from "random-js"
import { Comparable, Comparator } from "./utils/comparable"
import { Predicate } from "./utils/predicate"
import { Transform, TransformComparable } from "./utils/transform"
import { Pair } from "./utils/pair"
import { Grouping } from "./utils/grouping"

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
		find(predicate: Predicate<T>): T | undefined
		findLast(predicate: Predicate<T>): T | undefined
		first(predicate?: Predicate<T>): T | undefined
		firstNotNullOf<R>(transform: Transform<T, R>): R | undefined
		firstNotNullOfOrNull<R>(transform: Transform<T, R>): R | null
		firstOrNull(predicate?: Predicate<T>): T | null
		getOrElse(index: number, defaultValue: (index: number) => T): T
		getOrNull(index: number): T | null
		indexOf(element: T): number | -1
		indexOfFirst(predicate: Predicate<T>): number | -1
		indexOfLast(predicate: Predicate<T>): number | -1
		last(predicate?: Predicate<T>): T | undefined
		lastIndexOf(element: T): number | -1
		lastOrNull(predicate?: Predicate<T>): T | null
		random(random?: Random): T | undefined
		randomOrNull(random?: Random): T | null
		/**
		 * Returns the single element, or throws an exception if the array is empty or has more than one element.
		 */
		single(predicate?: Predicate<T>): T | undefined
		singleOrNull(predicate?: Predicate<T>): T | null
		drop(count: number): Array<T>
		dropLast(count: number): Array<T>
		dropLastWhile(predicate: Predicate<T>): Array<T>
		dropWhile(predicate: Predicate<T>): Array<T>
		// filter, filterIndexed: JS has its standard implementation
		// filterIsInstance, filterIsInstanceTo: unable to implement on TS, because the type are wiped on runtime
		filterNot(predicate: Predicate<T>): Array<T>
		filterNotNull(): Array<T>
		filterNotNullTo(destination: Array<T>): Array<T>
		filterNotTo(
			destination: Array<T>,
			predicate: Predicate<T>
		): Array<T>
		filterTo(destination: Array<T>, predicate: Predicate<T>): Array<T>
		slice(start: number, endInclusive: number): Array<T>
		// slice(Iterable<Int>): unable to use the same name for a function, so renamed to sliceIndices
		sliceIndices(indices: number[]): Array<T>
		// sliceArray: skipped because I don't know what is the difference to sliceIndices
		take(count: number): Array<T>
		takeLast(count: number): Array<T>
		takeLastWhile(predicate: Predicate<T>): Array<T>
		takeWhile(predicate: Predicate<T>): Array<T>
		// reverse: JS has its standard implementation, and exact same with the KT's
		// reverse(Int, Int): unable to use the same name for a function, so renamed to reverseRange
		reverseRange(fromIndex: number, toIndex: number): void
		reversed(): Array<T>
		// reversedArray: skipped because there is no difference between reversed and reversedArray
		shuffle(random?: Random): this
		sortBy<R extends Comparable<R>>(
			selector: TransformComparable<T, R>
		): this
		sortByDescending<R extends Comparable<R>>(
			selector: TransformComparable<T, R>
		): this
		// sortDescending: definition extened below
		sorted(): Array<T>
		// sortedArray: skipped because there is no difference between sorted and sortedArray
		// sortedArrayDescending: skipped because there is no difference between sortedDescending and sortedArrayDescending
		sortedBy<R extends Comparable<R>>(
			selector: TransformComparable<T, R>
		): Array<T>
		sortedByDescending<R extends Comparable<R>>(
			selector: TransformComparable<T, R>
		): Array<T>
        sortedDescending(): Array<T>
		sortedWith(comparator: Comparator<T>): Array<T>
		// asList: skipped, you know why.
		contentDeepEquals(other: Array<T>): boolean
		// contentDeepHashCode: skipped
		// contentDeepToString: skipped
		contentEquals(other: Array<T>): boolean
		// contentHashCode: skipped
		// contentToString: skipped
        copyInto(destination: Array<T>, destinationOffset?: number, startIndex?: number, endIndex?: number): Array<T>
		copyOf(newSize?: number): Array<T>
		copyOfRange(start: number, endInclusive: number): Array<T>
		fill(element: T, startIndex?: number, endIndex?: number): this
		// indices: skipped
		isEmpty(): boolean
		isNotEmpty(): boolean
		lastIndex(): number // transformed into function due to the language limits
		// plus: skipped, because JS/TS cannot overwrite the operator functions
		/**
		 * Modified version of sort. If the comparator is not pass in, it will use the default order instead of the JS one.
		 *
		 * @param comparator the comparator
		 */
		sort(comparator?: Comparator<T>): this
        sortDescending(comparator?: Comparator<T>, fromIndex?: number, toIndex?: number): this
        sortWith(comparator: Comparator<T>, fromIndex?: number, toIndex?: number): this
		// toBooleanArray, toByteArray, toCharArray, toDoubleArray, toFloatArray, toIntArray, toLongArray, toShortArray, toTypedArray: skipped
		associate<K, V>(transform: Transform<T, Pair<K, V>>): Map<K, V>
		associateBy<K, V>(keySelector: Transform<T, K>): Map<K, V>
		associateByTo<K, V>(destination: Map<K, V>, keySelector: Transform<T, K>): Map<K, V>
		associateTo<K, V>(destination: Map<K, V>, transform: Transform<T, Pair<K, V>>): Map<K, V>
		associateWith<K, V>(valueTransform: Transform<T, V>): Map<K, V>
		associateWithTo<K, V>(destination: Map<K, V>, valueTransform: Transform<T, V>): Map<K, V>
		// toCollection: skipped
		// toHashSet: skipped
		// toList: skipped
		// toMutableList: skipped
		toSet(): Set<T>
		// flatMap: in JS std
		// flatMapIndexed: in JS std, use flatMap
		flatMapTo<R, C extends Array<R>>(destination: C, transform: Transform<T, Iterable<R>>): Array<T>
		groupBy<K, V = T>(keySelector: Transform<T, K>, valueSelector?: Transform<T, V>): Map<K, Array<V>>
		groupByTo<M extends Map<K, Array<T>>, K, V = T>(destination: M, keySelector: Transform<T, K>, valueSelector?: Transform<T, V>): M
		groupingBy<K>(keySelector: Transform<T, K>): Grouping<T, K>
		// map: skipped
		// mapIndexed: skipped
		mapNotNull<R>(transform?: Transform<T, R | null>): Array<R>
		mapNotNullTo<R, C extends Array<R>>(destination: C, transform?: Transform<T, R | null>): C
		mapTo<R, C extends Array<R>>(destination: C, transform: Transform<T, R>): C
		withIndex(): Array<[number, T]>
		distinct(): Array<T>
		distinctBy<K>(selector: Transform<T, K>): Array<T>
		intersect(other: Iterable<T>): Set<T>
		subtract(other: Iterable<T>): Set<T>
		// toMutableSet: skipped
		union(other: Iterable<T>): Set<T>

		/* added by kotlin-extensions: inspired from `firstNotNullOf` and `firstNotNullOfOrNull` */
		firstTruthyOf<R>(transform: Transform<T, R>): R | undefined
		firstTruthyOfOrNull<R>(transform: Transform<T, R>): R | null
		/* end */
	}

	interface Number {
		compareTo(other: number): number
		coerceAtLeast(minimumValue: number): number
		coerceAtMost(maximumValue: number): number
		coerceIn(minimumValue: number, maximumValue: number): number
	}
}

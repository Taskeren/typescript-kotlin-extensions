export interface Comparable<T> {
	compareTo(other: T): number
}

export type Comparator<T> = (a: T, b: T) => number

export function NaturalOrder<T>(): Comparator<Comparable<any>> {
	return (a, b) => a.compareTo(b)
}

export function ReverseOrder<T>(): Comparator<Comparable<any>> {
	return (a, b) => b.compareTo(a)
}

export function getReversedComparator<T extends Comparable<T>>(
	comparator: Comparator<T>
): Comparator<T> {
	return (a: T, b: T) => comparator(b, a)
}

export function compareBy<T>(
	selector: (what: T) => Comparable<unknown>
): Comparator<T> {
	return (a, b) => compareValues(selector(a), selector(b))
}

export function compareByDescending<T>(
	selector: (what: T) => Comparable<unknown>
): Comparator<T> {
	return (a, b) => compareValues(selector(b), selector(a))
}

export function compareValuesBy<T>(
	a: T,
	b: T,
	selector: (what: T) => Comparable<unknown>
): number {
	return compareValues(selector(a), selector(b))
}

export function compareValues<T extends Comparable<unknown>>(
	x: T | null,
	y: T | null
): number {
	if (x === y) return 0
	if (x == null) return -1
	if (y == null) return 1

	return x.compareTo(y)
}

export type ComparableType<T> = T & Comparable<T>

export function makeComparable(origin: number): ComparableType<number> {
	Object.getPrototypeOf(origin).compareTo = function(other) {
		return this === other ? 0 : this > other ? 1 : -1
	}
	return origin as ComparableType<number>
}
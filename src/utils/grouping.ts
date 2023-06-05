export abstract class Grouping<T, K> {
	abstract sourceIterator(): IterableIterator<T>

	abstract keyOf(element: T): K

	aggregate<R>(
		operation: (
			key: K,
			accumulator: R | null,
			element: T,
			first: boolean,
		) => R,
	): Map<K, R> {
		return this.aggregateTo(new Map(), operation)
	}

	aggregateTo<R, M extends Map<K, R>>(
		destination: M,
		operation: (
			key: K,
			accumulator: R | null,
			element: T,
			first: boolean,
		) => R,
	): M {
		for(let el of this.sourceIterator()) {
			let key = this.keyOf(el)
			let accumulator = destination.get(key)
			destination.set(
				key,
				operation(
					key,
					accumulator,
					el,
					accumulator == null && !destination.has(key),
				),
			)
		}
		return destination
	}

	/**
	 * Groups elements from the [Grouping] source by key and applies [operation] to the elements of each group sequentially,
	 * passing the previously accumulated value and the current element as arguments, and stores the results in a new map.
	 * An initial value of accumulator is provided by [initialValueSelector] function.
	 *
	 * @ts-kt see also `foldInitial`
	 *
	 * @param initialValueSelector a function that provides an initial value of accumulator for each group.
	 *  It's invoked with parameters:
	 *  - `key`: the key of the group;
	 *  - `element`: the first element being encountered in that group.
	 *
	 * @param operation a function that is invoked on each element with the following parameters:
	 *  - `key`: the key of the group this element belongs to;
	 *  - `accumulator`: the current value of the accumulator of the group;
	 *  - `element`: the element from the source being accumulated.
	 *
	 * @return a [Map] associating the key of each group with the result of accumulating the group elements.
	 * @sample samples.collections.Grouping.foldByEvenLengthWithComputedInitialValue
	 */
	fold<R>(
		initialValueSelector: (key: K, element: T) => R,
		operation: (key: K, accumulator: R, element: T) => R,
	): Map<K, R> {
		return this.aggregate(
			(key, accumulator, element, first) =>
				operation(
					key,
					first
						? initialValueSelector(key, element)
						: (accumulator as R),
					element,
				),
		)
	}

	/**
	 * Groups elements from the [Grouping] source by key and applies [operation] to the elements of each group sequentially,
	 * passing the previously accumulated value and the current element as arguments,
	 * and stores the results in the given [destination] map.
	 * An initial value of accumulator is provided by [initialValueSelector] function.
	 *
	 * @ts-kt see also `foldToInitial`
	 *
	 * @param destination
	 * @param initialValueSelector a function that provides an initial value of accumulator for each group.
	 *  It's invoked with parameters:
	 *  - `key`: the key of the group;
	 *  - `element`: the first element being encountered in that group.
	 *
	 * If the [destination] map already has a value corresponding to some key, that value is used as an initial value of
	 * the accumulator for that group and the [initialValueSelector] function is not called for that group.
	 *
	 * @param operation a function that is invoked on each element with the following parameters:
	 *  - `key`: the key of the group this element belongs to;
	 *  - `accumulator`: the current value of the accumulator of the group;
	 *  - `element`: the element from the source being accumulated.
	 *
	 * @return the [destination] map associating the key of each group with the result of accumulating the group elements.
	 */
	foldTo<R, M extends Map<K, R>>(
		destination: M,
		initialValueSelector: (key: K, element: T) => R,
		operation: (key: K, accumulator: R, element: T) => R,
	): M {
		return this.aggregateTo(
			destination,
			(key, accumulator, element, first) =>
				operation(
					key,
					first
						? initialValueSelector(key, element)
						: (accumulator as R),
					element,
				),
		)
	}

	/**
	 * Groups elements from the [Grouping] source by key and applies [operation] to the elements of each group sequentially,
	 * passing the previously accumulated value and the current element as arguments, and stores the results in a new map.
	 * An initial value of accumulator is the same [initialValue] for each group.
	 *
	 * @ts-kt Replacement of `fold`, to prevent name collision.
	 *
	 * @param initialValue
	 * @param operation a function that is invoked on each element with the following parameters:
	 *  - `accumulator`: the current value of the accumulator of the group;
	 *  - `element`: the element from the source being accumulated.
	 *
	 * @return a [Map] associating the key of each group with the result of accumulating the group elements.
	 */
	foldInitial<R>(
		initialValue: R,
		operation: (accumulator: R, element: T) => R,
	) {
		return this.aggregate<R>((_, acc, e, first) => operation((first ? initialValue : acc as R), e))
	}

	/**
	 * Groups elements from the [Grouping] source by key and applies [operation] to the elements of each group sequentially,
	 * passing the previously accumulated value and the current element as arguments,
	 * and stores the results in the given [destination] map.
	 * An initial value of accumulator is the same [initialValue] for each group.
	 *
	 * If the [destination] map already has a value corresponding to the key of some group,
	 * that value is used as an initial value of the accumulator for that group.
	 *
	 * @param destination
	 * @param initialValue
	 * @param operation a function that is invoked on each element with the following parameters:
	 *  - `accumulator`: the current value of the accumulator of the group;
	 *  - `element`: the element from the source being accumulated.
	 *
	 * @return the [destination] map associating the key of each group with the result of accumulating the group elements.
	 */
	foldToInitial<R, M extends Map<K, R>>(
		destination: M,
		initialValue: R,
		operation: (accumulator: R, element: T) => R,
	) {
		return this.aggregateTo<R, M>(destination, (_, acc, e, first) => operation((first ? initialValue : acc as R), e))
	}

	/**
	 * Groups elements from the [Grouping] source by key and counts elements in each group to the given [destination] map.
	 *
	 * If the [destination] map already has a value corresponding to the key of some group,
	 * that value is used as an initial value of the counter for that group.
	 *
	 * @return the [destination] map associating the key of each group with the count of elements in the group.
	 */
	eachCountTo<M extends Map<K, number>>(destination: M): M {
		return this.foldToInitial(destination, 0, (acc, _) => acc + 1)
	}

	// in GroupingJVM.kt: eachCount is optimized, so it is not in the std
	eachCount() {
		return this.eachCountTo<Map<K, number>>(new Map())
	}

}

// TODO: find someway to make these function in the class

/**
 * Groups elements from the [Grouping] source by key and applies the reducing [operation] to the elements of each group
 * sequentially starting from the second element of the group,
 * passing the previously accumulated value and the current element as arguments,
 * and stores the results in a new map.
 * An initial value of accumulator is the first element of the group.
 *
 * @param grouping
 * @param operation a function that is invoked on each subsequent element of the group with the following parameters:
 *  - `key`: the key of the group this element belongs to;
 *  - `accumulator`: the current value of the accumulator of the group;
 *  - `element`: the element from the source being accumulated.
 *
 * @return a [Map] associating the key of each group with the result of accumulating the group elements.
 */
function reduce<S, T extends S, K>(grouping: Grouping<T, K>, operation: (key: K, accumulator: S, element: T) => S): Map<K, S> {
	return grouping.aggregate<S>((key, acc, e, first) => first ? e : operation(key, acc as S, e))
}

/**
 * Groups elements from the [Grouping] source by key and applies the reducing [operation] to the elements of each group
 * sequentially starting from the second element of the group,
 * passing the previously accumulated value and the current element as arguments,
 * and stores the results in the given [destination] map.
 * An initial value of accumulator is the first element of the group.
 *
 * If the [destination] map already has a value corresponding to the key of some group,
 * that value is used as an initial value of the accumulator for that group and the first element of that group is also
 * subjected to the [operation].

 * @param destination
 * @param grouping
 * @param operation a function that is invoked on each subsequent element of the group with the following parameters:
 *  - `accumulator`: the current value of the accumulator of the group;
 *  - `element`: the element from the source being folded;
 *
 * @return the [destination] map associating the key of each group with the result of accumulating the group elements.
 * @sample samples.collections.Grouping.reduceByMaxVowelsTo
 */
function reduceTo<S, T extends S, K, M extends Map<K, S>>(
	grouping: Grouping<T, K>,
	destination: M,
	operation: (key: K, accumulator: S, element: T) => S,
) {
	return grouping.aggregateTo<S, M>(destination, (key, acc, e, first) => first ? e : operation(key, acc as S, e))
}

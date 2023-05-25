import { Random } from "random-js"
import "../kotlin-extensions"
import { TODO } from "../utils/todo"
import { Comparable, Comparator, NaturalOrder, ReverseOrder, compareBy, compareByDescending, getReversedComparator } from "../utils/comparable"

const DefaultRandom = new Random()

Array.prototype.contains = Array.prototype.includes
Array.prototype.elementAt = Array.prototype.at
Array.prototype.elementAtOrElse = function (index, defaultValue) {
	return isInBound(this, index) ? this.elementAt(index) : defaultValue(index)
}
Array.prototype.elementAtOrNull = function (index) {
	return isInBound(this, index) ? this.elementAt(index) : null
}
Array.prototype.find = function (predicate) {
	return this.firstOrNull(predicate) || undefined // covert to undefined, as the return type is T | undefined
}
Array.prototype.findLast = function (predicate) {
	return this.lastOrNull(predicate) || undefined // covert to undefined, as the return type is T | undefined
}
Array.prototype.first = function (predicate) {
	return predicate === undefined
		? this.at(0)
		: this.firstOrNull(predicate) || undefined
}
Array.prototype.last = function (predicate) {
	return predicate === undefined
		? this.at(this.length - 1)
		: this.lastOrNull(predicate) || undefined
}
Array.prototype.firstNotNullOf = function (transform) {
	let result = this.firstNotNullOfOrNull(transform)
	return result || undefined
}
Array.prototype.firstNotNullOfOrNull = function (transform) {
	for (let el of this) {
		let result = transform(el)
		if (result !== null) {
			return result
		}
	}
	return null
}
Array.prototype.firstTruthyOf = function (transform) {
	let result = this.firstTruthyOfOrNull(transform)
	return result || undefined
}
Array.prototype.firstTruthyOfOrNull = function (transform) {
	for (let el of this) {
		let result = transform(el)
		if (result) {
			return result
		}
	}
	return null
}
Array.prototype.firstOrNull = function (predicate) {
	if (predicate === undefined) {
		return this.at(0) || null
	}
	for (let el of this) if (predicate(el)) return el
	return null
}
Array.prototype.getOrElse = function (index, defaultValue) {
	return isInBound(this, index) ? this.at(index) : defaultValue(index)
}
Array.prototype.getOrNull = function (index) {
	return isInBound(this, index) ? this.at(index) : null
}
Array.prototype.indexOf = function (element) {
	if (element === null) {
		for (let i = 0; i < this.length; i++) {
			let el = this.at(i)
			if (el === null) return i
		}
	} else {
		for (let i = 0; i < this.length; i++) {
			let el = this.at(i)
			if (element === el) return i
		}
	}
	return -1
}
Array.prototype.indexOfFirst = function (predicate) {
	for (let i = 0; i < this.length; i++) {
		let el = this.at(i)
		if (predicate(el)) return i
	}
	return -1
}
Array.prototype.indexOfLast = function (predicate) {
	for (let i = this.length - 1; i >= 0; i--) {
		let el = this.at(i)
		if (predicate(el)) return i
	}
	return -1
}
Array.prototype.lastIndexOf = function (element) {
	if (element === null) {
		for (let i = this.length - 1; i >= 0; i--) {
			let el = this.at(i)
			if (el === null) return i
		}
	} else {
		for (let i = this.length - 1; i >= 0; i--) {
			let el = this.at(i)
			if (element === el) return i
		}
	}
	return -1
}
Array.prototype.lastOrNull = function (predicate) {
	if (predicate === undefined) {
		return this.at(this.length - 1) || null
	}
	// reverse loop
	for (let i = this.length - 1; i >= 0; i--) {
		let el = this.at(i)
		if (predicate(el)) return el
	}
	return null
}
Array.prototype.random = function (rand = DefaultRandom) {
	return this.length == 0 ? undefined : this[rand.integer(0, this.length - 1)]
}
Array.prototype.randomOrNull = function (rand = DefaultRandom) {
	return this.length == 0 ? null : this[rand.integer(0, this.length - 1)]
}
Array.prototype.single = function (predicate) {
	if (predicate === undefined) {
		if (this.length == 1) {
			return this.at(0)
		} else if (this.length == 0) {
			throw new Error("Array is empty.")
		} else {
			throw new Error("Array has more than one element.")
		}
	} else {
		let single = undefined
		let found = false
		for (let el of this) {
			if (predicate(el)) {
				if (found) {
					throw new Error(
						"Array contains more than one matching element."
					)
				}
				single = el
				found = true
			}
		}
		if (!found) {
			throw new Error("Array contains no element matching the predicate.")
		}
		return single
	}
}
Array.prototype.singleOrNull = function (predicate) {
	if (predicate === undefined) {
		return this.length == 1 ? this.at(0) : null
	} else {
		let single = undefined
		let found = false
		for (let el of this) {
			if (predicate(el)) {
				if (found) {
					return null
				}
				single = el
				found = true
			}
		}
		if (!found) return null
		return single
	}
}
Array.prototype.drop = function (n) {
	if (n < 0)
		throw new Error(`Requested element count ${n} is less than zero.`)
	return this.takeLast((this.length - n).coerceAtLeast(0))
}
Array.prototype.dropLast = function (n) {
	if (n < 0)
		throw new Error(`Requested element count ${n} is less than zero.`)
	return this.take((this.length - n).coerceAtLeast(0))
}
Array.prototype.dropLastWhile = function (predicate) {
	for (let i = this.length - 1; i >= 0; i--) {
		let el = this.at(i)
		if (!predicate(el)) {
			return this.take(i + 1)
		}
	}
	return []
}
Array.prototype.dropWhile = function (predicate) {
	let yielding = false
	let array = []
	for (let item of this) {
		if (yielding) {
			array.push(item)
		} else if (!predicate(item)) {
			array.push(item)
			yielding = true
		}
	}
	return array
}
Array.prototype.filterNot = function (predicate) {
	return this.filterNotTo([], predicate)
}
Array.prototype.filterNotNull = function () {
	return this.filterNotNullTo([])
}
Array.prototype.filterNotNullTo = function (destination) {
	for (let el of this) if (el !== null) destination.push(el)
	return destination
}
Array.prototype.filterNotTo = function (destination, predicate) {
	for (let el of this) if (!predicate(el)) destination.push(el)
	return destination
}
Array.prototype.filterTo = function (destination, predicate) {
	for (let el of this) if (predicate(el)) destination.push(el)
	return destination
}
Array.prototype.slice = function (start, end) {
	if (isIndicesEmpty(start, end)) return []
	return this.copyOfRange(start, end + 1)
}
Array.prototype.sliceIndices = function (indices) {
	if (indices.length == 0) return []
	let array = []
	for (let index of indices) {
		if (isInBound(this, index)) {
			array.push(this.at(index))
		}
	}
	return array
}
Array.prototype.take = function (n) {
	if (n < 0)
		throw new Error(`Requested element count ${n} is less than zero.`)

	if (n == 0) return []
	if (n >= this.length) [...this]
	if (n == 1) return [this.at(0)]

	let count = 0
	let array = []
	for (let item of this) {
		array.push(item)
		if (++count == n) break
	}
	return array
}
Array.prototype.takeLast = function (n) {
	if (n < 0)
		throw new Error(`Requested element count ${n} is less than zero.`)

	if (n == 0) return []
	if (n >= this.length) [...this]
	if (n == 1) [this.at(this.length - 1)]

	let array = []
	for (let i = this.length - n; i < this.length; i++) {
		array.push(this.at(i))
	}
	return array
}
Array.prototype.takeLastWhile = function (predicate) {
	for (let i = this.length - 1; i >= 0; i--) {
		if (!predicate(this.at(i))) {
			return this.drop(i + 1)
		}
	}
	return []
}
Array.prototype.takeWhile = function (predicate) {
	let array = []
	for (let item of this) {
		if (!predicate(item)) break
		array.push(item)
	}
	return array
}
Array.prototype.reverseRange = function (fromIndex, toIndex) {
	checkRangeIndexes(fromIndex, toIndex, this.length)
	let midPoint = (fromIndex + toIndex) / 2
	if (fromIndex == midPoint) return
	let reverseIndex = toIndex - 1
	for (let index = fromIndex; index < midPoint; index++) {
		let tmp = this.at(index)
		this[index] = this[reverseIndex]
		this[reverseIndex] = tmp
		reverseIndex--
	}
}
Array.prototype.reversed = function () {
	return this.copyOf().reverse()
}
Array.prototype.shuffle = function (rand = DefaultRandom) {
	for (let i = this.length - 1; i >= 1; i--) {
		let j = rand.integer(0, i + 1)
		let tmp = this.at(i)
		this[i] = this[j]
		this[j] = tmp
	}
}
Array.prototype.sortBy = function (selector) {
	if (this.length > 1) this.sortWith(compareBy(selector))
	return this
}
Array.prototype.sortByDescending = function (selector) {
	if (this.length > 1) this.sortWith(compareByDescending(selector))
	return this
}
Array.prototype.sorted = function () {
	if (this.length == 0) return this
	return this.copyOf().sort()
}
Array.prototype.sortedBy = function (selector) {
	return this.sortedWith(compareBy(selector))
}
Array.prototype.sortedByDescending = function (selector) {
	return this.sortedWith(compareByDescending(selector))
}
Array.prototype.sortedDescending = function () {
	return this.sortedWith(ReverseOrder())
}
Array.prototype.sortedWith = function (comparator) {
	if (this.length == 0) return this
	let copy = this.copyOf()
	copy.sortWith(comparator)
	return copy
}
Array.prototype.contentDeepEquals = function (array) {
	if(this.length != array.length) return false
	for (let i = 0; i < this.length; i++) {
		if (this.at(i) !== array.at(i)) return false
	}
	return true
}
Array.prototype.contentEquals = function (array) {
	if(this.length != array.length) return false
	for (let i = 0; i < this.length; i++) {
		if (this.at(i) != array.at(i)) return false
	}
	return true
}
Array.prototype.copyInto = function (destination, offset = 0, startIndex = 0, endIndex = this.length) {
	for(let i = 0; i < endIndex - startIndex; i ++) {
		destination[i + offset] = this[i + startIndex]
	}
	return destination
}
Array.prototype.copyOf = function (size) {
	if (size === undefined) {
		return [...this]
	} else {
		let array = new Array(size)
		for (let i = 0; i < size; i++) array[i] = this.at(i)
		return array
	}
}
Array.prototype.copyOfRange = function (start, end) {
	let result = []
	for (let i = start; i < end; i++) result.push(this.at(i))
	return result
}
Array.prototype.fill = function (value, start = 0, end = this.length) {
	for (let i = start; i < end; i++) this[i] = value
	return this
}
Array.prototype.isEmpty = function () {
	return this.length == 0
}
Array.prototype.isNotEmpty = function () {
	return this.length > 0
}
Array.prototype.lastIndex = function () {
	return this.length - 1
}
// capture the original sorter
let originSort = Array.prototype.sort
Array.prototype.sort = function (comparator) {
	// change the comparator logic if it is not provided.
	// this can fix the sorting problem in TS, but may broke some scripts.
	// You can disable this feature later.
	// TODO: Add feature to disable this
	if (comparator === undefined) {
		comparator = NaturalOrder()
	}
	return originSort.call(this, comparator)
}
Array.prototype.sortDescending = function (comparator, fromIndex = 0, toIndex = this.length) {
	// reverse the comparator
	if(comparator === undefined) {
		comparator = ReverseOrder()
	} else {
		comparator = getReversedComparator(comparator)
	}
	return this.sortWith(comparator, fromIndex, toIndex)
}
Array.prototype.sortWith = function(comparator, fromIndex = 0, toIndex = this.length) {
	if (comparator === undefined) {
		comparator = NaturalOrder()
	}
	if(fromIndex == 0 && toIndex == this.length) {
		return originSort.call(this, comparator)
	}

	// ranged sort
	let copyRange = this.copyOfRange(fromIndex, toIndex)
	copyRange.sortWith(comparator)
	for(let i = fromIndex; i < toIndex; i++) {
		this[i] = copyRange.at(i)
	}
	return this
}
Array.prototype.associate = function (transform) {
	return this.associateTo(new Map(), transform)
}
Array.prototype.associateBy = function (keySelector) {
	return this.associateByTo(new Map(), keySelector)
}
Array.prototype.associateByTo = function (destination, keySelector) {
	for(let el of this) {
		destination.set(keySelector(el), el)
	}
	return destination
}
Array.prototype.associateTo = function (destination, transform) {
	for(let el of this) {
		let [key, value] = transform(el)
		destination.set(key, value)
	}
	return destination
}
Array.prototype.associateWith = function (transform) {
	return this.associateWithTo(new Map(), transform)
}
Array.prototype.associateWithTo = function (destination, transform) {
	for(let el of this) {
		destination.set(el, transform(el))
	}
	return destination
}
export {}

// helpers

function isInBound<T>(array: Array<T>, index: number) {
	return index >= 0 && index < array.length
}

function forEachBackwards<T>(array: Array<T>, block: (element: T) => void) {
	let length = array.length
	for (let i = length - 1; i >= 0; i--) {
		let element = array.at(i)
		block(element)
	}
}

function isIndicesEmpty(start: number, endInclusive: number) {
	return start >= endInclusive
}

function checkRangeIndexes(
	fromIndex: number,
	toIndex: number,
	size: number
): void | never {
	if (fromIndex < 0 || toIndex > size) {
		throw new Error(
			`fromIndex: ${fromIndex}, toIndex: ${toIndex}, size: ${size}`
		)
	}
	if (fromIndex > toIndex) {
		throw new Error(`fromIndex: ${fromIndex} > toIndex: ${toIndex}`)
	}
}

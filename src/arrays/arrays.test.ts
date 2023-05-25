import "../kotlin-extensions"
import { createMap } from "../utils/fast-map"

describe("Arrays", () => {
	const TransformResult1 = "Yes!"

	test("contains", () => {
		expect([1, 2, 3, 4, 5].contains(1)).toBe(true)
		expect([1, 2, 3, 4, 5].contains(6)).toBe(false)
	})

	test("elementAt", () => {
		expect([1, 2, 3, 4, 5].elementAt(0)).toBe(1)
		expect([1, 2, 3, 4, 5].elementAt(6)).toBeUndefined()
	})

	test("elementAtOrElse", () => {
		expect([1, 2, 3, 4, 5].elementAtOrElse(0, (index) => index)).toBe(1)
		expect([1, 2, 3, 4, 5].elementAtOrElse(6, (index) => index)).toBe(6)
		expect(
			["1", "2", "3", "4", "5"].elementAtOrElse(6, (index) => `${index}`)
		).toBe("6")
	})

	test("find", () => {
		expect([1, 2, 3, 4, 5].find((el) => el == 3)).toBe(3)
		expect([1, 2, 3, 4, 5].find((el) => el > 4)).toBe(5)
		expect([1, 2, 3, 4, 5].find((el) => el < 3)).toBe(1)
	})

	test("find", () => {
		expect([1, 2, 3, 4, 5].find((el) => el == 3)).toBe(3)
		expect([1, 2, 3, 4, 5].find((el) => el > 4)).toBe(5)
		expect([1, 2, 3, 4, 5].find((el) => el < 3)).toBe(1)
		expect([].find((_) => true)).toBeUndefined()
	})

	test("findLast", () => {
		expect([1, 2, 3, 4, 5].findLast((el) => el == 3)).toBe(3)
		expect([1, 2, 3, 4, 5].findLast((el) => el > 4)).toBe(5)
		expect([1, 2, 3, 4, 5].findLast((el) => el < 3)).toBe(2)
		expect([].findLast((_) => true)).toBeUndefined()
	})

	test("first (no predicate)", () => {
		expect([1, 2, 3, 4, 5].first()).toBe(1)
		expect([].first()).toBeUndefined()
	})

	test("last (no predicate)", () => {
		expect([1, 2, 3, 4, 5].last()).toBe(5)
		expect([].last()).toBeUndefined()
	})

	test("first", () => {
		expect([1, 2, 3, 4, 5].first((el) => el > 3)).toBe(4)
		expect([].first((_) => true)).toBeUndefined()
	})

	test("last", () => {
		expect([1, 2, 3, 4, 5].last((el) => el > 3)).toBe(5)
		expect([].last((_) => true)).toBeUndefined()
	})

	test("firstNotNullOf", () => {
		expect(
			[1, 2, 3, 4, 5].firstNotNullOf((el) =>
				el == 3 ? TransformResult1 : null
			)
		).toBe(TransformResult1)
		expect(
			[].firstNotNullOf((el) => (el == 3 ? TransformResult1 : null))
		).toBeUndefined()
	})

	test("firstNotNullOfOrNull", () => {
		expect(
			[1, 2, 3, 4, 5].firstNotNullOfOrNull((el) =>
				el == 3 ? TransformResult1 : null
			)
		).toBe(TransformResult1)
		expect(
			[].firstNotNullOfOrNull((el) => (el == 3 ? TransformResult1 : null))
		).toBeNull()
	})

	test("firstTruthyOf", () => {
		expect(
			[1, 2, 3, 4, 5].firstTruthyOf((el) => (el == 3 ? true : NaN))
		).toBeTruthy()
		expect([].firstTruthyOf((el) => (el == 3 ? true : NaN))).toBeUndefined()
	})

	test("firstTruthyOfOrNull", () => {
		expect(
			[1, 2, 3, 4, 5].firstTruthyOfOrNull((el) => (el == 3 ? true : NaN))
		).toBeTruthy()
		expect(
			[].firstTruthyOfOrNull((el) => (el == 3 ? true : NaN))
		).toBeNull()
	})

	test("firstOrNull (no predicate)", () => {
		expect([1, 2, 3, 4, 5].firstOrNull()).toBe(1)
		expect([].firstOrNull()).toBeNull()
	})

	test("lastOrNull (no predicate)", () => {
		expect([1, 2, 3, 4, 5].lastOrNull()).toBe(5)
		expect([].lastOrNull()).toBeNull()
	})

	test("firstOrNull", () => {
		expect([1, 2, 3, 4, 5].firstOrNull((el) => el == 3)).toBe(3)
		expect([1, 2, 3, 4, 5].firstOrNull((el) => el > 3)).toBe(4)
		expect([1, 2, 3, 4, 5].firstOrNull((el) => el < 3)).toBe(1)
		expect([].firstOrNull((_) => true)).toBeNull()
	})

	test("getOrElse", () => {
		expect([1, 2, 3, 4, 5].getOrElse(0, (index) => index)).toBe(1)
		expect([1, 2, 3, 4, 5].getOrElse(6, (index) => index)).toBe(6)
	})

	test("getOrNull", () => {
		expect([1, 2, 3, 4, 5].getOrNull(0)).toBe(1)
		expect([1, 2, 3, 4, 5].getOrNull(6)).toBeNull()
	})

	test("indexOf", () => {
		expect([1, 2, 3, 4, 5].indexOf(1)).toBe(0)
		expect([1, 2, 3, 4, 5].indexOf(6)).toBe(-1)
	})

	test("indexOfFirst", () => {
		expect([1, 2, 3, 4, 5].indexOfFirst((el) => el == 3)).toBe(2)
		expect([1, 2, 3, 4, 5].indexOfFirst((el) => el > 3)).toBe(3)
		expect([1, 2, 3, 4, 5].indexOfFirst((el) => el < 3)).toBe(0)
		expect([].indexOfFirst((_) => true)).toBe(-1)
	})

	test("indexOfLast", () => {
		expect([1, 2, 3, 4, 5].indexOfLast((el) => el == 3)).toBe(2)
		expect([1, 2, 3, 4, 5].indexOfLast((el) => el > 3)).toBe(4)
		expect([1, 2, 3, 4, 5].indexOfLast((el) => el < 3)).toBe(1)
		expect([].indexOfLast((_) => true)).toBe(-1)
	})

	test("lastOrNull", () => {
		expect([1, 2, 3, 4, 5].lastOrNull((el) => el == 3)).toBe(3)
		expect([1, 2, 3, 4, 5].lastOrNull((el) => el > 3)).toBe(5)
		expect([1, 2, 3, 4, 5].lastOrNull((el) => el < 3)).toBe(2)
		expect([].lastOrNull((_) => true)).toBeNull()
	})

	test("random", () => {
		expect([1, 2, 3, 4, 5].random()).toBeDefined()
		expect([].random()).toBeUndefined()
	})

	test("randomOrNull", () => {
		expect([1, 2, 3, 4, 5].randomOrNull()).toBeDefined()
		expect([].randomOrNull()).toBeNull()
	})

	test("single (no predicate)", () => {
		expect(() => [].single()).toThrowError("Array is empty.")
		expect(() => [1, 2, 3, 4, 5].single()).toThrowError(
			"Array has more than one element."
		)
		expect([1].single()).toBe(1)
	})

	test("single", () => {
		expect(() => [].single((el) => el == 3)).toThrowError(
			"Array contains no element matching the predicate."
		)
		expect(() => [1, 2, 3, 4, 5].single((el) => el > 3)).toThrowError(
			"Array contains more than one matching element."
		)
		expect(() => [1, 2, 0, 4, 5].single((el) => el == 3)).toThrowError(
			"Array contains no element matching the predicate."
		)
		expect([1, 2, 3, 4, 5].single((el) => el == 3)).toBe(3)
	})

	test("singleOrNull (no predicate)", () => {
		expect([].singleOrNull()).toBeNull()
		expect([1, 2, 3, 4, 5].singleOrNull()).toBeNull()
		expect([1].singleOrNull()).toBe(1)
	})

	test("singleOrNull", () => {
		expect([].singleOrNull((el) => el == 3)).toBeNull()
		expect([1, 2, 3, 4, 5].singleOrNull((el) => el > 3)).toBeNull()
		expect([1, 2, 0, 4, 5].singleOrNull((el) => el == 3)).toBeNull()
		expect([1, 2, 3, 4, 5].singleOrNull((el) => el == 3)).toBe(3)
	})

	test("drop", () => {
		expect([1, 2, 3, 4, 5].drop(2)).toEqual([3, 4, 5])
		expect([].drop(2)).toEqual([])
	})

	test("dropLast", () => {
		expect([1, 2, 3, 4, 5].dropLast(2)).toEqual([1, 2, 3])
		expect([].dropLast(2)).toEqual([])
	})

	test("dropLastWhile", () => {
		expect(
			[1, 2, 3, 4, 5, 4, 3, 2, 1].dropLastWhile((el) => el < 5)
		).toEqual([1, 2, 3, 4, 5])
		expect([].dropLastWhile((_) => true)).toEqual([])
	})

	test("dropWhile", () => {
		expect([1, 2, 3, 4, 5, 4, 3, 2, 1].dropWhile((el) => el < 5)).toEqual([
			5, 4, 3, 2, 1,
		])
		expect([].dropLastWhile((_) => true)).toEqual([])
	})

	test("filterNot", () => {
		expect([1, 2, 3, 4, 5].filterNot((el) => el == 3)).toEqual([1, 2, 4, 5])
	})

	test("filterNotNull", () => {
		expect([1, 2, null, 3, 4, 5, null].filterNotNull()).toEqual([
			1, 2, 3, 4, 5,
		])
	})

	test("filterNotNullTo", () => {
		expect([1, 2, null, 3, 4, 5, null].filterNotNullTo([])).toEqual([
			1, 2, 3, 4, 5,
		])
	})

	test("filterTo", () => {
		expect([1, 2, 3, 4, 5].filterTo([], (el) => el > 3)).toEqual([4, 5])
	})

	test("slice", () => {
		expect([1, 2, 3, 4, 5].slice(1, 3)).toEqual([2, 3, 4])
	})

	test("sliceIndices", () => {
		expect([1, 2, 3, 4, 5].sliceIndices([1, 3])).toEqual([2, 4])
	})

	test("take", () => {
		expect([1, 2, 3, 4, 5].take(2)).toEqual([1, 2])
	})

	test("takeLast", () => {
		expect([1, 2, 3, 4, 5].takeLast(2)).toEqual([4, 5])
	})

	test("takeLastWhile", () => {
		expect(
			[1, 2, 3, 4, 5, 4, 3, 2, 1].takeLastWhile((el) => el < 5)
		).toEqual([4, 3, 2, 1])
	})

	test("takeWhile", () => {
		expect([1, 2, 3, 4, 5, 4, 3, 2, 1].takeWhile((el) => el < 5)).toEqual([
			1, 2, 3, 4,
		])
	})

	test("reverseRange", () => {
		const arr = [1, 2, 3, 4, 5]
		arr.reverseRange(0, 4)
		expect(arr).toEqual([4, 3, 2, 1, 5])
	})

	test("reversed", () => {
		const arr = [1, 2, 3, 4, 5]
		expect(arr.reversed()).toEqual([5, 4, 3, 2, 1])
		expect(arr.reversed()).not.toBe(arr)
	})

	test("shuffle", () => {
		expect([1, 2, 3, 4, 5].shuffle()).not.toEqual([1, 2, 3, 4, 5])
	})

	test("sortBy", () => {
		expect(
			["1", "3", "2", "5", "4"].sortBy((str) => parseInt(str))
		).toEqual(["1", "2", "3", "4", "5"])
	})

	test("sortByDescending", () => {
		expect(
			["1", "3", "2", "5", "4"].sortByDescending((str) => parseInt(str))
		).toEqual(["5", "4", "3", "2", "1"])
	})

	test("sorted", () => {
		const originArr = [1, 3, 2, 5, 4]
		const sortedArr = originArr.sorted()
		expect(sortedArr).toEqual([1, 2, 3, 4, 5])
		expect(sortedArr).not.toBe(originArr)
	})

	test("sortedBy", () => {
		const originArr = ["1", "3", "2", "5", "4"]
		const sortedArr = originArr.sortedBy((str) => parseInt(str))
		expect(sortedArr).toEqual(["1", "2", "3", "4", "5"])
		expect(sortedArr).not.toBe(originArr)
	})

	test("sortedByDescending", () => {
		const originArr = ["1", "3", "2", "5", "4"]
		const sortedArr = originArr.sortedByDescending((str) => parseInt(str))
		expect(sortedArr).toEqual(["5", "4", "3", "2", "1"])
		expect(sortedArr).not.toBe(originArr)
	})

	test("sortedDescending", () => {
		const originArr = [1, 3, 2, 5, 4]
		const sortedArr = originArr.sortedDescending()
		expect(sortedArr).toEqual([5, 4, 3, 2, 1])
		expect(sortedArr).not.toBe(originArr)
	})

	test("contentDeepEquals", () => {
		expect([1, 2, 3, 4, 5].contentDeepEquals([1, 2, 3, 4, 5])).toBe(true)
		expect([NaN, [], 0].contentDeepEquals([NaN, 0, []])).not.toBe(true)
	})

	test("contentEquals", () => {
		expect([1, 2, 3, 4, 5].contentEquals([1, 2, 3, 4, 5])).toBe(true)
		expect(([0] as Array<any>).contentEquals(["0"])).toBe(true)
	})

	test("copyInto", () => {
		const arr = [1, 2, 3, 4, 5]
		expect(arr.copyInto([0, 0, 0, 0, 0, 0], 0, 1, 3)).toEqual([
			2, 3, 0, 0, 0, 0,
		])
		expect(arr.copyInto([0, 0, 0, 0, 0, 0], 2, 1, 3)).toEqual([
			0, 0, 2, 3, 0, 0,
		])
	})

	test("copyOf", () => {
		const arr = [1, 2, 3, 4, 5]
		const copy = arr.copyOf()
		expect(copy).toEqual(arr)
		expect(copy).not.toBe(arr)
	})

	test("copyOfRange", () => {
		const arr = [1, 2, 3, 4, 5]
		const copy = arr.copyOfRange(0, 3)
		expect(copy).toEqual([1, 2, 3])
		expect(copy).not.toBe(arr)
	})

	test("fill", () => {
		expect([1, 2, 3, 4, 5].fill(0)).toEqual([0, 0, 0, 0, 0])
		expect([1, 2, 3, 4, 5].fill(0, 0, 3)).toEqual([0, 0, 0, 4, 5])
	})

	test("isEmpty", () => {
		expect([1, 2, 3, 4, 5].isEmpty()).toBe(false)
		expect([].isEmpty()).toBe(true)
	})

	test("isNotEmpty", () => {
		expect([1, 2, 3, 4, 5].isNotEmpty()).toBe(true)
		expect([].isNotEmpty()).toBe(false)
	})

	test("lastIndex", () => {
		expect([1, 2, 3, 4, 5].lastIndex()).toBe(4)
	})

	test("sort", () => {
		expect([1, 3, 2, 5, 4].sort()).toEqual([1, 2, 3, 4, 5])
		expect([1, 3, 2, 5, 4, 10].sort()).toEqual([1, 2, 3, 4, 5, 10])
	})

	test("sortWith", () => {
		expect([1, 3, 2, 5, 4].sortWith(() => 1)).toEqual([1, 3, 2, 5, 4])
	})

	test("associate", () => {
		expect([1, 2, 3, 4, 5].associate((el) => [el * 2, el * 4])).toEqual(
			new Map([1, 2, 3, 4, 5].map((el) => [el * 2, el * 4]))
		)
	})

	test("associateBy", () => {
		expect([1, 2, 3, 4, 5].associateBy((el) => el * 2)).toEqual(
			new Map([1, 2, 3, 4, 5].map((el) => [el * 2, el]))
		)
	})

	test("associateByTo", () => {
		const map = new Map()
		expect([1, 2, 3, 4, 5].associateByTo(map, (el) => el * 2)).toEqual(
			new Map([1, 2, 3, 4, 5].map((el) => [el * 2, el]))
		)
		expect([1, 2, 3, 4, 5].associateByTo(map, (el) => el * 2)).toBe(map)
	})

	test("associateTo", () => {
		const map = new Map()
		expect([1, 2, 3, 4, 5].associateTo(map, (el) => [el * 2, el * 4])).toEqual(
			new Map([1, 2, 3, 4, 5].map((el) => [el * 2, el * 4]))
		)
		expect([1, 2, 3, 4, 5].associateTo(map, (el) => [el * 2, el * 4])).toBe(map)
	})

	test("associateWith", () => {
		expect([1, 2, 3, 4, 5].associateWith((el) => el * 2)).toEqual(
			new Map([1, 2, 3, 4, 5].map((el) => [el, el * 2]))
		)
	})

	test("associateWithTo", () => {
		const map = new Map()
		expect([1, 2, 3, 4, 5].associateWithTo(map, (el) => el * 2)).toEqual(
			new Map([1, 2, 3, 4, 5].map((el) => [el, el * 2]))
		)
		expect([1, 2, 3, 4, 5].associateWithTo(map, (el) => el * 2)).toBe(map)
	})
})

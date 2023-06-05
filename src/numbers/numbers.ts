import { makeComparable } from "../utils/comparable"

Number.prototype.compareTo = function(other) {
    return makeComparable(this).compareTo(makeComparable(other))
}

Number.prototype.coerceAtLeast = function(minimumValue) {
    return this < minimumValue ? minimumValue : this
}
Number.prototype.coerceAtMost = function(maximumValue) {
    return this > maximumValue ? maximumValue : this
}
Number.prototype.coerceIn = function(minimumValue, maximumValue) {
    return this < minimumValue ? minimumValue : this > maximumValue ? maximumValue : this
}

export {}
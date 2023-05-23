// extends Comparable
Number.prototype.compareTo = function(other) {
    return this == other ? 0 : this > other ? 1 : -1
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
export function collect<T>(generator: Generator<T>): T[] {
    const arr = []
    for(const next of generator) {
        arr.push(next)
    }
    return arr
}
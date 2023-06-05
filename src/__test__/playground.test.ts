import "../kotlin-extensions"

test("", () => {
    let arr = "one two three four five six seven eight nine ten".split(" ")
    let grouping = arr.groupingBy(it => it[0])
    let p = grouping.eachCount()
    console.log(p)
})
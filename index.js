const head = ([first, _]) => first
const tail = ([_, ...rest]) => rest
const prepend = (head, tail) => [head, ...tail]

const maxHelper = (array, maxSoFar) =>
  array.length === 0
    ? maxSoFar
    : head(array) > maxSoFar
    ? maxHelper(tail(array), head(array))
    : maxHelper(tail(array), maxSoFar)

const max = (array) => {
  const result = maxHelper(array, -Infinity)
  return result === -Infinity ? undefined : result
}

const minHelper = (array, minSoFar) =>
  array.length === 0
    ? minSoFar
    : head(array) < minSoFar
    ? minHelper(tail(array), head(array))
    : minHelper(tail(array), minSoFar)

const min = (array) => {
  const result = minHelper(array, Infinity)
  return result === Infinity ? undefined : result
}

const sum = (array) => (array.length === 0 ? 0 : head(array) + sum(tail(array)))

console.log(sum([3, 5, 10]))

const product = (array) =>
  array.length === 0 ? 1 : head(array) * product(tail(array))

const average = (array) =>
  array.length === 0 ? 0 : (head(array) + average(tail(array))) / array.length

const removeAt = (array, index) =>
  array.length === 0
    ? array
    : index === 0
    ? tail(array)
    : prepend(head(array), removeAt(tail(array), index - 1))

// Step by step. e.g removeAt([3,4,5], 2):
// 1. execute removeAt() ; go to the prepend():
//  1.1. head(array) = head([3,4,5]) = [3]
//  1.2 removeAt(tail(array), index - 1) =
//      = removeAt(tail([3,4,5]), 2 - 1):
// 2. execute removeAt() ; go to the prepend():
//  2.1 head(array) = [4]
//  2.2 removeAt(tail(array, index - 1)) =
//       = removeAt(tail([4,5], 1 - 1)) ;
// 3. execute removeAt() ; go to the prepend():
//  3.1 head(array) = [4],
//  3.2 removeAt(5, 0) => tail(5) => []
// 4. Then, as the recursion returns, a new array is formed by appending     each element from the original array except the element at index 2.
//    The result will be an array [3, 4].

console.log(removeAt([3, 4, 5], 2))

const insertAfter = (array, index, element) =>
  array.length === 0
    ? array
    : index === 0
    ? prepend(element, array)
    : prepend(head(array), insertAfter(tail(array), index - 1, element))
// insertA([3,4,5], 2, 1)
// h = 3 ; insertA([4,5], 2 - 1, 1)
// insertA([4,5], 1, 1)
// h = 4 ; prepend([5], 0, 1)
// insertA([5], 0, 1)
// index === 0 ; prepend(1, 5)
// return prepend(3, prepend(4, [1,5])) => [3,4,1,5]
console.log(insertAfter([3, 4, 5], 2, 1))

const concat = (arrayA, arrayB) =>
  arrayA.length === 0
    ? arrayB
    : prepend(head(arrayA), concat(tail(arrayA), arrayB))

console.log(concat([3, 4, 5], [6, 7, 8]))

const indexOf = (array, element) => indexOfHelper(array, element, 0)

const indexOfHelper = (array, element, index = 0) =>
  array.length === 0
    ? undefined
    : head(array) === element
    ? index
    : indexOfHelper(tail(array), element, index + 1)

console.log(indexOfHelper([3, 4, 5], 5))

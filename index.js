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

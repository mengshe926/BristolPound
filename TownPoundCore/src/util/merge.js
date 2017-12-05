/**
 * Merge the passed in objects into a new object.
 * Called with a single argument it will return a (shallow) clone that object.
 *
 * From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 * "The Object.assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object.
 * It will return the target object."
 */
const merge = (...args) => Object.assign({}, ...args)

export default merge

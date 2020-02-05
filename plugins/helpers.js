export default ({ app }, inject) => {
  inject("_helpers", {
    isSet,
    objectHas,
    isSetAndNotNull,
    isSetAndNotEmptyString,
    isSetAndNotEmptyArray
  });
};

export function objectHas(object, path) {
  return _.has(object, path);
}
export function isSetAndNotNull(object, path) {
  return objectHas(object, path) && object[path] !== null;
}
export function isSetAndNotEmptyString(object, path) {
  return objectHas(object, path) && object[path] !== "";
}
export function isSetAndNotEmptyArray(object, path) {
  return objectHas(object, path) && object[path].length > 0;
}
export function isSet(arg) {
  return arg !== undefined;
}

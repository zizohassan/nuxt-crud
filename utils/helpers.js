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

export function getThrough(object, path = "", defaultValue = false) {
  return objectHas(object, path)
    ? path.split(".").reduce((prev, curr) => {
        return prev[curr];
      }, object)
    : defaultValue;
}

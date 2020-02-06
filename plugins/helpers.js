import {
  isSet,
  objectHas,
  isSetAndNotNull,
  isSetAndNotEmptyString,
  isSetAndNotEmptyArray,
  getThrough
} from "@/utils/helpers";

export default ({ app }, inject) => {
  inject("_", {
    isSet,
    objectHas,
    isSetAndNotNull,
    isSetAndNotEmptyString,
    isSetAndNotEmptyArray,
    getThrough
  });
};

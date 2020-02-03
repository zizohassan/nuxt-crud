export default ({ app }, inject) => {
  inject("_forms", {
    setValuesToObject,
    clearObjectValue,
    transformDataBeforeSubmit
  });
};

export function setValuesToObject(object, values) {
  _.forEach(object, function(value) {
    if (values[value.name]) {
      value.vModel = values[value.name];
    }
  });
}

export function clearObjectValue(object) {
  _.forEach(object, function(value) {
    switch (value.storeType) {
      case "integer":
        value.vModel = 0;
        break;
      case "string":
        value.vModel = "";
        break;
    }
  });
}

export function transformDataBeforeSubmit(object) {
  let transformedData = {};
  _.forEach(object, function(value) {
    if (value.submitStore) {
      let val = value.vModel;
      if (value.storeType !== undefined) {
        switch (value.storeType) {
          case "integer":
            val = parseInt(val);
            break;
        }
      }
      transformedData[value.name] = val;
    }
  });
  return transformedData;
}

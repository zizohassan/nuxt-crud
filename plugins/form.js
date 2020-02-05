export default ({ app }, inject) => {
  inject("_form", {
    setFormSchemaValues,
    resetFormSchema,
    transformSchemaBeforeSubmit
  });
};

export function setFormSchemaValues(formSchema, values) {
  _.forEach(formSchema, function(entry) {
    if (values[entry.name]) {
      entry.value = values[entry.name];
    }
  });
}

export function resetFormSchema(formSchema) {
  _.forEach(formSchema, function(entry) {
    switch (entry.storeType) {
      case "integer":
        entry.value = 0;
        break;
      case "string":
        entry.value = "";
        break;
    }
  });
}

export function transformSchemaBeforeSubmit(schema) {
  let transformedData = {};
  _.forEach(schema, function(entry) {
    if (entry.submitStore) {
      let val = entry.value;
      if (entry.storeType !== undefined) {
        switch (entry.storeType) {
          case "integer":
            val = parseInt(val);
            break;
        }
      }
      transformedData[entry.name] = val;
    }
  });
  return transformedData;
}

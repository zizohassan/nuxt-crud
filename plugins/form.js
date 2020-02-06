import {
  setFormSchemaValues,
  resetFormSchema,
  transformSchemaBeforeSubmit
} from "@/utils/formHelpers";

export default ({ app }, inject) => {
  inject("_form", {
    setFormSchemaValues,
    resetFormSchema,
    transformSchemaBeforeSubmit
  });
};

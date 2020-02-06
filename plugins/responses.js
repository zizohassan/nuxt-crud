import { createResponse } from "@/utils/createResponse";

export default ({ app }, inject) => {
  inject("_createResponse", createResponse);
};

import { configObj } from "@/config/breadCrumbConfig";

const configMap = {};

const traverseConfig = (object, path = "") => {
  for (const key in object) {
    const { children, ...rest } = object[key];

    if (children) {
      traverseConfig(children, path + "/" + key);
    }

    configMap[path + "/" + key] = rest;
  }
};

traverseConfig(configObj);

console.log("map", configMap);

export const getCrumbOptions = path => {
  let options = configMap[path] ||
    configObj.__default[path.split("/").pop()] || {
      label: path.split("/").pop()
    };

  options = { ...options, label: _t(options.label) };
  return options;
};

function _t(str) {
  return str;
}

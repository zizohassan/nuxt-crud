<template>
  <div style="margin-top: 30px">
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li
          v-for="link in links"
          :class="link.url !== undefined ? acitveClass : ''"
          :key="link.url"
        >
          <template v-if="link.url !== undefined">
            <NuxtLink :to="link.url">
              <span v-html="link.icon"></span>
              {{ link.label }}
            </NuxtLink>
          </template>
          <template v-else>
            <span v-html="link.icon"></span>

            {{ link.label }}
          </template>
        </li>
        <slot name="crumb"></slot>
      </ul>
    </nav>
  </div>
</template>
<script>
import { configObj } from "@/config/breadCrumbConfig";

export default {
  data() {
    return {
      acitveClass: "active"
    };
  },
  computed: {
    links() {
      return pathToCrumbs(this.$route.path);
    }
  }
};

// LOGIC AND HELPERS

function pathToCrumbs(path) {
  let relativePath = "";
  path = path.split("/").filter(crumb => isNaN(crumb)); // filter home and IDs

  return [
    {
      url: "/",
      label: " Home",
      icon: "<i class='fa fa-home'></i>"
    },
    ...path.map(crumb => {
      relativePath += "/" + crumb;
      let crumbObj = {
        // add linking if not current route (last crumb)
        ...(relativePath === "/" + path.join("/") ? {} : { url: relativePath }),
        // spread rest of options
        ...getCrumbOptions(relativePath)
      };
      return crumbObj;
    })
  ];
}

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

function getCrumbOptions(path) {
  let options = configMap[path] ||
    configObj.__default[path.split("/").pop()] || {
      label: path.split("/").pop()
    };

  options = { ...options, label: options.label };
  return options;
}
</script>

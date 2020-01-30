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
import BreadCrumb from "@/mixin/breadcrumb";
import { getCrumbOptions } from "./breadCrumb";

export default {
  data() {
    return {
      acitveClass: "active"
      // override: {}
    };
  },
  computed: {
    links() {
      return pathToCrumbs(this.$route.path);
    }
  }
};

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
</script>

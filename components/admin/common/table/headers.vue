<template>
  <span>
    <span v-if="header.show">
      {{ header.title }}
      <template v-if="header.sort">
        <a
          href
          @click.prevent="defaultProps.sorting(header.name)"
          :class="defaultProps.tableOption.sortKey === header.name ? 'active': ''"
        >
          <span
            v-if="defaultProps.tableOption.sortKey === header.name && defaultProps.tableOption.sortValue === 'asc'"
          >
            <i class="fa fa-arrow-circle-down"></i>
          </span>
          <span v-else>
            <i class="fa fa-arrow-circle-up"></i>
          </span>
        </a>
      </template>
      <template
        v-if="header.filter !== undefined && defaultProps.tableOption.filterPosition === 'inside-table' && loadType === 'table'"
      >
        <filters :header="header" />
      </template>
    </span>
  </span>
</template>
<script>
import Filters from "../filters";

export default {
  props: {
    defaultProps: [Object],
    header: [Object],
    loadType: {
      default: "table",
      type: String
    }
  },
  components: {
    Filters
  }
};
</script>
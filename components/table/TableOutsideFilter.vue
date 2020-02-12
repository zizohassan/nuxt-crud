<template>
  <div v-if="defaultProps.tableOption.filterPosition === 'outside-table'">
    <span
      v-for="(header, index) in defaultProps.headers"
      :key="header.name + '_filter_' + index"
    >
      <template v-if="header.filter !== undefined">
        <filters :header="header" />
      </template>
    </span>
    <span
      v-for="(filter, index) in defaultProps.customFilter"
      :key="header.name + '_custom_filter_' + index"
    >
      <template v-if="filter.filter !== undefined">
        <filters :header="filter" />
      </template>
    </span>
    <slot name="customFilter"></slot>
  </div>
</template>
<script>
import Filters from "./filter/Filter";

export default {
  props: {
    defaultProps: {
      type: Object,
      required: true
    }
  },
  components: {
    Filters
  }
};
</script>

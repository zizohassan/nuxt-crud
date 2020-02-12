<template>
  <b-pagination
    v-if="response.payload.total_page > 1"
    :total="response.payload.total_record"
    :current.sync="response.payload.page"
    :range-before="4"
    :range-after="4"
    :rounded="true"
    :per-page="response.payload.limit"
    icon-prev="chevron-left"
    icon-next="chevron-right"
    aria-next-label="Next page"
    aria-previous-label="Previous page"
    aria-page-label="Page"
    aria-current-label="Current page"
    @change="changePage"
  >
  </b-pagination>
</template>
<script>
export default {
  props: {
    response: {
      type: Object,
      required: true
    }
  },
  methods: {
    changePage(value) {
      this.$emit("changePage", value);
    }
  }
};
</script>

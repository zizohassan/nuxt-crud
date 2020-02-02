<template>
  <tr
    v-if=" defaultProps.quickEditRow.id !== undefined && row.id === defaultProps.quickEditRow.id"
    class="quickEdit"
  >
    <td :colspan="Object.keys(row).length">
      <slot name="quickEdit" :inputs="defaultProps.quickEditRequestOptions.data"></slot>
    </td>
  </tr>
</template>
<script>
export default {
  props: ["defaultProps", "row"],
  mounted() {
    console.log(Object.keys(this.row).length);
  }
};
</script>
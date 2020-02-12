<template>
  <div>
    <template v-if="header.filter.action === undefined">
      <input type="text" v-model="header.filter.value" />
    </template>
    <template v-else>
      <input
        type="text"
        v-model="header.filter.value"
        @change="header.filter.action(header.filter.value)"
      />
    </template>
  </div>
</template>
<script>
export default {
  props: ["header"],
  mounted() {
    if (this.$route.query[this.header.name] !== undefined) {
      this.header.filter.value = this.$route.query[this.header.name];
    }
  }
};
</script>

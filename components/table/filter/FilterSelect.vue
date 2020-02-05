<template>
  <div>
    <template v-if="header.filter.action === undefined">
      <b-select
        v-model="header.filter.value"
        :placeholder="'Select a ' + header.name"
      >
        <option
          v-for="option in header.filter.options"
          :value="option.value"
          :key="option.value"
        >
          {{ option.text }}
        </option>
      </b-select>
    </template>
    <template v-else>
      <b-select
        v-model="header.filter.value"
        :placeholder="'Select a ' + header.name"
        @input="header.filter.action(header.filter.value)"
      >
        <option
          v-for="option in header.filter.options"
          :value="option.value"
          :key="option.value"
        >
          {{ option.text }}
        </option>
      </b-select>
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

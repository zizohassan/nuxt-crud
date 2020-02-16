<template>
  <div class="tableActionsContainer">
    <ul>
      <li
        v-for="action in actions"
        :key="action.slug"
        @click="applyAction(action.slug)"
      >
        <b-button>{{ action.label }} ( {{ action.count }} )</b-button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    loadData: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      actions: [{ label: "All", slug: "users", count: 5 }]
    };
  },
  methods: {
    applyAction(slug) {
      this.$router.push({ query: { ...this.$route.query, action: slug } });
      this.loadData();
    }
  }
};
</script>

<style scoped>
.tableActionsContainer {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>

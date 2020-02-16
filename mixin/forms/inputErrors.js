export default {
  data() {
    return {
      error: []
    };
  },
  mounted() {
    this.$bus.$on("input-errors", errors => (this.error = errors));
  }
};

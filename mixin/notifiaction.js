export default {
  data() {
    return {
      notificationPosition: "is-bottom"
    };
  },
  methods: {
    notification(message, type) {},
    success(message) {
      this.notification(
        message ? message : "Something happened correctly!",
        "is-success"
      );
    },
    danger(message) {
      this.notification(
        message ? message : "Something's not good, also I'm on bottom",
        "is-danger"
      );
    }
  }
};

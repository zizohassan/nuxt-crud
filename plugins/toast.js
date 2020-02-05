export default ({ app }, inject) => {
  inject("_toast", function({ message, duration, type, position } = {}) {
    this.$buefy.toast.open({
      duration: duration || 3000,
      message: message,
      type: type || null,
      position: position || "is-bottom"
    });
  });
};

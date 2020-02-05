export default ({ app }, inject) => {
  inject("_toast", {
    info: toastCreator("is-info"),
    success: toastCreator("is-success"),
    warn: toastCreator("is-warning"),
    danger: toastCreator("is-danger"),
    black: toastCreator("is-black"),
    white: toastCreator("is-white")
  });
};

const toastCreator = type =>
  function({ message = "", duration = 3000, position = "is-bottom" }) {
    this.$buefy.toast.open({ type, message, duration });
  };

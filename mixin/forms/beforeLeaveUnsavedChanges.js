export default {
  beforeRouteLeave(to, from, next) {
    if (window.dirtyForm) {
      const sure = confirm(
        "Do you really want to leave? you have unsaved changes!"
      );
      if (sure) {
        next();
        window.dirtyForm = false;
      } else next(false);
    } else next();
  }
};

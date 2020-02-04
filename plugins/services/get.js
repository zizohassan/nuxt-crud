export default ({ app }, inject) => {
  inject("_get", function(request = {}, globalLoader) {
    let loadingObj;
    if (globalLoader) {
      loadingObj = this.$buefy.loading.open();
    } else if (
      request.loaderRef &&
      this.$refs[request.loaderRef] &&
      typeof this.$refs[request.loaderRef].start === "function"
    ) {
      this.$refs[request.loaderRef].start();
    }
    return new Promise((resolve, reject) => {
      app.$axios
        .get(request.url, request.headers)
        .then(res => {
          resolve(res.data);
        })
        .catch(res => {
          reject(res.response.data);
        })
        .finally(() => {
          if (globalLoader) {
            loadingObj.close();
          } else if (
            request.loaderRef &&
            this.$refs[request.loaderRef] &&
            typeof this.$refs[request.loaderRef].finish === "function"
          ) {
            this.$refs[request.loaderRef].finish();
          }
        });
    });
  });
};

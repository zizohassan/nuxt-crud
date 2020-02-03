export default ({ app }, inject) => {
  inject("_get", function(request = {}, global) {
    let loadingObj;
    if (global) {
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
          if (global) {
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

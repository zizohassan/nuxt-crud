export default ({ app }, inject) => {
  inject("_get", function(request = {}, global) {
    let loadingObj;
    console.log(global);
    if (global) {
      loadingObj = this.$buefy.loading.open();
    } else if (
      request.loaderRef &&
      this.$refs[request.loaderRef] &&
      typeof this.$refs[request.loaderRef].start === "function"
    ) {
      this.$refs[request.loaderRef].start();
    }
    // request.Loading.methods.start();
    // console.log(request.Loading.data.loading);

    return new Promise((resolve, reject) => {
      app.$axios
        .get(request.url, request.headers)
        .then(res => {
          // this.$nuxt.$loading.finish();
          //   console.log("herer", res.data);
          resolve(res.data);
        })
        .catch(res => {
          // this.$nuxt.$loading.fail();
          //   this.handelResponseError(res);
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

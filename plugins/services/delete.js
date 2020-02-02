export default ({ app }, inject) => {
  inject("get", function(request) {
    return new Promise((resolve, reject) => {
      this.$nuxt.$loading.load = true;
      app.$axios
        .delete(request.url, request.headers)
        .then(res => {
          this.$nuxt.$loading.load = false;
          //   console.log("herer", res.data);
          resolve(res.data);
        })
        .catch(res => {
          this.$nuxt.$loading.load = false;
          //   this.handelResponseError(res);
          reject(res.response.data);
        });
    });
  });
};

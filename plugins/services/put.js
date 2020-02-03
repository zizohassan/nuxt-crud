export default ({ app }, inject) => {
  inject("_post", function(request) {
    return new Promise((resolve, reject) => {
      //   this.startLoading();
      app.$axios
        .put(request.url, request.data, request.headers)
        .then(res => {
          //   this.stopLoading();
          //   this.success(res.data.message);
          resolve(res.data);
        })
        .catch(res => {
          //   this.stopLoading();
          //   this.handelResponseError(res);
          reject(res.response.data);
        });
    });
  });
};

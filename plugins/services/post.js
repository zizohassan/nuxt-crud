export default ({ app }, inject) => {
  inject("post", function(request) {
    return new Promise((resolve, reject) => {
      //   this.startLoading();
      this.$axios
        .post(request.url, request.data, request.headers)
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

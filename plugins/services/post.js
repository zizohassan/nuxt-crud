export default ({ app }, inject) => {
  inject("_post", function(request) {
    return new Promise((resolve, reject) => {
      let loadingObj = this.$buefy.loading.open();
      this.$axios
        .post(request.url, request.data, request.headers)
        .then(res => {
          loadingObj.close();
          resolve(res.data);
        })
        .catch(res => {
          loadingObj.close();
          reject(res.response.data);
        });
    });
  });
};

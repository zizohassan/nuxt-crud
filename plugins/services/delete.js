export default ({ app }, inject) => {
  inject("_delete", function(request) {
    return new Promise((resolve, reject) => {
      let loadingObj = this.$buefy.loading.open();
      app.$axios
        .delete(request.url, request.headers)
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

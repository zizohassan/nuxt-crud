export default ({ app }, inject) => {
  inject("_put", function(request) {
    console.log("put actions");
    return new Promise((resolve, reject) => {
      let loadingObj = this.$buefy.loading.open();
      this.$axios
        .put(request.url, request.data, request.headers)
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

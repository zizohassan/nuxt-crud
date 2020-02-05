export default ({ app }, inject) => {
  inject(
    "_get",
    requestCreator(request => app.$axios.get(request.url, request.headers))
  );

  inject(
    "_post",
    requestCreator(request =>
      app.$axios.post(request.url, request.data, request.headers)
    )
  );

  inject(
    "_put",
    requestCreator(request =>
      app.$axios.put(request.url, request.data, request.headers)
    )
  );

  inject(
    "_delete",
    requestCreator(request => app.$axios.delete(request.url, request.headers))
  );
};

const requestCreator = promiseFunction =>
  function(request, globalLoader) {
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

    return promiseFunction(request)
      .then(res => {
        return res.data;
      })
      .catch(res => {
        return res.response.data;
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
  };

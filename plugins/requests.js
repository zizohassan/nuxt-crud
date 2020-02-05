export default ({ app }, inject) => {
  inject(
    "_get",
    requestCreator(({ url, headers }) => app.$axios.get(url, headers))
  );
  inject(
    "_delete",
    requestCreator(({ url, headers }) => app.$axios.delete(url, headers))
  );
  inject(
    "_post",
    requestCreator(({ url, data, headers }) =>
      app.$axios.post(url, data, headers)
    )
  );

  inject(
    "_put",
    requestCreator(({ url, data, headers }) =>
      app.$axios.put(url, data, headers)
    )
  );
};

const requestCreator = promiseFunction =>
  function(request, { showGlobalLoader, loaderRef } = {}) {
    let loadingObj;
    let ref;

    if (showGlobalLoader) loadingObj = this.$buefy.loading.open();

    if (loaderRef) {
      if (typeof loaderRef === "string") ref = this.$refs[loaderRef];
      else ref = loaderRef;
      if (ref && typeof ref.start === "function") ref.start();
    }

    return promiseFunction(request)
      .then(res => {
        return res.data;
      })
      .catch(res => {
        return res.response.data;
      })
      .finally(res => {
        if (showGlobalLoader) loadingObj.close();
        if (ref && typeof ref.finish === "function") ref.finish();
        return res;
      });
  };

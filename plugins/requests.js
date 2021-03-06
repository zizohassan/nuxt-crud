import Vue from "vue";

export const responseEventBus = {
  __eventBus: new Vue(),
  install(Vue) {
    Vue.prototype.$_responseEventBus = this.eventBus;
  },
  get eventBus() {
    return this.__eventBus;
  }
};

Vue.use(responseEventBus);

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
        this.$_responseEventBus.$emit("SUCCESS", { request, response: res });
        return res.data;
      })
      .catch(res => {
        this.$_responseEventBus.$emit("FAIL", { request, response: res });
        throw res.response.data;
      })
      .finally(res => {
        if (showGlobalLoader) loadingObj.close();
        if (ref && typeof ref.finish === "function") ref.finish();
        return res;
      });
  };

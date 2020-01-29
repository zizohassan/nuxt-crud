import Loading from "./loading";
import Notification from "./notifiaction";

export default {
  mixins: [Loading, Notification],
  methods: {
    get(request) {
      return new Promise((resolve, reject) => {
        this.startLoading();
        this.$axios
          .get(request.url, request.headers)
          .then(res => {
            this.stopLoading();
            resolve(res.data);
          })
          .catch(res => {
            this.stopLoading();
            this.handelResponseError(res);
            reject(res.response.data);
          });
      });
    },
    post(request) {
      return new Promise((resolve, reject) => {
        this.startLoading();
        this.$axios
          .post(request.url, request.data, request.headers)
          .then(res => {
            this.stopLoading();
            this.success(res.data.message);
            resolve(res.data);
          })
          .catch(res => {
            this.stopLoading();
            this.handelResponseError(res);
            reject(res.response.data);
          });
      });
    },
    put(request) {
      return new Promise((resolve, reject) => {
        this.startLoading();
        this.$axios
          .put(request.url, request.data, request.headers)
          .then(res => {
            this.stopLoading();
            this.success(res.data.message);
            resolve(res.data);
          })
          .catch(res => {
            this.stopLoading();
            this.handelResponseError(res);
            reject(res.response.data);
          });
      });
    },
    delete(request) {
      return new Promise((resolve, reject) => {
        this.startLoading();
        this.$axios
          .delete(request.url, request.headers)
          .then(res => {
            this.stopLoading();
            this.success(res.data.message);
            resolve(res.data);
          })
          .catch(res => {
            this.stopLoading();
            this.handelResponseError(res);
            reject(res.response.data);
          });
      });
    },
    handelResponseError(res) {
      if (res.response && res.response.data) {
        if (res.response.data.errors === null) {
          this.danger(res.response.data.message);
        } else if (res.response.data.errors.length === 0) {
          this.danger(res.response.data.message);
        }
      }
    }
  }
};

/**
 * you can set requestOptions in parent component if you just use this
 * once but you can pass options in delete method too so you can use this
 * function more than once
 */
import Request from "../requests";

export default {
  mixins: [Request],
  data() {
    return {
      adminUrl: process.env.adminUrl,
      requestOptions: {
        url: "", ///delete url
        headers: {}, //pass any header you need
        index: null, // index that will delete
        id: 0, /// id delete if you not pass url we need this to build url
        list: [] /// list we will delete form it
      }
    };
  },
  methods: {
    deleteRow(requestOptions) {
      if (this.$_.isSet(requestOptions)) {
        this.requestOptions = requestOptions;
      }
      return new Promise((resolve, reject) => {
        if (!this.$_.isSetAndNotEmptyString(this.requestOptions, "url")) {
          this.requestOptions.url =
            this.adminUrl +
            "/" +
            this.moduleName +
            "/" +
            this.requestOptions.id;
        }
        this.$_delete(this.requestOptions)
          .then(res => {
            if (
              this.$_.isSetAndNotNull(this.requestOptions, "index") &&
              this.$_.isSetAndNotEmptyArray(this.requestOptions, "list")
            ) {
              let index = this.requestOptions.list.findIndex(
                item => item.id == this.requestOptions.id
              );
              this.$delete(this.requestOptions.list, index);
            }
            resolve(res);
          })
          .catch(res => {
            reject(res);
          });
      });
    }
  }
};

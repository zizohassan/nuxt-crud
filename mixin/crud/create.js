/**
 * you can set requestOptions in parent component if you just use this
 * once but you can pass options in store method too so you can use this
 * function more than once
 */

import Request from "../requests";

export default {
  mixins: [Request],
  data() {
    return {
      adminUrl: process.env.adminUrl,
      row: {},
      requestOptions: {
        url: "", // will use this url or build url based on module name and admin url
        data: {}, // data that will update
        headers: {}, // pass any headers you need
        responseAttr: "" // if you need some specific attr from response you can pass it
      }
    };
  },
  methods: {
    create(requestOptions) {
      if (this.$_.isSet(requestOptions)) {
        this.requestOptions = requestOptions;
      }
      return new Promise((resolve, reject) => {
        if (!this.$_.isSetAndNotEmptyString(this.requestOptions, "url")) {
          this.requestOptions.url = this.adminUrl + this.moduleName;
        }
        let request = {};
        _.assign(request, this.requestOptions);
        request.data = this.$_form.transformSchemaBeforeSubmit(request.data);
        if (request.data) {
          this.$_post(request)
            .then(res => {
              if (this.$_.isSetAndNotEmptyString(request, "responseAttr")) {
                this.row = res[request.responseAttr];
              } else {
                this.row = res.payload;
              }
              resolve(res);
            })
            .catch(res => {
              /// emit errors to event bus
              this.$bus.$emit("input-errors", res.errors);
              reject(res);
            });
        }
      });
    }
  }
};

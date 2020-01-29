/**
 * you can set requestOptions in parent component if you just use this
 * once but you can pass options in update method too so you can use this
 * function more than once
 */

import Request from "../requests";
import ManipulateData from "../helpers/manipulateData";
import Object from "../helpers/object";

export default {
  mixins: [Request, ManipulateData, Object],
  data() {
    return {
      adminUrl: process.env.adminUrl,
      row: {},
      requestOptions: {
        url: "", // will use this url or build url based on module name and admin url
        data: {}, // data that will update
        headers: {}, // pass any headers you need
        responseAttr: "", // if you need some specific attr from response you can pass it
        id: null // it you not pass url we will use to build url
      }
    };
  },
  methods: {
    update(requestOptions) {
      if (this.isset(requestOptions)) {
        this.requestOptions = requestOptions;
      }
      return new Promise((resolve, reject) => {
        if (!this.issetAndNotEmptyString(this.requestOptions, "url")) {
          this.requestOptions.url =
            this.adminUrl +
            "/" +
            this.moduleName +
            "/" +
            this.requestOptions.id;
        }
        let request = {};
        _.assign(request, this.requestOptions);
        request.data = this.transformDataType(request.data);
        if (request.data) {
          this.put(request)
            .then(res => {
              if (this.issetAndNotEmptyString(request, "responseAttr")) {
                this.row = res[request.responseAttr];
              } else {
                this.row = res.payload;
              }
              resolve(res);
            })
            .catch(res => {
              reject(res);
            });
        }
      });
    }
  }
};

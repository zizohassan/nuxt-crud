import Notification from "./notifiaction";
import Request from "./requests";
import Delete from "./actions/delete";
import Update from "./actions/update";
import PaginationResponse from "./objects/paginateResponse";

export default ({
  withEdit = true,
  createEditFormInputs = () => [],
  withDelete = true,
  tableOption = {}
} = {}) => ({
  mixins: [Notification, Request, Delete, Update, PaginationResponse],
  computed: {
    defaultProps() {
      return {
        headers: this.headers,
        moduleName: this.moduleName,
        response: this.response,
        tableOption: this.tableOption,
        sorting: this.sorting,
        changePage: this.changePage,
        setIds: this.SetIds,

        methods: {
          deleteRow: this.deleteRow,
          setQuickEditRow: this.setQuickEditRow
        },
        quickEditRow: this.quickEditRow,
        quickEditRequestOptions: this.quickEditRequestOptions
      };
    }
  },
  data() {
    return {
      adminUrl: process.env.adminUrl,
      //////table
      tableOption: {
        loadingTable: false,
        sortKey: "id",
        sortValue: "desc",
        filterPosition: "inside-table", /// inside-table or outside-table
        editBtn: true,
        deleteBtn: true,
        qeditBtn: true,
        trashBtn: true,
        activeBtn: true,
        ...tableOption
      },
      /////default actions
      moduleName: "",
      ///index
      headers: [],
      ids: [],
      customFilter: [],
      queries: {},
      quickEditRow: -1,
      quickEditRequestOptions: {
        id: 0,
        data: createEditFormInputs()
      }
    };
  },
  methods: {
    setDefaultQueryString() {
      let loadingQuery = this.$route.query;
      let defaultQuery = {
        sort: "id|desc",
        page: 1,
        limit: 30
      };

      let merge = {
        ...defaultQuery,
        ...loadingQuery,
        ...this.queries
      };
      this.queries = merge;
    },
    loadData() {
      if (this.__timeout) clearTimeout(this.__timeout);
      this.__timeout = setTimeout(() => {
        /// first set the default query string
        this.setDefaultQueryString();
        return new Promise((resolve, reject) => {
          let options = {
            url:
              this.adminUrl +
              "/" +
              this.moduleName +
              "?" +
              this.appendQueryStringToApiCall()
          };
          ///then now append all query strings with filters
          this.$router.push({
            query: this.queries
          });
          ////
          this.get(options)
            .then(res => {
              this.response = res;
              resolve(res);
            })
            .catch(res => {
              this.response = res;
              reject(res);
            });
        });
      }, 400);
    },
    sorting(keyName) {
      if (this.tableOption.sortKey === keyName) {
        this.tableOption.sortValue =
          this.tableOption.sortValue === "desc" ? "asc" : "desc";
      } else {
        this.tableOption.sortValue = "desc";
      }
      this.response.payload.page = 1;
      this.tableOption.sortKey = keyName;
      this.queries.sort =
        this.tableOption.sortKey + "|" + this.tableOption.sortValue;
      this.loadData();
    },
    changePage(page) {
      // this.response.payload.page = page;
      console.log(page);
      this.queries.page = page;
      this.loadData();
    },
    appendQueryStringToApiCall() {
      let query = "";
      _.forIn(this.queries, (value, key) => {
        if (value && value !== "") {
          query += key + "=" + value + "&";
        }
      });
      return query;
    },
    filter(key, val) {
      this.queries[key] = val;
      this.response.payload.page = 1;
      this.loadData();
    },
    SetIds(ids) {
      this.ids = ids;
    },
    setQuickEditRow(row) {
      this.quickEditRow = row;
    },
    quickEditDone(index) {
      this.setQuickEditRow({});
    },
    quickEditDoneEdting(e) {
      this.update(this.quickEditRequestOptions).then(() => {
        this.requestOptions.data.forEach(e => {
          this.quickEditRow[e.name] = e.vModel;
        });
        this.quickEditDone();
      });
    }
  },
  watch: {
    quickEditRow(row) {
      this.quickEditRequestOptions.data.forEach(element => {
        element.vModel = row[element.name];
      });
      this.quickEditRequestOptions.id = row.id;
    }
  }
});

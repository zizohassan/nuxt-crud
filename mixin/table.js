import Notification from "./notifiaction";
import Request from "./requests";
import DeleteMixin from "./crud/delete";
import UpdateMixin from "./crud/update";
import Loader from "@/components/Loading";

export default ({
  tableSchema,
  withEdit = true,
  createQuickEditFormSchema = () => [],
  withDelete = true,
  tableOption = {}
} = {}) => ({
  components: { Loader },
  mixins: [Notification, Request, DeleteMixin, UpdateMixin],
  computed: {
    defaultProps() {
      let obj = {
        headers: this.headers,
        moduleName: this.moduleName,
        response: this.response,
        tableOption: this.tableOption,
        sorting: this.sorting,
        setIds: this.SetIds,
        tableSettings: this.tableSettings,
        methods: {
          deleteRow: this.deleteRow,
          setQuickEditRow: this.setQuickEditRow,
          quickEditDoneEditing: this.quickEditDoneEditing,
          setHeaders: this.setHeaders,
          toggleEditTable: this.toggleEditTable,
          doneEditingTable: this.doneEditingTable,
          loadData: this.loadData,
          changePage: this.changePage,
          changeLimit: this.changeLimit,
          setPagingType: this.setPagingType
        },
        quickEditRow: this.quickEditRow,
        quickEditRequestOptions: this.quickEditRequestOptions
      };
      this.$bus.$emit("default-props", obj);
      return obj;
    },
    defaultPropsEdit() {
      let obj = {
        ...this.defaultProps,
        ...this.editedSchema
      };
      // this.$bus.$emit("default-props", obj);
      return obj;
    }
  },
  data() {
    return {
      tableEditing: false,
      ...this.$_createResponse({ attr: "response", withPagination: true }),
      adminUrl: process.env.adminUrl,
      //////table
      tableOption: {
        loadingTable: false,
        sortKey: "id",
        sortValue: "desc",
        filterPosition: "outside-table", /// inside-table or outside-table
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
      ...tableSchema.get(this),
      editedSchema: tableSchema.clone(),
      ids: [],
      customFilter: [],
      queries: {},
      quickEditRow: -1,
      quickEditRequestOptions: {
        id: 0,
        data: createQuickEditFormSchema()
      },
      ...this.$_createResponse({ withPagination: true }),
      ...this.$_createResponse({ attr: "quickEditResponse" })
    };
  },
  mounted() {
    console.log();
    /*     console.log();
    if (localStorage.getItem(`${this.moduleName}__tableSchema`)) {
      const tableSchema = JSON.parse(
        localStorage.getItem(`${this.moduleName}__tableSchema`)
      );
      this.headers = tableSchema.columns;
      this.tableSettings = tableSchema.tableSettings;
    } else {
      localStorage.setItem(`${this.moduleName}__tableSchema`) ||
        `{"columns":[]}`;
    } */
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
    loadData($state) {
      if (this.__timeout) clearTimeout(this.__timeout);
      this.__timeout = setTimeout(() => {
        /// first set the default query string
        this.setDefaultQueryString();
        /// check if we get outof range page (scroll fix)
        if (
          this.response.payload.total_page >= this.response.payload.page ||
          this.response.payload.total_page == 0
        ) {
          return new Promise((resolve, reject) => {
            let options = {
              url:
                this.adminUrl +
                this.moduleName +
                "?" +
                this.appendQueryStringToApiCall(),
              loaderRef: this.tableOption.loaderRef
            };
            ///then now append all query strings with filters
            this.$router.push({
              query: this.queries
            });
            this.$_get(options, { showGlobalLoader: true })
              .then(res => {
                /// check if paing type scroll to append data
                if (this.tableSettings.paginationMode === "scroll") {
                  if (this.response.payload.page !== 1) {
                    /// save current data in temp
                    let data = this.response.payload.records;
                    /// overwrite the current response
                    this.response = res;
                    /// append new data with old data
                    this.response.payload.records = [
                      ...this.response.payload.records,
                      ...data
                    ];
                  } else {
                    this.response = res;
                  }
                  /// set the new page after scoll
                  this.response.payload.page = this.response.payload.page + 1;
                  /// set query string page
                  this.queries.page = this.response.payload.page;
                } else {
                  this.response = res;
                }
                resolve(res);
              })
              .catch(err => {
                if (err.name !== "TypeError") this.response = res;
                reject(err);
              });
          });
        }
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
      this.queries.page = 1;
      this.tableOption.sortKey = keyName;
      this.queries.sort =
        this.tableOption.sortKey + "|" + this.tableOption.sortValue;
      this.loadData();
    },
    changePage(page) {
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
      this.queries.page = 1;
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
    quickEditDoneEditing(e) {
      this.update(this.quickEditRequestOptions).then(res => {
        this.requestOptions.data.forEach(e => {
          this.quickEditRow[e.name] = e.value;
        });
        this.quickEditDone();
      });
    },
    toggleEditTable() {
      this.editedSchema = tableSchema.clone({
        headers: this.headers,
        tableSettings: this.tableSettings
      });
      this.tableEditing = !this.tableEditing;
    },
    doneEditingTable() {
      this.headers = this.editedSchema.headers;
      this.tableSettings = this.editedSchema.tableSettings;
      this.toggleEditTable();
      tableSchema.save({
        headers: this.headers,
        tableSettings: this.tableSettings
      });
    },
    setHeaders(newHeaders) {
      this.editedSchema.headers = newHeaders;
    },
    changeLimit(limit) {
      /// to do save limit to local storage
      this.queries.limit = limit;
      /*   window.location = window.location.href.split("?")[0]; */
    },
    setPagingType(pagingType) {
      /// Save pageing type in local sotrage

      console.log(this.tableSettings);
      this.tableSettings.paginationMode = pagingType;
      //window.location = window.location.href.split("?")[0];
    }
  },
  watch: {
    quickEditRow(row) {
      this.quickEditRequestOptions.data.forEach(element => {
        element.value = row[element.name];
      });
      this.quickEditRequestOptions.id = row.id;
    }
  }
});

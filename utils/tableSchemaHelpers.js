export function createTableSchema({
  moduleName,
  limit = 30,
  paginationMode = "page"
}) {
  const persistedSchema = JSON.parse(
    localStorage.getItem(`${moduleName}__tableSchema`) || `{"columns":[]}`
  );

  const tableSchema = {
    tableSettings: persistedSchema.tableSettings || {
      limit,
      paginationMode
    },
    columns: []
  };

  return {
    addColumn: createTableSchemaRow,
    getTableSchema(that) {
      tableSchema.columns.forEach(col => {
        col.filter.action = col.filter.action.bind(that);
      });
      return {
        headers: tableSchema.columns,
        tableSettings: tableSchema.tableSettings
      };
    },
    cloneSchema({ headers, columns, tableSettings } = tableSchema) {
      return _.cloneDeep({
        headers: headers || columns,
        tableSettings: tableSettings
      });
    },
    saveSchema({ columns, headers, tableSettings } = tableSchema) {
      const columnsToPersist = [];
      (headers || columns).forEach(column => {
        columnsToPersist.push(getPersistenceObject(column));
      });
      saveToLocalStorage(moduleName + "__tableSchema", {
        tableSettings,
        columns: columnsToPersist
      });
    }
  };

  function createTableSchemaRow({
    name,
    sort = true,
    show = true,
    title = name,
    renderFunction = function(val) {
      return val;
    },
    renderType = "text",
    showFilter = true,
    filterType = "text",
    defaultFilterValue = "",
    filterOptions = [],
    filterAction = function(val) {
      this.filter(name, val);
    },
    align = "center"
  }) {
    const persistedColumnIndex = persistedSchema.columns.findIndex(
      col => col.name === name
    );
    const persistedColumn = persistedSchema.columns[persistedColumnIndex] || {};

    const column = {
      name,
      sort: persistedColumn.sort === undefined ? sort : persistedColumn.sort,
      show: persistedColumn.show === undefined ? show : persistedColumn.show,
      title: persistedColumn.title || title,
      align: persistedColumn.align || align,
      render: {
        renderFunction,
        type: renderType
      },
      filter: {
        show:
          persistedColumn.showFilter === undefined
            ? showFilter
            : persistedColumn.showFilter,
        type: filterType,
        value: defaultFilterValue,
        options: filterOptions,
        action: filterAction
      }
    };

    if (persistedColumnIndex !== -1)
      tableSchema.columns[persistedColumnIndex] = column;
    else tableSchema.columns.push(column);
    return column;
  }
}

function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getPersistenceObject(column) {
  const { render, filter, ...toSave } = column;
  const { show } = filter;
  return {
    ...toSave,
    showFilter: show
  };
}

export const createdAt = {
  name: "created_at",
  title: "Created At",
  renderFunction: val => {
    return moment(val).format("YYYY-MM-DD");
  },
  filterType: "date",
  defaultFilterValue: null
};

export const updatedAt = {
  name: "updated_at",
  title: "Updated At",
  renderFunction: val => {
    return moment(val).format("YYYY-MM-DD");
  },
  filterType: "date",
  defaultFilterValue: null
};

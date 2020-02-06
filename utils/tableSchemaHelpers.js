export function createTableSchema({
  moduleName,
  limit = 30,
  paginationMode = "page"
}) {
  const tableSchema = {
    tableSettings: JSON.parse(
      localStorage.getItem(`${moduleName}__tableSettings`)
    ) || {
      limit,
      paginationMode
    },
    columns: []
  };

  return {
    addColumn: createTableSchemaRow.bind({}, moduleName, tableSchema.columns),
    get schema() {
      return tableSchema;
    },
    cloneSchema() {
      return _.cloneDeep(tableSchema);
    },
    saveSchema({ tableSettings, columns }) {
      columns.forEach(column => {
        column.save();
      });
      saveToLocalStorage(moduleName, "__tableSettings", tableSettings);
    }
  };
}

function createTableSchemaRow(
  moduleName,
  columns,
  {
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
  }
) {
  const getOption = getSavedTableRowOptions(moduleName, name);
  const column = {
    name,
    sort,
    show: getOption("show") || show,
    title: getOption("title") || title,
    align: getOption("align"),
    render: {
      renderFunction,
      type: renderType
    },
    filter: {
      show: getOption("showFilter") || showFilter,
      type: getOption("filterType") || filterType,
      value: defaultFilterValue,
      options: filterOptions,
      action: filterAction
    },
    save() {
      const { render, filter, ...toSave } = column;
      const { show, type } = filter;

      saveToLocalStorage(moduleName, name, {
        ...toSave,
        showFilter: show,
        filterType: type
      });
    }
  };

  columns.push(column);
  return column;
}

function saveToLocalStorage(moduleName, columnName, data) {
  localStorage.setItem(`${moduleName}_${columnName}`, JSON.stringify(data));
}

function getSavedTableRowOptions(moduleName, columnName) {
  const tableOptions = JSON.parse(
    localStorage.getItem(`${moduleName}_${columnName}`) || "{}"
  );
  return option => tableOptions[option];
}

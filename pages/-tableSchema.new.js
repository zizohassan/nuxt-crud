import { createTableSchema } from "~/utils/tableSchemaHelpers";

const schema = createTableSchema({ moduleName: "users" });

schema.addColumn({
  name: "name",
  sort: true,
  show: true,
  title: name,
  renderFunction: function(val) {
    return val;
  },
  renderType: "text",
  showFilter: true,
  filterType: "text",
  defaultFilterValue: "",
  filterOptions: [],
  filterAction: function(val) {
    this.filter(name, val);
  },
  align: "center"
});

export default schema.schema;
export const cloneSchema = schema.cloneSchema;

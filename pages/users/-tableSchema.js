import {
  createTableSchema,
  createdAt,
  updatedAt
} from "~/utils/tableSchemaHelpers";

const schema = createTableSchema({
  moduleName: "users"
});

schema.addColumn({
  name: "block",
  title: "User Status",
  renderFunction: val => {
    if (val === 1) {
      return "Blocked";
    } else {
      return "Active";
    }
  },
  filterType: "select",
  filterOptions: [
    { text: "select user status", value: "" },
    { text: "Block", value: 1 },
    { text: "Active", value: 2 }
  ]
});

schema.addColumn({
  name: "name",
  title: "User Name"
});

schema.addColumn({
  name: "email",
  filterType: "email"
});

schema.addColumn({
  name: "role",
  filterType: "select",
  filterOptions: [
    { text: "select user rol", value: "" },
    { text: "admin", value: 2 },
    { text: "user", value: 1 }
  ],
  renderFunction: val => {
    if (val === 2) {
      return "admin";
    } else {
      return "user";
    }
  }
});

schema.addColumn(createdAt);
schema.addColumn(updatedAt);

export const get = schema.getTableSchema;
export const save = schema.saveSchema;
export const clone = schema.cloneSchema;

// {
//   name: "updated_at",
//   sort: true,
//   show: true,
//   title: "Updated At",
//   render: {
//     action: val => {
//       return moment(val).format("YYYY-MM-DD");
//     }
//   },
//   filter: {
//     type: "date",
//     value: null,
//     action: val => {
//       this.filter("updated_at", val);
//     }
//   }
// }

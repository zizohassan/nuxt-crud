export const tableSchema = [
  {
    name: "block",
    sort: true,
    show: true,
    title: "User Status",
    render: {
      action: val => {
        if (val === 1) {
          return "Blocked";
        } else {
          return "Active";
        }
      }
    },
    filter: {
      type: "select",
      value: "",
      options: [
        { text: "select user status", value: "" },
        { text: "Block", value: 1 },
        { text: "Active", value: 2 }
      ],
      action: val => {
        this.filter("block", val);
      }
    }
  },
  {
    name: "name",
    sort: true,
    show: true,
    title: "User Name",
    filter: {
      type: "text",
      value: "",
      action: val => {
        this.filter("name", val);
      }
    }
  },
  {
    name: "email",
    sort: true,
    show: true,
    title: "Email",
    filter: {
      type: "email",
      value: "",
      action: val => {
        this.filter("email", val);
      }
    }
  },
  {
    name: "created_at",
    sort: true,
    show: true,
    title: "Created At",
    render: {
      action: val => {
        return moment(val).format("YYYY-MM-DD");
      }
    },
    filter: {
      type: "date",
      value: null,
      action: val => {
        this.filter("created_at", val);
      }
    }
  },
  {
    name: "updated_at",
    sort: true,
    show: true,
    title: "Updated At",
    render: {
      action: val => {
        return moment(val).format("YYYY-MM-DD");
      }
    },
    filter: {
      type: "date",
      value: null,
      action: val => {
        this.filter("updated_at", val);
      }
    }
  },
  {
    name: "role",
    sort: true,
    show: true,
    title: "Role",
    render: {
      action: val => {
        if (val === 2) {
          return "admin";
        } else {
          return "user";
        }
      }
    },
    filter: {
      type: "select",
      value: "",
      options: [
        { text: "select user rol", value: "" },
        { text: "admin", value: 2 },
        { text: "user", value: 1 }
      ],
      action: val => {
        this.filter("role", val);
      }
    }
  }
];

export default tableSchema;

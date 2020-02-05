const formSchema = [
  {
    label: "Name",
    name: "name",
    value: "",
    type: "text",
    storeType: "string",
    submitStore: true,
    submitUpdate: true,
    placeholder: "Enter your username"
  },
  {
    label: "Email",
    name: "email",
    value: "",
    type: "email",
    storeType: "string",
    submitStore: true,
    submitUpdate: true,
    placeholder: "Enter your email",
    quick: true
  },
  {
    label: "Password",
    name: "password",
    value: "",
    type: "password",
    storeType: "string",
    submitStore: true,
    submitUpdate: true,
    placeholder: "Enter your password"
  },
  {
    label: "Block",
    name: "block",
    value: 0,
    type: "select",
    submitStore: true,
    submitUpdate: true,
    storeType: "integer",
    placeholder: {
      text: "Select Block Status",
      value: 0
    },
    options: [
      { text: "Active", value: 2 },
      { text: "Block", value: 1 }
    ]
  },
  {
    label: "Role",
    value: 0,
    name: "role",
    type: "select",
    submitStore: true,
    submitUpdate: true,
    storeType: "integer",
    placeholder: {
      text: "Select Role",
      value: 0
    },
    options: [
      { text: "Admin", value: 2 },
      { text: "User", value: 1 }
    ]
  },
  {
    label: "Updated At",
    name: "updated_at",
    value: "",
    type: "date",
    submitStore: false,
    submitUpdate: false
  },
  {
    label: "Created At",
    name: "created_at",
    value: "",
    type: "date",
    submitStore: false,
    submitUpdate: false
  }
];

export function createFormSchema() {
  return _.cloneDeep(formSchema);
}

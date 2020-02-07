<template>
  <div>
    <PageHead :pageHead="pageHead" />
    <a href @click.prevent="activeAll">Active All</a>

    <Table :defaultProps="defaultProps" />
    <EditTable :defaultProps="defaultProps"></EditTable>

    <!--    custom filter-->
    <!--     table option must have this attr with this value to allow slots-->
    <!--      <template v-slot:customFilter>-->
    <!--        input-->
    <!--      </template>-->
  </div>
</template>
<script>
import Table from "@/components/table/Table";
import EditTable from "@/components/table/EditTable";
import MixinTable from "@/mixin/table";
import moment from "moment";
import PageHead from "@/components/PageHead";
import { createFormSchema } from "./-formSchema";
import { tableSchema } from "./-tableSchema";

export default {
  mixins: [
    MixinTable({
      tableOption: {
        actionsColumnName: "email",
        loaderRef: "loadingTable"
      },
      createQuickEditFormSchema: createFormSchema
    })
  ],
  components: {
    Table,
    PageHead,
    EditTable
  },
  mounted() {
    this.loadData();
  },
  methods: {
    activeAll() {
      console.log("do some thing with ids", this.ids);
    }
  },
  data() {
    return {
      row: {},
      pageHead: {
        btn: {
          url: "/users/create",
          label: "Create User"
        },
        pageTitle: "Users"
      },
      moduleName: "users",
      headers: tableSchema,
      customFilter: [
        {
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
        }
      ]
    };
  }
};
</script>

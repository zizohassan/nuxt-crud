<template>
  <div>
    <!-- handel actions pass actionsColumnName in table option or will append on col index 0 -->
    <div
      v-if="
        header.name == defaultProps.tableOption.actionsColumnName ||
          (!defaultProps.tableOption.actionsColumnName && index == 0)
      "
    >
      <a v-if="defaultProps.tableOption.editBtn" @click.prevent="editAction(row.id)">Edit</a>
      |
      <a
        v-if="defaultProps.tableOption.deleteBtn"
        @click.prevent="deleteAction(row , rowIndex)"
      >Delete</a>
      |
      <a
        v-if="defaultProps.tableOption.qeditBtn"
        @click.prevent="qeditAction(row)"
      >Quick Edit</a>
      |
      <a v-if="defaultProps.tableOption.trashBtn" @click.prevent="trashAction(row.id)">Trash</a>
      |
      <a
        v-if="defaultProps.tableOption.activeBtn"
        @click.prevent="activeAction(row.id)"
      >Active</a>
    </div>
    <!--- end handel action handel --->
  </div>
</template>
<script>
import Request from "~/mixin/requests";

export default {
  mixins: [Request],
  props: ["defaultProps", "header", "index", "row", "rowIndex"],
  methods: {
    editAction(id) {
      this.$router.push(this.defaultProps.moduleName + "/edit/" + id);
    },
    trashAction(id) {
      let requestOption = {
        url:
          process.env.adminUrl + this.defaultProps.moduleName + "/trash/" + id
      };
      this.get(requestOption);
    },
    qeditAction(quickEditRow) {
      this.defaultProps.methods.setQuickEditRow(quickEditRow);
      // console.log(this.defaultProps.methods.setQuickEditRow);
      // alert("quick edit");
    },
    activeAction(id) {
      let requestOption = {
        url:
          process.env.adminUrl + this.defaultProps.moduleName + "/active/" + id
      };
      this.get(requestOption);
    },
    deleteAction(row, rowIndex) {
      this.$buefy.dialog.confirm({
        title: "Are You Sure you want to delete !",
        message:
          "are you sure you want to delete ?  you can not restore this action",
        confirmText: "Delete",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          let options = {
            id: row.id,
            index: rowIndex,
            list: this.defaultProps.response.payload.records
          };
          this.defaultProps.methods.deleteRow(options);
        }
      });
    }
  }
};
</script>

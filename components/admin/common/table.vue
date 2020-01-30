<template>
  <div>
    <template
      v-if="defaultProps.tableOption.filterPosition === 'outside-table'"
    >
      <span
        v-for="(header, index) in defaultProps.headers"
        :key="header.name + '_filter_' + index"
      >
        <template v-if="header.filter !== undefined">
          <filters :header="header" />
        </template>
      </span>
      <span
        v-for="(filter, index) in defaultProps.customFilter"
        :key="header.name + '_custom_filter_' + index"
      >
        <template v-if="filter.filter !== undefined">
          <filters :header="filter" />
        </template>
      </span>
      <slot name="customFilter"></slot>
    </template>
    <table>
      <thead>
        <tr>
          <td>
            <b-checkbox v-model="selectAllIds" @input="selectAll"></b-checkbox>
          </td>
          <th
            v-for="(header, index) in defaultProps.headers"
            :key="header.name + '_' + index"
          >
            {{ header.title }}
            <template v-if="header.sort">
              <a
                href=""
                @click.prevent="defaultProps.sorting(header.name)"
                :class="
                  defaultProps.tableOption.sortKey === header.name
                    ? 'active'
                    : ''
                "
              >
                <span
                  v-if="
                    defaultProps.tableOption.sortKey === header.name &&
                      defaultProps.tableOption.sortValue === 'asc'
                  "
                >
                  <i class="fa fa-arrow-circle-down"></i>
                </span>
                <span v-else>
                  <i class="fa fa-arrow-circle-up"></i>
                </span>
              </a>
            </template>
            <template
              v-if="
                header.filter !== undefined &&
                  defaultProps.tableOption.filterPosition === 'inside-table'
              "
            >
              <filters :header="header" />
            </template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, indexRow) in defaultProps.response.payload.records"
          :key="row.id"
        >
          <!-- select box -->
          <td>
            <b-checkbox
              v-model="ids"
              @input="removeCheck"
              :native-value="row.id"
            ></b-checkbox>
          </td>
          <!-- end select box -->

          <td
            v-for="(header, indexHeader) in defaultProps.headers"
            :key="header.name + '_' + indexRow + '_' + indexHeader"
          >
            <template v-if="row[header.name]">
              <template v-if="header.click !== undefined">
                <a
                  href=""
                  @click.prevent="
                    header.click(row, header, indexRow, indexHeader)
                  "
                >
                  <render :header="header" :column="row" />
                </a>
              </template>
              <template v-else>
                <render :header="header" :column="row" />
              </template>
            </template>
            <div
              v-if="
                header.name == defaultProps.tableOption.actionsColumnName ||
                  (!defaultProps.tableOption.actionsColumnName &&
                    indexHeader == 0)
              "
            >
              <span @click="this.editAction(row.id)">Edit</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :response="defaultProps.response"
      @changePage="defaultProps.changePage"
    />
  </div>
</template>
<script>
import Render from "./render";
import Filters from "./filters";
import Pagination from "./pagination";

export default {
  components: {
    Render,
    Filters,
    Pagination
  },
  props: ["defaultProps"],
  data() {
    return {
      selectAllIds: false,
      ids: []
    };
  },
  watch: {
    ids(val) {
      this.defaultProps.setIds(val);
    }
  },
  methods: {
    editAction: id => {
      this.$router.push(this.moduleName + "/edit/" + id);
    },
    deleteAction: (row, header, indexOfRow) => {
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
            index: indexOfRow,
            list: this.response.payload.records
          };
          this.deleteRow(options);
        }
      });
    },
    removeCheck() {
      if (this.ids.length === 0) {
        this.selectAllIds = false;
      }
    },
    selectAll() {
      this.ids = [];
      if (this.selectAllIds) {
        _.forEach(
          this.defaultProps.response.payload.records,
          (value, index) => {
            this.ids[index] = this.defaultProps.response.payload.records[
              index
            ].id;
          }
        );
      }
    }
  }
};
</script>

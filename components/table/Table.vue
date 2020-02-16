<template>
  <div>
    <BarChart
      :data="[
        { count: 10, label: 'admins' },
        { count: 6, label: 'USers' },
        { count: 7, label: 'OP' },
        { count: 13, label: 'sfe' }
      ]"
    />
    <TableOptions :defaultProps="defaultProps" />
    <OutsideFilter :defaultProps="defaultProps" />
    <TableActions :loadData="defaultProps.methods.loadData" />
    <table
      v-infinite-scroll="
        isScrollMode ? defaultProps.methods.loadData : () => {}
      "
      infinite-scroll-disabled="busy"
      infinite-Scroll-distance="10"
    >
      <thead>
        <tr>
          <td>
            <b-checkbox v-model="selectAllIds" @input="selectAll"></b-checkbox>
          </td>
          <th
            v-for="(header, index) in defaultProps.headers"
            :key="header.name + '_' + index"
          >
            <headers :defaultProps="defaultProps" :header="header" />
          </th>
        </tr>
      </thead>
      <tbody
        v-for="(row, indexRow) in defaultProps.response.payload.records"
        :key="row.id"
      >
        <tr>
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
            <TableBody
              :defaultProps="defaultProps"
              :row="row"
              :header="header"
              :indexHeader="indexHeader"
              :indexRow="indexRow"
            />
          </td>
        </tr>
        <QuickEdit :defaultProps="defaultProps" :row="row"></QuickEdit>
      </tbody>
    </table>
    <Pagination
      v-if="defaultProps.tableSettings.paginationMode === 'page'"
      :response="defaultProps.response"
      @changePage="defaultProps.methods.changePage"
    />
  </div>
</template>
<script>
import OutsideFilter from "./TableOutsideFilter";
import TableBody from "./TableBody";
import QuickEdit from "./TableQuickEdit";
import Headers from "./TableHeaders";
import Filters from "./filter/Filter";
import Pagination from "./TablePagination";
import TableOptions from "./TableOptions";
import TableActions from "./TableActions";
import BarChart from "@/components/charts/BarChart";

export default {
  components: {
    Filters,
    Pagination,
    Headers,
    OutsideFilter,
    TableBody,
    QuickEdit,
    TableOptions,
    TableActions,
    BarChart
  },
  props: ["defaultProps"],
  data() {
    return {
      selectAllIds: false,
      ids: []
    };
  },
  computed: {
    isScrollMode() {
      return this.defaultProps.tableSettings.paginationMode == "scroll";
    }
  },
  watch: {
    ids(val) {
      this.defaultProps.setIds(val);
    }
  },
  methods: {
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

<style scoped>
.quickEdit {
  height: 50px;
  /* padding: 20px; */
}
</style>

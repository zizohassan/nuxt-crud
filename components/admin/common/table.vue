<template>
  <div>
    <outsideFilter :defaultProps="defaultProps" />
    <table>
      <thead>
        <tr>
          <td>
            <b-checkbox v-model="selectAllIds" @input="selectAll"></b-checkbox>
          </td>
          <th v-for="(header, index) in defaultProps.headers" :key="header.name + '_' + index">
            <headers :defaultProps="defaultProps" :header="header" />
          </th>
        </tr>
      </thead>
      <tbody v-for="(row, indexRow) in defaultProps.response.payload.records" :key="row.id">
        <tr>
          <!-- select box -->
          <td>
            <b-checkbox v-model="ids" @input="removeCheck" :native-value="row.id"></b-checkbox>
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
        <quickEdit :defaultProps="defaultProps" :row="row"></quickEdit>
      </tbody>
    </table>
    <Pagination :response="defaultProps.response" @changePage="defaultProps.changePage" />
  </div>
</template>
<script>
import outsideFilter from "./table/outsideFilter";
import TableBody from "./table/body";
import quickEdit from "./table/qedit";
import Headers from "./table/headers";
import Filters from "./filters";
import Pagination from "./pagination";

export default {
  components: {
    Filters,
    Pagination,
    Headers,
    outsideFilter,
    TableBody,
    quickEdit
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

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
            <template v-if="row[header.name]">
              <template v-if="header.click !== undefined">
                <a
                  href
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
            <Actions
              :header="header"
              :defaultProps="defaultProps"
              :index="indexHeader"
              :row="row"
              :rowIndex="indexRow"
            />
          </td>
        </tr>
        <tr v-if="row.id === defaultProps.quickEditRow.id" class="quickEdit">
          <td :colspan="Object.keys(row).length">
            <slot name="quickEdit" :inputs="defaultProps.quickEditRequestOptions.data"></slot>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :response="defaultProps.response" @changePage="defaultProps.changePage" />
  </div>
</template>
<script>
import Render from "./table/render";
import outsideFilter from "./table/outsideFilter";
import Headers from "./table/headers";
import Filters from "./filters";
import Pagination from "./pagination";
import Actions from "./table/actionsBtns";

export default {
  components: {
    Render,
    Filters,
    Pagination,
    Actions,
    Headers,
    outsideFilter
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

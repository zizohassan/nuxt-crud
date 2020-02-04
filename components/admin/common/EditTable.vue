<template>
  <div>
    <table>
      <thead>
        <Draggable v-model="headersArray" tag="tr">
          <th>
            <b-checkbox></b-checkbox>
          </th>
          <th
            v-for="(header, index) in defaultProps.headers"
            :key="header.name + '_' + index"
            scope="col"
          >
            <headers
              :defaultProps="defaultProps"
              :header="header"
              loadType="edit-mode"
            />
            <div>
              <b-checkbox v-model="defaultProps.headers[index].sort"
                >show sort</b-checkbox
              >
              <b-checkbox v-model="defaultProps.headers[index].show"
                >show column</b-checkbox
              >
              <b-checkbox
                v-model="defaultProps.headers[index].filter"
                :native-value="undefined"
                >show filter</b-checkbox
              >
            </div>
          </th>
        </Draggable>
      </thead>
      <tbody
        v-for="(row, indexRow) in defaultProps.response.payload.records"
        :key="row.id"
      >
        <tr>
          <!-- select box -->
          <td>
            <b-checkbox :native-value="row.id"></b-checkbox>
          </td>
          <!-- end select box -->
          <td
            v-for="(header, indexHeader) in defaultProps.headers"
            :key="header.name"
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
      </tbody>
    </table>
  </div>
</template>
<script>
import TableBody from "./table/body";
import quickEdit from "./table/qedit";
import Headers from "./table/headers";
import Draggable from "vuedraggable";

export default {
  components: {
    Headers,
    TableBody,
    quickEdit,
    Draggable
  },
  props: ["defaultProps"],
  data() {
    return {
      headersArray: []
    };
  },
  watch: {
    "defaultProps.headers"(val) {
      val.forEach(element => {
        this.headersArray.push(element.name);
      });
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

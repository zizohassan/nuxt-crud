<template>
  <div>
    <b-button @click="defaultProps.methods.doneEditingTable"> Save </b-button>
    <b-button @click="defaultProps.methods.toggleEditTable"> Cancel </b-button>
    <table>
      <thead>
        <Draggable v-model="arr" tag="tr" @change="onChange">
          <th v-for="(header, index) in arr" :key="header.name" scope="col">
            <headers
              :defaultProps="defaultProps"
              :header="header"
              loadType="edit-mode"
            />
            <div>
              <b-checkbox v-model="arr[index].sort">show sort</b-checkbox>
              <b-checkbox v-model="arr[index].show">show column</b-checkbox>
              <b-checkbox v-model="arr[index].filter.show"
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
          <td v-for="(header, indexHeader) in arr" :key="header.name">
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
import TableBody from "./TableBody";
import QuickEdit from "./TableQuickEdit";
import Headers from "./TableHeaders";
import Draggable from "vuedraggable";

export default {
  components: {
    Headers,
    TableBody,
    QuickEdit,
    Draggable
  },
  props: ["defaultProps"],
  data() {
    return {
      arr: [...this.defaultProps.headers]
    };
  },
  methods: {
    onChange({ moved: { oldIndex, newIndex } }) {
      console.log(oldIndex, newIndex);
      this.defaultProps.methods.setHeaders(this.arr);
      console.log(this.defaultProps.headers);
      // this.defaultProps.headers[oldIndex].index = this.defaultProps.headers[
      //   newIndex
      // ].index;
      // this.defaultProps.headers[newIndex].index = temp;
      // this.defaultProps.headers.sort((a, b) => a.index - b.index);
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

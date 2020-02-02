<template>
  <span>
    <template v-if="row[header.name]">
      <template v-if="header.click !== undefined">
        <a href @click.prevent="header.click(row, header, indexRow, indexHeader)">
          <render :header="header" :column="row" />
        </a>
      </template>
      <template v-else>
        <render :header="header" :column="row" />
      </template>
    </template>
    <actions
      :header="header"
      :defaultProps="defaultProps"
      :index="indexHeader"
      :row="row"
      :rowIndex="indexRow"
    />
  </span>
</template>
<script>
import Render from "./render";
import Actions from "./actionsBtns";

export default {
  props: ["row", "header", "indexRow", "indexHeader", "defaultProps"],
  components: {
    Render,
    Actions
  }
};
</script>
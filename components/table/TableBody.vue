<template>
  <span>
    <span v-if="header.show">
      <template v-if="row[header.name]">
        <template v-if="header.click !== undefined">
          <a
            href
            @click.prevent="header.click(row, header, indexRow, indexHeader)"
          >
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
  </span>
</template>
<script>
import Render from "./TableRednder";
import Actions from "./TableActionsBtns";

export default {
  props: ["row", "header", "indexRow", "indexHeader", "defaultProps"],
  components: {
    Render,
    Actions
  }
};
</script>

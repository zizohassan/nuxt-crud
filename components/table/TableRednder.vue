<template>
  <div>
    <template v-if="header.render !== undefined">
      <template
        v-if="header.render !== undefined && header.render.type === 'html'"
      >
        <span v-html="header.render.renderFunction(column[header.name])"></span>
      </template>
      <template v-else>
        {{ header.render.renderFunction(column[header.name]) }}
      </template>
    </template>
    <template v-else>
      {{ column[header.name] }}
    </template>
  </div>
</template>
<script>
export default {
  props: { header: Object, column: Object }
};
</script>

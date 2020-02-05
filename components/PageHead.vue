<template>
  <div>
    <div>
      <h1>
        {{ pageHead.pageTitle }}
      </h1>
      <div v-if="pageHead.btn !== undefined">
        <NuxtLink :to="pageHead.btn.url">
          <i class="fa fa-plus"></i>
          {{ pageHead.btn.label }}
        </NuxtLink>
      </div>
      <slot name="other"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: ["pageHead"],
};
</script>

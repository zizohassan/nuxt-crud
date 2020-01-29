<template>
  <div style="margin-top: 30px">
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li v-for="link in breadCrumb.links" :class="link.url !== undefined ?  link.acitveClass : ''">
          <template v-if="link.url !== undefined">
            <NuxtLink :to="link.url">
              <span v-html="link.icon"></span>
              {{ link.label }}
            </NuxtLink>
          </template>
          <template v-else>
            <span v-html="link.icon"></span>
            {{ link.label }}
          </template>
        </li>
        <slot name="crumb"></slot>
      </ul>
    </nav>
  </div>
</template>
<script>
  export default {
    props: ["breadCrumb"]
  }
</script>

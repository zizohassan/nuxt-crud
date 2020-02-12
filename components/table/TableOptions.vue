<template>
  <b-dropdown
    aria-role="list"
    v-model="defaultProps.tableOption.pagingOnSCroll"
    position="is-bottom-left"
    trap-focus
  >
    <a class="navbar-item" slot="trigger" role="button">
      <span>Options</span>
      <b-icon icon="menu-down"></b-icon>
    </a>
    <b-dropdown-item aria-role="listitem" @click="defaultProps.methods.toggleEditTable">Edit</b-dropdown-item>
    <b-dropdown-item aria-role="listitem" :value="false" @click="setPagingType('page')">Pagination</b-dropdown-item>
    <b-dropdown-item aria-role="listitem" :value="true" @click="setPagingType('scroll')">scroll</b-dropdown-item>
    <b-dropdown-item aria-role="listitem" :focusable="false" custom>
      <b-field label="Simple">
        <b-select
          placeholder="Select a name"
          @input="defaultProps.methods.changeLimit"
          v-model="defaultProps.response.payload.limit"
        >
          <option v-for="n in 10" :value="n * 10" :key="'limit_' + n">{{ n * 10 }}</option>
        </b-select>
      </b-field>
    </b-dropdown-item>
    <b-dropdown-item aria-role="listitem">help</b-dropdown-item>
  </b-dropdown>
</template>
<script>
export default {
  props: ["defaultProps"],
  methods: {
    setPagingType(type) {
      this.defaultProps.methods.setPagingType(type);
    }
  }
};
</script>

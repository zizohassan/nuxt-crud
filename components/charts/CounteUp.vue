<template>
  <b-card style="width:45%; display:inline-block; margin:20px">
    {{ data.label }}
    <b-card-body>
      <ICountUp :endVal="data.count" :delay="300" />
    </b-card-body>
  </b-card>
</template>
<script>
import ICountUp from "vue-countup-v2";

export default {
  components: {
    ICountUp
  },

  props: {
    data: {
      type: Object,
      required: true
    }
  },

  mounted() {}
};
</script>

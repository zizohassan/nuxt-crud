<template>
  <div>
    <template v-if="header.filter.type === 'text'">
      <text-input :header="header" />
    </template>
    <template v-if="header.filter.type === 'email'">
      <email-input :header="header" />
    </template>
    <template v-if="header.filter.type === 'date'">
      <date-input :header="header" />
    </template>
    <template v-if="header.filter.type === 'select'">
      <select-input :header="header" />
    </template>
  </div>
</template>
<script>
import TextInput from "./FilterText";
import EmailInput from "./FilterEmail";
import DateInput from "./FilterDate";
import SelectInput from "./FilterSelect";

export default {
  components: {
    TextInput,
    EmailInput,
    DateInput,
    SelectInput
  },
  props: ["header"]
};
</script>

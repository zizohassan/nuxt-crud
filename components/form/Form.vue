<template>
  <div>
    <div
      v-for="singleInput in quick ? quickInputs : inputs"
      :key="singleInput.name"
    >
      <div v-if="singleInput.type === 'text'">
        <TextInput :input="singleInput" />
      </div>
      <div v-else-if="singleInput.type === 'password'">
        <PasswordInput :input="singleInput" />
      </div>
      <div v-else-if="singleInput.type === 'email'">
        <EmailInput :input="singleInput" />
      </div>
      <div v-else-if="singleInput.type === 'select'">
        <SelectInput :input="singleInput" />
      </div>
    </div>
  </div>
</template>
<script>
import TextInput from "./InputText";
import EmailInput from "./InputEmail";
import PasswordInput from "./InputPassword";
import SelectInput from "./InputSelect";

export default {
  props: ["inputs", "quick"],
  components: {
    TextInput,
    EmailInput,
    SelectInput,
    PasswordInput
  },
  computed: {
    quickInputs() {
      return this.inputs.filter(i => i.quick);
    }
  },
  watch: {
    inputs: {
      deep: true,
      handler() {
        window.dirtyForm = true;
      }
    }
  }
};
</script>

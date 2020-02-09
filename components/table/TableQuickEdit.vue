<template>
  <tr
    v-if="
      defaultProps.quickEditRow.id !== undefined &&
        row.id === defaultProps.quickEditRow.id
    "
    class="quickEdit"
  >
    <td :colspan="Object.keys(row).length">
      <form @submit.prevent="defaultProps.methods.quickEditDoneEditing">
        <Form
          :inputs="defaultProps.quickEditRequestOptions.data"
          :quick="true"
        />
        <SubmitButton />
        <b-button
          type="is-danger"
          @click="defaultProps.methods.setQuickEditRow(-1)"
          >Cancel</b-button
        >
      </form>
    </td>
  </tr>
</template>
<script>
import SubmitButton from "@/components/form/Submit";
import ResetButton from "@/components/form/Reset";
import Form from "@/components/form/Form";

export default {
  props: ["defaultProps", "row"],
  components: {
    SubmitButton,
    ResetButton,
    Form
  }
};
</script>

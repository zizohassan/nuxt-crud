<template>
  <div>
    <PageHead :pageHead="pageHead" />
    <div>
      <form @submit.prevent="updateData">
        <Form :inputs="requestOptions.data" :response="response" />
        <submit-button />
        <reset-button />
      </form>
    </div>
  </div>
</template>
<script>
import Form from "@/components/form/Form";
import { createFormSchema } from "../formSchema";
import SubmitButton from "@/components/form/Submit";
import ResetButton from "@/components/form/Reset";
/////mixin
import ReadMinxin from "@/mixin/crud/read";
import Update from "@/mixin/actions/update";
import PageHead from "@/components/PageHead";

export default {
  mixins: [ReadMinxin, Update],
  components: {
    PageHead,
    Form,
    SubmitButton,
    ResetButton
  },
  data() {
    return {
      ...this.$_createResponse(),
      pageHead: {
        pageTitle: "Update User"
      },
      append: [
        {
          url: "/users",
          label: " Users",
          icon: "<i class='fa fa-users'></i>"
        },
        {
          label: " Update",
          icon: "<i class='fa fa-user'></i>"
        }
      ],
      moduleName: "users",
      requestOptions: {
        id: this.$route.params.id,
        data: createFormSchema()
      }
    };
  },
  mounted() {
    this.read().then(res => {
      this.response = res;
      this.$_form.setFormSchemaValues(this.requestOptions.data, res.payload);
    });
  },
  methods: {
    updateData() {
      this.update()
        .then(res => {
          this.$router.push("/" + this.moduleName);
        })
        .catch(res => {
          this.response = res;
        });
    }
  }
};
</script>

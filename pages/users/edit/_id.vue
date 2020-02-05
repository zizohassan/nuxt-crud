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
import Show from "@/mixin/actions/show";
import Update from "@/mixin/actions/update";
import Response from "@/mixin/responseSchemas/normalResponse";
import PageHead from "@/components/PageHead";

export default {
  mixins: [Show, Update, Response],
  components: {
    PageHead,
    Form,
    SubmitButton,
    ResetButton
  },
  data() {
    return {
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
    this.find().then(res => {
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

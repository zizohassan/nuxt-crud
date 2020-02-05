<template>
  <div>
    <PageHead :pageHead="pageHead" />
    <div>
      <form @submit.prevent="storeData" name="createfolder">
        <Form :inputs="requestOptions.data" :response="response" />
        <SubmitButton />
        <ResetButton />
      </form>
    </div>
  </div>
</template>
<script>
import Form from "@/components/form/Form";
import { createFormSchema } from "./formSchema";
import SubmitButton from "@/components/form/Submit";
import ResetButton from "@/components/form/Reset";
//mixin
import Store from "@/mixin/actions/store";
import Response from "@/mixin/responseSchemas/normalResponse";
import pageHead from "@/components/PageHead";

export default {
  mixins: [Store, Response],
  components: {
    pageHead,
    Form,
    SubmitButton,
    ResetButton
  },
  data() {
    return {
      pageHead: {
        pageTitle: "Create User"
      },
      moduleName: "users",
      requestOptions: {
        data: createFormSchema()
      },
      append: [
        {
          url: "/users",
          label: " Users",
          icon: "<i class='fa fa-users'></i>"
        },
        {
          label: " Create",
          icon: "<i class='fa fa-plus'></i>"
        }
      ]
    };
  },
  methods: {
    storeData() {
      this.store()
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

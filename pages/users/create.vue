<template>
  <div>
    <page-head :pageHead="pageHead" />
    <div>
      <form @submit.prevent="storeData" name="createfolder">
        <user-form :inputs="requestOptions.data" :response="response" />
        <submit-button />
        <reset-button />
      </form>
    </div>
  </div>
</template>
<script>
import UserForm from "@/components/forms";
import User from "@/objects/admin/forms/users";
import SubmitButton from "@/components/inputs/submit";
import ResetButton from "@/components/inputs/reset";
//mixin
import Store from "@/mixin/actions/store";
import Response from "@/mixin/objects/normalResponse";
import pageHead from "@/components/admin/common/pageHead";

export default {
  mixins: [Store, Response],
  components: {
    pageHead,
    UserForm,
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
        data: User()
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

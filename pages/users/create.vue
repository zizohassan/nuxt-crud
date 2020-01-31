<template>
  <div>
    <bread :breadCrumb="breadCrumb"/>
    <page-head :pageHead="pageHead"/>
    <div>
      <form @submit.prevent="storeData" name="createfolder">
        <user-form :inputs="requestOptions.data" :response="response"/>
        <submit-button/>
        <reset-button/>
      </form>
    </div>
  </div>
</template>
<script>
  import UserForm from "@/components/forms";
  import User from "@/objects/admin/forms/users";
  import SubmitButton from "@/components/inputs/submit";
  import ResetButton from "@/components/inputs/reset";
  import Bread from "@/components/admin/common/breadCrumb"
  import pageHead from "@/components/admin/common/pageHead";

  import Store from "@/mixin/actions/store";
  import Response from "@/mixin/objects/normalResponse";
  import BreadCrumb from "@/mixin/breadcrumb"

  export default {
    mixins: [Store, Response, BreadCrumb],
    components: {
      pageHead,
      UserForm,
      SubmitButton,
      ResetButton,
      Bread
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
        appendToBreadCrumb: [
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
          .catch((res) => {
            this.response = res
          });
      }
    }
  };
</script>

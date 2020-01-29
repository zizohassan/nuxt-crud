<template>
  <div>
    <bread :breadCrumb="breadCrumb"/>
    <page-head :pageHead="pageHead" />
    <div>
      <form @submit.prevent="updateData">
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
  /////mixin
  import Show from "@/mixin/actions/show";
  import Update from "@/mixin/actions/update";
  import Response from "@/mixin/objects/normalResponse";
  import BreadCrumb from "@/mixin/breadcrumb"
  import Bread from "@/components/admin/common/breadCrumb"
  import pageHead from "@/components/admin/common/pageHead";

  export default {
    mixins: [Show, Update, Response, BreadCrumb],
    components: {
      pageHead,
      UserForm,
      SubmitButton,
      ResetButton,
      Bread
    },
    data() {
      return {
        pageHead :{
          pageTitle : "Update User"
        },
        appendToBreadCrumb: [
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
          data: User()
        }
      };
    },
    mounted() {
      this.find().then(res => {
        this.response = res;
        this.setValuesToObject(this.requestOptions.data, res.payload);
      });
    },
    methods: {
      updateData() {
        this.update().then(res => {
          this.$router.push("/" + this.moduleName);
        }).catch((res) => {
          this.response = res
        });
      }
    }
  };
</script>

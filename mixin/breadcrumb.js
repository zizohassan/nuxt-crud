export default {
  data() {
    return {
      breadCrumb: {
        acitveClass: "active",
        links: [
          {
            url: "/",
            label: " Home",
            icon: "<i class='fa fa-home'></i>"
          }
        ]
      }
    };
  },
  mounted() {
    if (this.appendToBreadCrumb !== undefined) {
      this.breadCrumb.links = [
        ...this.breadCrumb.links,
        ...this.appendToBreadCrumb
      ];
    }
  }
};

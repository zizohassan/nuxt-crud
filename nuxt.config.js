import webpack from "webpack";
require("dotenv").config();

export default {
  env: {
    adminUrl: process.env.ADMIN_URL,
    notLoginUrl: process.env.NOT_LOGIN_URL
  },
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: false,
  /*
   ** Global CSS
   */
  css: ["@/assets/css/main.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/requests.js",
    "@/plugins/toast.js",
    "@/plugins/helpers.js",
    "@/plugins/form.js",
    "@/plugins/responses.js",
    "@/plugins/bus.js",
    "@/plugins/language.js"
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/dotenv"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "nuxt-buefy",
    "@nuxtjs/axios",
    "@nuxtjs/font-awesome",
    "bootstrap-vue/nuxt"
  ],
  /*
   ** Build configuration
   */
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        // global modules
        _: "lodash",
        moment: "moment"
      })
    ],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};

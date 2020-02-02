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
  loading: "~/components/loading.vue",
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/services/post.js",
    "@/plugins/services/put.js",
    "@/plugins/services/delete.js",
    "@/plugins/services/get.js"
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
        _: "lodash"
      })
    ],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};

import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "@/static/locales/en.json";
import ar from "@/static/locales/ar.json";
import { localeOptions } from "@/config/languages.js";

Vue.use(VueI18n);

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch

  console.log("lang", localeOptions);

  const locale =
    localStorage.getItem("currentLanguage") &&
    localeOptions.filter(x => x.id === localStorage.getItem("currentLanguage"))
      .length > 0
      ? localStorage.getItem("currentLanguage")
      : "en";

  app.i18n = new VueI18n({
    locale: locale,
    fallbackLocale: "en",
    messages: {
      en: en,
      ar: ar
    }
  });

  localStorage.setItem("currentLanguage", locale);

  app.i18n.path = link => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`;
    }

    return `/${app.i18n.locale}/${link}`;
  };
};

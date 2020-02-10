<template>
  <div>
    <div :lang="$i18n.locale">
      <nav
        class="navbar header has-shadow is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img src="/buefy.png" alt="Buefy" height="28" />
          </a>

          <ul>
            <li v-for="lang in localeOptions" :key="lang.id">
              <a @click.prevent="setLangName(lang.id)">
                {{ lang.name }}
              </a>
            </li>
          </ul>

          <div class="navbar-burger">
            <span />
            <span />
            <span />
          </div>
        </div>
      </nav>
      <section class="main-content columns">
        <aside class="column is-2 section">
          <p class="menu-label is-hidden-touch">
            General
          </p>
          <ul class="menu-list">
            <li v-for="(item, key) of items" :key="key">
              <nuxt-link :to="item.to" exact active-class="is-active">
                <b-icon :icon="item.icon" />
                {{ item.title }}
              </nuxt-link>
            </li>
          </ul>
        </aside>

        <div class="container column is-10">
          {{ $t("users") }}
          <BreadCrumb />
          <Nuxt />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb";
import { localeOptions } from "@/config/languages";

export default {
  components: {
    BreadCrumb
  },
  methods: {
    setLangName(lang) {
      localStorage.setItem("currentLanguage", lang);
      window.location = "/";
    }
  },
  data() {
    return {
      localeOptions,
      items: [
        {
          title: "Home",
          icon: "home",
          to: { name: "index" }
        },
        {
          title: "Users",
          icon: "account-group",
          to: { name: "users" }
        }
      ]
    };
  }
};
</script>

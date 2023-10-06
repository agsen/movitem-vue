import { createApp } from "vue";
import "./style.css";
import { createRouter, createWebHistory } from "vue-router";
import { VueQueryPlugin } from "vue-query";
import HomeVue from "./pages/Home/Home.vue";
import DetailVue from "./pages/Detail/Detail.vue";

import AppVue from "./App.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomeVue },
    { path: "/detail/:id", component: DetailVue },
  ],
});

const app = createApp(AppVue);
app.use(router);
app.use(VueQueryPlugin);

app.mount("#app");

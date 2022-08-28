import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { auth } from "./firebase/config";

// global styles
import "./assets/main.css";

// this code resolves the problem of redirecting when the page is refreshed while adding route guard
// as firebase requires a fraction of time to check whether an user is logged in/not
let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(router).mount("#app");
  }
});

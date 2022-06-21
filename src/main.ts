import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../node_modules/sweetalert2/dist/sweetalert2.min.css";
import "./axios";

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");

import { createApp } from "vue"
import "@/assets/style/scss/global.scss"
import App from "@/App.vue"
import router from "@/router"
import { createPinia } from "pinia"

const app = createApp(App)
app.use(router).use(createPinia()).mount("#app")

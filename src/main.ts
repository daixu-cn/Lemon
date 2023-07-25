import { createApp } from "vue"
import "@/assets/style/scss/global.scss"
import App from "@/App.vue"
import router from "@/router"
import { createPinia } from "pinia"
import Icon from "@/components/Icon.vue"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

const app = createApp(App)
app.use(router).use(createPinia().use(piniaPluginPersistedstate)).mount("#app")

app.component("Icon", Icon)

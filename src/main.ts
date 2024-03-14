import { createApp } from "vue"
import "@/assets/style/scss/global.scss"
import App from "@/App.vue"
import router from "@/router"
import { createPinia } from "pinia"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import localizedFormat from "dayjs/plugin/localizedFormat"
import duration from "dayjs/plugin/duration"

dayjs.locale("zh-cn")
dayjs.extend(localizedFormat)
dayjs.extend(duration)

const app = createApp(App)
app.use(router).use(createPinia()).mount("#app")

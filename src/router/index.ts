import { createRouter, createWebHashHistory } from "vue-router"
import NProgress from "nprogress"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/Home/Home.vue")
    }
  ]
})

router.beforeEach(() => {
  if (!NProgress.isStarted()) {
    NProgress.start()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router

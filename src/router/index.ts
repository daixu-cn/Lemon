import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Frame",
      component: () => import("@/views/Frame/Frame.vue"),
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "Home",
          component: () => import("@/views/Home/Home.vue")
        }
      ]
    }
  ]
})

export default router

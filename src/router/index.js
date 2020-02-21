import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home.vue";
import Bill from "../pages/Bill.vue";
import Complete from "../pages/Complete.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/bill",
    name: "Bill",
    component: Bill
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: "/complete",
    name: "Complete",
    component: Complete
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

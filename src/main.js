import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "intersection-observer";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";
import router from "./router";
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Number.prototype.format = function(n, x) {
  var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
};
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_BACKEND_URL
});

// Cache implementation
const cache = new InMemoryCache();
// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  connectToDevTools: true
});
Vue.use(VueApollo);
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});
import Main from "./Main.vue";
new Vue({
  apolloProvider,
  router,
  render: h => h(Main)
}).$mount("#app");

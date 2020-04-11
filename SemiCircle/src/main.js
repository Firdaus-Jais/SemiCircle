import Vue from "vue";
import App from "./App";
import router from "./router/routes";
import vuetify from "./plugins/vuetify";
import store from "./stores/store";
import "babel-polyfill";
import Vuelidate from "vuelidate";

import { firebaseListener } from "./plugins/firebaseConfig";

Vue.use(router);
Vue.use(Vuelidate);

firebaseListener(authStatusChange);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  vuetify,
  store,
  components: { App },
  template: "<App/>"
});

function authStatusChange(loggedIn, user) {
  if (store) {
    store.commit("AUTH_STATUS_CHANGE");
    if (user) {
      //store.dispatch('getShoppingCart', {uid: user.uid, currentCart: store.getters.cartItemList});
    }
  }
}

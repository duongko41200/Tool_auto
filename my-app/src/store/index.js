
import Vue from "vue";
import Vuex from "vuex";
import listAccount from './listAccount.js'
Vue.use(Vuex);

export default new Vuex.Store({

  modules: {
	listAccount
  }
})
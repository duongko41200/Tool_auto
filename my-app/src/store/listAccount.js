import { getField, updateField } from 'vuex-map-fields';


export default {
	namespaced: true,

	state() {
		return {
			imageProfile:''

		};
	},

	actions: {

	},

	mutations: {
		updateField,

	},

	getters: {
		getField,
	},
};

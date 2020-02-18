import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		contacts : [
			 
		],
	},
	getters: {
		getContacts(state){
			let contacts = [];
			for(let i = 0, len = state.contacts.length; i < len; i++){
				contacts.push(state.contacts[i]);
				contacts[i].id = i;
			}

			return contacts;

		},
	},
	mutations: {
	},
	actions: {
	},
	modules: {
	}
})

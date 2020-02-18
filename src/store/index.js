import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		contacts : [
			{
				name : 'Stive',
				phone : '89299111111',
				email : 'stive@mail.ru',
			},
			{
				name : 'Alex2',
				phone : '222222222',
				email : 'alex@mail.ru',
			},
			{
				name : 'Alex',
				phone : '3333333',
				email : 'alex@mail.ru',
			},
			{
				name : 'Mike',
				phone : '444444444',
				email : 'mike@mail.ru',
			},
			{
				name : 'Nick',
				phone : '5555555',
				email : 'nick@mail.ru',
			},
			{
				name : 'Nick',
				phone : '5555555',
				email : 'nick@mail.ru',
			},
			{
				name : 'Nick',
				phone : '5555555',
				email : 'nick@mail.ru',
			},
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

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		contacts : [
			{
				name : 'Anton',
				phone : '+9876545678',
				email : 'anton@mail.ru',
			},
			{
				name : 'Alex',
				phone : '+4951234567890',
				email : '',
			},
			{
				name : 'Виу-виу-виу',
				phone : '103',
				email : '',
			},
			{
				name : 'Police',
				phone : '102',
				email : '',
			},
			{
				name : 'Petr',
				phone : '+79090020122',
				email : '',
			},
			{
				name : 'FIRE!!!',
				phone : '101',
				email : '',
			},
			{
				name : 'Jamal',
				phone : '89286486178',
				email : 'jhasuev@mail.ru',
			},
			{
				name : 'Ждунчик',
				phone : '88002000600',
				email : 'poisk@vid.ru',
			},
		],
	},
	getters: {
		getContacts(state){
			for(let i = 0, len = state.contacts.length; i < len; i++){
				state.contacts[i].id = i;
			}

			return state.contacts;
		},
	},
	mutations: {
		editContact(state, contact){
			state.contacts[contact.contactIndex].name = contact.name;
			state.contacts[contact.contactIndex].phone = contact.phone;
			state.contacts[contact.contactIndex].email = contact.email;
		},
		addContact(state, contact){
			state.contacts.push(contact);
		},
		removeContact(state, index){
			state.contacts.splice(index, 1);
		},
		mergeContacts(state, newContacts){
			state.contacts = state.contacts.concat(newContacts)
		},
	},
})

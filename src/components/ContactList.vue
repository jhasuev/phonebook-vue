<template>
	<v-list>
		<template v-if="!getFilteredContacts.length">
			<v-list-item>
				<v-list-item-content>
					<v-list-item-title class="text-center">
						<div v-if="$store.getters.getSearch  && $store.getters.getSearch.trim()">There is no such contact.</div>
						<div v-else>
							Contact list is empty.<br/>
							<a href="" @click.prevent="onCreate()">Add some contact!</a>
						</div>
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</template>
		<div v-else>
			<v-subheader>All contacts: {{getFilteredContacts.length}}</v-subheader>
			<v-divider></v-divider>
		</div>
		<template v-for="(contact, index) in getFilteredContacts">
			<div :key="index">
				<div v-if="!index">
					<v-subheader class="list-subheading">{{contact.name.substring(1, -1).toUpperCase()}}</v-subheader>
				</div>
				<div v-else>
					<v-subheader
						class="list-subheading"
						v-if="contact.name.substring(1, -1).toUpperCase() != getFilteredContacts[index - 1].name.substring(1, -1).toUpperCase()"
					>{{contact.name.substring(1, -1).toUpperCase()}}</v-subheader>
					<v-divider v-else></v-divider>
				</div>
			</div>
			<ContactListItem :contact="contact" @remove="onRemove"/>
		</template>
	</v-list>
</template>
<script>
	import {eventEmitter} from '../main'
	import ContactListItem from './ContactListItem.vue'
	export default {
		methods : {
			// поиск по ключевому запросу
			searchContacts(contacts, cond){
				return contacts.filter((contact, index) => {
					contact.id = index;
					return contact.name.toLowerCase().indexOf(cond.toLowerCase()) >= 0;
				});
			},
			// сортировака по имени
			getSorteredContacts(contacts){
				return contacts.sort((a, b) => ((a.name > b.name)? 1 : -1));
			},
			filterContacts(contacts){
				if (this.$store.getters.getSearch && this.$store.getters.getSearch.trim()) {
					contacts = this.searchContacts(contacts, this.$store.getters.getSearch.trim());
				}
				return this.getSorteredContacts(contacts);
			},
			onCreate(){
				eventEmitter.$emit("createContactOpen");
			},
			onRemove(index){
				this.$store.commit('removeContact', index);
				eventEmitter.$emit("snackShow", {
					text : 'Contact was removed successfully!',
				})
			}
		},
		computed : {
			getFilteredContacts(){
				let contacts = this.$store.getters.getContacts
				// иначе фильтуется исходный массив и все идет через ж...
				return this.filterContacts(Object.assign([], contacts));
			},
		},
		components: {
			ContactListItem,
		},
	}
</script>

<style scoped>
	.list-subheading {
		background-color: #eee;
	}
</style>
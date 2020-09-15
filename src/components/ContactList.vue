<template>
	<v-list>
		<template v-if="!getFilteredContacts.length">
			<v-list-item>
				<v-list-item-content>
					<v-list-item-title class="text-center">
						
						<div
							v-if="getSearch  && getSearch.trim()"
						>There is no such contact.</div>
						<div v-else>
							Contact list is empty.<br/>
							<v-btn @click="onCreate()">Add some contact!</v-btn>
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
					<v-subheader class="list-subheading">{{ getNameLetter(contact.name) }}</v-subheader>
				</div>
				<div v-else>
					<v-subheader
						class="list-subheading"
						v-if="getNameLetter(contact.name) != getNameLetter(getFilteredContacts[index - 1].name)"
					>{{ getNameLetter(contact.name) }}</v-subheader>
					<v-divider v-else></v-divider>
				</div>
			</div>
			<ContactListItem
				:contact="contact"
				@remove="onRemove"
			/>
		</template>
	</v-list>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	import ContactListItem from './ContactListItem.vue'

	export default {
		name: 'ContactList',
		components: {
			ContactListItem,
		},
		computed : {
			...mapGetters([
				'getSearch',
			]),
			
			getFilteredContacts(){
				let contacts = this.$store.getters.getContacts
				// иначе фильтуется исходный массив и все идет через ж...
				return this.filterContacts(Object.assign([], contacts));
			},
		},
		methods : {
			...mapMutations([
				'removeContact',
			]),

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
				if (this.getSearch && this.getSearch.trim()) {
					contacts = this.searchContacts(contacts, this.getSearch.trim());
				}
				return this.getSorteredContacts(contacts);
			},

			onCreate(){
				this.$root.$emit("createContactOpen");
			},

			onRemove(index){
				this.removeContact(index)

				this.$root.$emit("snackShow", {
					text : 'Contact was removed successfully!',
				})
			},
			
			getNameLetter(name){
				return name.substring(1, -1).toUpperCase()
			},
		},
	}
</script>

<style scoped>
	.list-subheading {
		background-color: #eee;
	}
</style>
<template>
	<v-app id="inspire">

		<AppBar/>

		<v-content>
			<v-container
				fluid
			>
				<v-row>
					<v-col class="col-12">
						<v-card
							max-width="600"
							class="mx-auto"
						>
							<v-toolbar
								color="orange darken-4"
								dark
							>
								<v-text-field
									prepend-inner-icon="mdi-magnify"
									flat
									solo-inverted
									hide-details
									dense
									filled
									label="Search a contact"
									clearable

									v-model="search"
								></v-text-field>

								<v-btn icon class="ml-5">
									<v-icon>mdi-plus</v-icon>
								</v-btn>
							</v-toolbar>

							<v-list>
								<template v-for="(contact, index) in getFilteredContacts">
									<!-- <v-divider v-if="index" :key="index"></v-divider> -->
									<div v-if="!index" :key="index">
										<v-subheader class="list-subheading">{{contact.name.substring(1, -1).toUpperCase()}}</v-subheader>
									</div>
									<div v-else>
										<v-subheader
											class="list-subheading"
											v-if="contact.name.substring(1, -1).toUpperCase() != getFilteredContacts[index - 1].name.substring(1, -1).toUpperCase()"
										>{{contact.name.substring(1, -1).toUpperCase()}}</v-subheader>
										<v-divider v-else></v-divider>
									</div>

									<ContactListItem :contact="contact"/>
								</template>
								<template v-if="!getFilteredContacts.length">
									<v-list-item>
										<v-list-item-content>
											<v-list-item-title class="text-center">
												<div v-if="search  && search.trim()">There is no such contact.</div>
												<div v-else>
													Contact list is empty.<br/>
													<a href="" @click.prevent="addContact()">Add some contact!</a>
												</div>
											</v-list-item-title>
										</v-list-item-content>
									</v-list-item>
								</template>
							</v-list>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
	import AppBar from './components/AppBar.vue'
	import ContactListItem from './components/ContactListItem.vue'
	export default {
		data: () => ({
			search : '',
		}),
		components: {
			AppBar,
			ContactListItem,
		},
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
				return contacts.sort(function(a, b) { 
					if (a.name > b.name) return 1;
					if (a.name < b.name) return -1;
					return 0; 
				});
			}
		},
		computed : {
			// поиск по ключевому запросу
			getFilteredContacts(){
				let contacts = this.$store.getters.getContacts;
				if (this.search && this.search.trim()) {
					contacts = this.searchContacts(contacts, this.search.trim());
				}

				return this.getSorteredContacts(contacts);
			},
		}
	}
</script>
<style scoped>
	.list-subheading {
		background-color: #f6f6f6;
	}
</style>
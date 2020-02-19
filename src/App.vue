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

								<v-btn @click="onCreate()" icon class="ml-5">
									<v-icon>mdi-plus</v-icon>
								</v-btn>

							</v-toolbar>

							<v-list>
								<template v-if="!getFilteredContacts.length">
									<v-list-item>
										<v-list-item-content>
											<v-list-item-title class="text-center">
												<div v-if="search  && search.trim()">There is no such contact.</div>
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
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-content>

		<CreateContact/>
		<EditContact/>
		<ImportContacts/>

		<v-snackbar
			v-model="snackbar_show"
			:color="snackbar_color"
		>
			{{ snackbar_text }}
			<v-btn
				text
				@click="snackbar_show = false"
			>
				Close
			</v-btn>
		</v-snackbar>

	</v-app>
</template>

<script>
	import {eventEmitter} from './main'
	import AppBar from './components/AppBar.vue'
	import CreateContact from './components/CreateContact.vue'
	import EditContact from './components/EditContact.vue'
	import ContactListItem from './components/ContactListItem.vue'
	import ImportContacts from './components/ImportContacts.vue'
	export default {
		data(){
			return {
				snackbar_show : false,
				snackbar_text : '',
				snackbar_color : 'success',

				search : '',
			}
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
				return contacts.sort((a, b) => ((a.name > b.name)? 1 : -1));
			},
			filterContacts(contacts){
				if (this.search && this.search.trim()) {
					contacts = this.searchContacts(contacts, this.search.trim());
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
		created(){
			eventEmitter.$on("snackShow", (snackbar) => {
				this.snackbar_show = true;
				this.snackbar_text = snackbar.text;
				this.snackbar_color = snackbar.color || 'dark';
			});
		},
		computed : {
			getFilteredContacts(){
				let contacts = this.$store.getters.getContacts
				// иначе фильтуется исходный массив и все идет через ж...
				return this.filterContacts(Object.assign([], contacts));
			},
		},
		components: {
			AppBar,
			ContactListItem,
			CreateContact,
			EditContact,
			ImportContacts,
		},
	}
</script>
<style scoped>
	.list-subheading {
		background-color: #eee;
	}
</style>
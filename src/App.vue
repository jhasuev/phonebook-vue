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
								<ContactSearch/>

								<v-btn @click="onCreate()" icon class="ml-5">
									<v-icon>mdi-plus</v-icon>
								</v-btn>

							</v-toolbar>

							<ContactList/>

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
	import AppBar from './components/AppBar.vue'
	import CreateContact from './components/CreateContact.vue'
	import EditContact from './components/EditContact.vue'
	import ContactList from './components/ContactList.vue'
	import ImportContacts from './components/ImportContacts.vue'
	import ContactSearch from './components/ContactSearch.vue'
	
	export default {
		data(){
			return {
				snackbar_show : false,
				snackbar_text : '',
				snackbar_color : 'success',
			}
		},
		methods : {
			onCreate(){
				this.$root.$emit("createContactOpen");
			},
		},
		created(){
			this.$root.$on("snackShow", (snackbar) => {
				this.snackbar_show = true;
				this.snackbar_text = snackbar.text;
				this.snackbar_color = snackbar.color || 'dark';
			});
		},
		components: {
			AppBar,
			ContactList,
			CreateContact,
			EditContact,
			ImportContacts,
			ContactSearch,
		},
	}
</script>
<template>
	<v-dialog
		v-model="dialog"
		width="500"
	>
		<v-card class="py-4 px-4">
			<h1 class="headline text-center">Import contacts</h1>
			<v-form
				ref="form"
				v-model="valid"
				lazy-validation
				@submit.prevent="onImport()"
			>
				<v-textarea
					v-model="json"
					:rules="jsonRules"
					label="Paste here a JSON string"
					required
				></v-textarea>

				<div class="pt-4 d-flex">
					<v-btn
						outlined
						color="red"
						class="mr-4"
						@click="close()"
					>
						<v-icon small class="mr-3">mdi-backspace-outline</v-icon>
						Cancel
					</v-btn>

					<v-btn
						color="primary"
						class="ml-auto"
						@click="onImport()"
					>
						<v-icon small class="mr-3">mdi-import</v-icon>
						Import
					</v-btn>
				</div>
			</v-form>
		</v-card>
	</v-dialog>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'

	export default {
		name: 'ImportContacts',
		data(){
			return {
				dialog: false,

				valid: true,
				json: '',
				jsonRules: [
					v => !!(v && v.trim()) || 'The field cannot be empty',
					v => this.isJSON(v) || 'This is not valid JSON',
				],
			}
		},
		computed: {
			...mapGetters([
				'getContacts',
			]),
		},
		created(){
			this.$root.$on("importContactsOpen", () => {
				this.dialog = true;
			});
		},
		methods : {
			...mapMutations([
				'mergeContacts',
			]),

			onImport(){
				if (this.isJSON(this.json)) {
					// сначала проверяем, какие из контактов в импортируемом массиве уже существуют
					// и сразу же копируем в отдельный массив те контакты, которых нет в нашей базе

					let imported_contacts = JSON.parse(this.json);
					let contacts_for_importing = [];

					imported_contacts.forEach(contact => {
						let imported_contact = JSON.parse(JSON.stringify(contact));

						let isset = this.getContacts.some(origin_contact => {
							return (imported_contact.phone == origin_contact.phone)
									&& (imported_contact.email == origin_contact.email)
						})
						
						if (!isset) {
							contacts_for_importing.push(imported_contact);
						}

					})

					// мёржим контакты
					this.mergeContacts(contacts_for_importing);

					this.close();

					this.$root.$emit("snackShow", {
						text : contacts_for_importing.length + ' of ' + imported_contacts.length + ' were imported successfully!',
					})
				}
			},
			close(){
				this.$refs.form.reset();
				this.dialog = false;
			},
			isJSON(str) {
				try {
					return typeof JSON.parse(str) == 'object';
				} catch (e) {}
				return false;
			}
		},
	}
</script>
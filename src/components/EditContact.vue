<template>
	<v-dialog
		v-model="dialog"
		width="500"
	>
		<v-card class="py-4 px-4">
			<h1 class="headline text-center">Edit contact</h1>
			<v-form
				ref="form"
				v-model="valid"
				lazy-validation
				@submit.prevent="create()"
			>
				<v-text-field
					v-model="name"
					:rules="nameRules"
					label="Name"
					required
				></v-text-field>

				<v-text-field
					type="tel"
					v-model="phone"
					:rules="phoneRules"
					label="Phone"
					required
				></v-text-field>

				<v-text-field
					type="email"
					v-model="email"
					:rules="emailRules"
					label="E-mail"
				></v-text-field>

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
						color="success"
						class="ml-auto"
						@click="save()"
					>
						<v-icon small class="mr-3">mdi-content-save</v-icon>
						Save
					</v-btn>
				</div>
			</v-form>
		</v-card>
	</v-dialog>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'

	export default {
		name: 'EditContact',
		data(){
			return {
				dialog: false,
				contactIndex: null,

				valid: true,
				name: '',
				nameRules: [
					v => !!(v && v.trim()) || 'Name is required',
				],
				phone: '',
				phoneRules: [
					v => !!(v && v.trim()) || 'Phone is required',
					v => /^\+?\d+$/.test(v) || 'Phone must have only numbers',
					v => ((v && v.trim()) && (v && v.trim()).length >= 2) || 'Phone must be more than 2 characters',
					v => ((v && v.trim()) && (v && v.trim()).length <= 14) || 'Phone must be less than 14 characters',
				],
				email: '',
				emailRules: [
					v => !(v && v.trim()) || /.+@.+\..+/.test(v) || 'E-mail must be valid',
				],
			}
		},
		computed: {
			...mapGetters([
				'getContacts',
			]),
		},
		methods : {
			...mapMutations([
				'editContact',
			]),

			save(){
				if (this.$refs.form.validate()) {
					this.editContact({
						contactIndex : this.contactIndex,
						name : this.name,
						phone : this.phone,
						email : this.email,
					});
					this.contactIndex = null;

					this.$root.$emit("snackShow", {
						text : 'Contact was editted successfully!',
					})

					this.close();
				}
			},
			close(){
				this.$refs.form.reset();
				this.dialog = false;
			},
		},
		created(){
			this.$root.$on("editContactOpen", (contactIndex)=>{
				this.dialog = true;

				this.contactIndex = contactIndex;
				this.name = this.getContacts[contactIndex].name;
				this.phone = this.getContacts[contactIndex].phone;
				this.email = this.getContacts[contactIndex].email;
			});
		}
	}
</script>
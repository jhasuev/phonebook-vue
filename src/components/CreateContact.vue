<template>
	<v-dialog
		v-model="dialog"
		width="500"
	>
		<v-card class="py-4 px-4">
			<h1 class="headline text-center">New contact</h1>
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
						color="primary"
						class="ml-auto"
						@click="create()"
					>
						<v-icon small class="mr-3">mdi-plus</v-icon>
						Create
					</v-btn>
				</div>
			</v-form>
		</v-card>
	</v-dialog>
</template>

<script>
	import { mapMutations } from 'vuex'

	export default {
		name: 'CreateContact',
		data(){
			return {
				dialog: false,

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
		methods : {
			...mapMutations([
				'addContact',
			]),

			create(){
				if (this.$refs.form.validate()) {
					this.addContact({
						name : this.name,
						phone : this.phone,
						email : this.email,
					});

					this.close();

					this.$root.$emit("snackShow", {
						text : 'Contact was created successfully!',
					})
				}
			},
			close(){
				this.$refs.form.reset();
				this.dialog = false;
			},
		},
		created(){
			this.$root.$on("createContactOpen", ()=>{
				this.dialog = true;
			});
		}
	}
</script>
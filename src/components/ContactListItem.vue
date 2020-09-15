<template>
	<v-list-group
		no-action
		ref="list-group"
	>
		<template v-slot:activator>
			<v-list-item-avatar>
				<v-img :src="`https://dummyimage.com/100x100/d6792d/000f0f.gif&text=${contact.id + 1}`" />
			</v-list-item-avatar>

			<v-list-item-content>
				<v-list-item-title>{{contact.name}}</v-list-item-title>
				<v-list-item-subtitle>{{contact.phone}}</v-list-item-subtitle>
			</v-list-item-content>
		</template>

		<v-list-item
			class="flex-wrap px-4 py-2"
		>
			<v-btn @click="onCall()" text outlined color="success" class="flex-grow-1">
				<v-icon small class="mr-sm-3">mdi-phone</v-icon>
				<span class="d-none d-sm-block">Call</span>
			</v-btn>
			<v-btn @click="onEmail()" text outlined color="success" class="flex-grow-1 ml-2" v-if="contact.email">
				<v-icon small class="mr-sm-3">mdi-email</v-icon>
				<span class="d-none d-sm-block">Write</span>
			</v-btn>
			<v-btn @click="edit()" icon outlined color="primary" class="ml-2 elevation-0">
				<v-icon small>mdi-pencil</v-icon>
			</v-btn>
			<v-btn @click="remove()" icon outlined color="red" class="white--text ml-2 elevation-0">
				<v-icon small>mdi-delete</v-icon>
			</v-btn>
		</v-list-item>
	</v-list-group>
</template>
<script>
	export default {
		name: 'ContactListItem',
		props: {
			contact: {
				type: Object,
				default: () => ({})
			},
		},
		methods : {
			onCall(){
				window.open('tel:' + this.contact.phone);
			},
			onEmail(){
				window.open('mailto:' + this.contact.email);
			},
			edit(){
				this.$root.$emit('editContactOpen', this.contact.id)
			},
			remove(){
				this.$refs['list-group'].click();
				this.$emit('remove', this.contact.id)
			},
		}
	}
</script>
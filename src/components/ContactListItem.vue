<template>
	<v-list-group
		no-action
	>
		<template v-slot:activator>
			<v-list-item-avatar>
				<v-img :src="'https://i.pravatar.cc/100?' + contact.id"></v-img>
			</v-list-item-avatar>

			<v-list-item-content>
				<v-list-item-title>{{contact.name}} | #{{contact.id}}</v-list-item-title>
				<v-list-item-subtitle>{{contact.phone}}</v-list-item-subtitle>
			</v-list-item-content>
		</template>

		<v-list-item
			class="flex-wrap px-4 py-2"
		>
			<v-btn @click="call" text outlined color="success" class="flex-grow-1">
				<v-icon small class="mr-3">mdi-phone</v-icon>
				Call
			</v-btn>
			<v-btn icon outlined color="primary" class="ml-2 elevation-0">
				<v-icon small>mdi-pencil</v-icon>
			</v-btn>
			<v-btn icon outlined color="red" class="white--text ml-2 elevation-0">
				<v-icon small>mdi-delete</v-icon>
			</v-btn>
		</v-list-item>
	</v-list-group>
</template>
<script>
	export default {
		props: ['contact'],
		methods : {
			call(){
				window.open('tel:' + this.contact.phone);
			}
		}
	}
</script>
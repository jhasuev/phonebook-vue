<template>
	<div>
		<v-navigation-drawer
			v-model="drawer"
			:clipped="$vuetify.breakpoint.lgAndUp"
			app
		>
			<v-list dense>
				<MenuListItem @click="" icon="mdi-plus" text="New contact"/>
				<MenuListItem @click="" icon="mdi-import" text="Import"/>
				<MenuListItem @click="" icon="mdi-export" text="Export"/>
				<MenuListItem @click="" icon="mdi-file" text="Export to CSV"/>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar
			:clipped-left="$vuetify.breakpoint.lgAndUp"
			app
			color="orange darken-4"
			dark
		>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
			<v-toolbar-title
				style="width: 204px"
				class="ml-0  pl-4  hidden-sm-and-down"
			>
				<span class="">Vue Phonebook</span>
			</v-toolbar-title>

			<v-spacer />
			
			<v-btn icon>
				<v-icon>mdi-code-tags</v-icon>
			</v-btn>
		</v-app-bar>
	</div>
</template>
<script>
	import MenuListItem from './MenuListItem.vue'
	export default {
		data: () => ({
			drawer: null,
		}),
		components : {
			MenuListItem,
		}
	}
</script>
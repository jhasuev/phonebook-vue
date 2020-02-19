<template>
	<div>
		<v-navigation-drawer
			v-model="drawer"
			:clipped="$vuetify.breakpoint.lgAndUp"
			app
		>
			<MenuLists/>
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
			
			<v-btn href="https://github.com/jhasuev/phonebook-vue" target="_blank" icon>
				<v-icon>mdi-code-tags</v-icon>
			</v-btn>
		</v-app-bar>
	</div>
</template>
<script>
	import MenuLists from './MenuLists.vue'
	export default {
		data(){
			return {
				drawer: false,
			}
		},
		components : {
			MenuLists,
		},
	}
</script>
<template>
	<v-text-field
		flat
		solo-inverted
		hide-details
		dense
		filled
		clearable

		prepend-inner-icon="mdi-magnify"
		label="Search a contact"

		:value="getSearch"
		@input="setSearch($event)"
	></v-text-field>
</template>
<script>

	import { mapGetters, mapMutations } from 'vuex'

	export default {
		name: 'ContactSearch',
		computed : {
			...mapGetters([
				'getSearch',
			]),
		},
		methods: {
			...mapMutations([
				'setSearch',
			]),
		},
	}

</script>
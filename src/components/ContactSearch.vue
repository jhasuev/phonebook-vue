<template>
	<v-text-field
		prepend-inner-icon="mdi-magnify"
		flat
		solo-inverted
		hide-details
		dense
		filled
		label="Search a contact"
		clearable

		:value="getSearch"
		@input="setSearch"
	></v-text-field>
</template>
<script>
	export default {
		methods : {
			setSearch(v){
				this.$store.commit("setSearch", v);
			},
		},
		computed : {
			getSearch(){
				return this.$store.getSearch;
			},
		}
	}
</script>
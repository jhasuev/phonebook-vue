<template>
	<div>
		<v-list dense>
			
			<v-list-item
				v-for="(menu_item, i) in menu"
				:key="i"
				@click="onClickMenu(menu_item.action)"

				link
			>
				<v-list-item-action>
					<v-icon>{{ menu_item.icon }}</v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>{{ menu_item.title }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

		</v-list>
	</div>
</template>
<script>

	import { mapGetters } from 'vuex'

	export default {
		name: 'MenuLists',
		data(){
			return {
				menu: [
					{
						icon: 'mdi-plus',
						title: 'New contact',
						action: 'create',
					},
					{
						icon: 'mdi-import',
						title: 'Import',
						action: 'import',
					},
					{
						icon: 'mdi-export',
						title: 'Export',
						action: 'export',
					},
					{
						icon: 'mdi-file',
						title: 'Export to CSV',
						action: 'exportCSV',
					},
				],
			}
		},
		computed: {
			...mapGetters([
				'getContacts',
			]),
		},
		methods : {
			onClickMenu(action){
				switch(action){
					case 'create': this.getCreate(); break;
					case 'import': this.onImport(); break;
					case 'export': this.onExport(); break;
					case 'exportCSV': this.onExportCSV(); break;
				}
			},

			getCreate(){
				this.$root.$emit("createContactOpen");
			},

			download(text, format) {
				// скачиваеем файлы в нужном формате
				let element = document.createElement('a');
				element.setAttribute('href', 'data:text/' + format + ';charset=utf-8,' + encodeURIComponent(text));
				element.setAttribute('download', 'contacts_backup.' + format);

				element.style.display = 'none';
				document.body.appendChild(element);
				element.click();
				document.body.removeChild(element);
			},

			onImport() {
				this.$root.$emit("importContactsOpen");
			},

			onExport() {
				// отправляем на скачивание
				this.download(JSON.stringify(this.getContactsForImport()), 'json');
			},

			onExportCSV() {
				// отправляем на скачивание
				this.download(this.convert2CSV(this.getContactsForImport()), 'csv');
			},

			getContactsForImport() {
				let contacts = JSON.parse(JSON.stringify(this.getContacts))
				// удаляем лишний элемент контактов, который не нужен в CSV документе
				contacts.forEach(contact => { delete contact.id });
				// отправляем на скачивание
				return contacts;
			},

			convert2CSV(objArray) {
			  let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
				let str = '';

				if (array && array.length) {

					for (let i = 0; i < array.length; i++) {
						let line = '';
						for (let index in array[i]) {
							if (line != '') line += ';'

							line += array[i][index];
						}

						str += line + '\r\n';
					}

					// добавляем ключи в строки (вверх документа, titles)
					let keys = Object.keys(array[0])
					keys = keys.join(';')
					str = keys + '\r\n' + str;

				}
				return str;
			}
		},
	}
</script>
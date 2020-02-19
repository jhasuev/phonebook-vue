<template>
	<div>
		<v-list dense>
			<v-list-item
				link
				@click="getCreate()"
			>
				<v-list-item-action>
					<v-icon>mdi-plus</v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>New contact</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-list-item
				link
				@click="onImport()"
			>
				<v-list-item-action>
					<v-icon>mdi-import</v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>Import</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-list-item
				link
				@click="onExport()"
			>
				<v-list-item-action>
					<v-icon>mdi-export</v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>Export</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-list-item
				link
				@click="onExportCSV()"
			>
				<v-list-item-action>
					<v-icon>mdi-file</v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>Export to CSV</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		
		</v-list>
	</div>
</template>
<script>
	import {eventEmitter} from '../main'
	export default {
		methods : {
			getCreate(){
				eventEmitter.$emit("createContactOpen");
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
				eventEmitter.$emit("importContactsOpen");
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
				let contacts = JSON.parse(JSON.stringify(this.$store.getters.getContacts))
				// удаляем лишний элемент контактов, который не нужен в CSV документе
				contacts.forEach((contact)=>{
					delete contact.id;
				});
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
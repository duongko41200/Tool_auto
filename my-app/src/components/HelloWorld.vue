<template>
	<div class="hello">
		<div class="p-3 mb-3 d-flex gap-2">
			<div>
				<button @click="exportToExcel" style="margin: 10xp">
					Xuất Excel
				</button>
			</div>
			<div>
				<button class="importBtn">
					<label for="file">Import Excel</label>
					<input
						class="d-none"
						type="file"
						id="file"
						accept=".json"
						@input="handleFileUpload"
					/>
				</button>
			</div>

			<div>
				<button @click="autoLoginFB">login</button>
			</div>

			<div>
				<b-button v-b-modal.modal-1>Auto Like</b-button>

				<b-modal id="modal-1" title="LIKE" hide-footer>
					<div class="row flex justify-content-end">
						<input
							type="number"
							placeholder="nhập số like muốn"
							class="mb-4"
							style="height: 50px"
							v-model="numberLike"
						/>

						<div>
							<b-button @click="saveLike"> Save </b-button>
						</div>
					</div>
				</b-modal>
			</div>
		</div>
		<div>
			<table class="table table-striped" id="dataTable" ref="dataTable">
				<thead>
					<tr>
						<th scope="col">STT</th>
						<th scope="col">username</th>
						<th scope="col">password</th>
						<th scope="col">Handle</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, idx) in items" :key="idx">
						<th scope="row">{{ idx + 1 }}</th>
						<td>{{ item.username }}</td>
						<td>{{ item.password }}</td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.5.0/jszip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.5/xlsx.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js"></script>
<!-- <script src="https://cdn.skypack.dev/xlsx"></script> -->
<script>
import AutoFeature from '@/services/logi.auto.service';
// import XLSX from 'xlsx';
// import * as XLSX from 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.5/xlsx.full.min.js';

export default {
	name: 'HelloWorld',
	props: {
		msg: String,
	},
	data() {
		return {
			username: '',
			password: '',
			numberLike:'',
			items: [
				// { username: 'dmagnetism@gmail.com', password: 'Dan23t8n19@@' },
				// {
				// 	username: 'magnetspiritual@gmail.com ',
				// 	password: 'Da230819@@',
				// },
			],
		};
	},
	methods: {
		async autoLoginFB() {
			await AutoFeature.loginAuto({
				param: this.items,
			});
		},

		exportToExcel() {
			const table = document.getElementById('dataTable');
			const rows = table.querySelectorAll('tbody tr');

			// Tạo một chuỗi CSV để biểu diễn dữ liệu
			// let csvContent = 'data:text/csv;charset=utf-8,';
			let csvContent = 'username,password\n'; // Header

			rows.forEach((row) => {
				const cells = row.querySelectorAll('td');
				csvContent += `${cells[0].innerText},${cells[1].innerText}\n`;
			});

			// Tạo Blob từ chuỗi CSV
			const blob = new Blob([csvContent], {
				type: 'text/csv;charset=utf-8;',
			});

			// Tạo đường link tải xuống
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = 'exported_data.csv';

			// Thêm đường link vào trang và kích hoạt click
			document.body.appendChild(link);
			link.click();

			// Xóa đường link sau khi tải xuống
			document.body.removeChild(link);
		},

		handleFileUpload(event) {
			const file = event.target.files[0];
			console.log(file);
			if (file) {
				this.readExcel(file);
			}
		},
		readExcel(file) {
			const reader = new FileReader();

			reader.onload = (e) => {
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, { type: 'array' });

				// Giả sử chỉ có một sheet trong file Excel
				const sheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[sheetName];

				// Chuyển đổi dữ liệu từ sheet thành JSON
				const jsonData = XLSX.utils.sheet_to_json(worksheet);
				console.log(jsonData[0]);
				this.items = jsonData;

				// Cập nhật thuộc tính data với dữ liệu JSON đã nhập
				this.data = jsonData;
			};

			reader.readAsArrayBuffer(file);
		},

		async saveLike(){
			console.log("ksdjfksdjf")
			await AutoFeature.likeAuto({numberLike:this.numberLike})
		}
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>

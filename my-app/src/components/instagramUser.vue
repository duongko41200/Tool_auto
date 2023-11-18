<template>
	<div>
		<div>
			<input
				type="text"
				placeholder="search account instagram"
				class="inputSearch"
				v-model="keyword"
			/>
			<button @click="onSubmit">Submit</button>
		</div>
		
		<table class="table table-striped" id="dataTable" ref="dataTable">
			<thead>
				<tr>
					<th scope="col">STT</th>
					<!-- <th scope="col">Avata</th> -->
					<th scope="col">username</th>
					<th scope="col">follower</th>
					<th scope="col">following</th>
					<th scope="col">Post</th>
					<th>handle</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, idx) in dataAccount" :key="idx">
					<th scope="row">{{ idx + 1 }}</th>
					<!-- <td><img :src="item.profile_pic_url_hd" /></td> -->
					<td>{{ item.username }}</td>
					<td>{{ item.edge_followed_by.count }}</td>
					<td>{{ item.edge_follow.count }}</td>
					<td>{{ item.edge_owner_to_timeline_media.count }}</td>
					<td></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
import InstagramService from '@/services/instagram.service';
export default {
	data() {
		return {
			keyword: '',
			dataAccount:[]
		};
	},

	props: {
		items: {
			type: Array,
		},
	},
	methods: {
		async onSubmit() {
			const search = await InstagramService.searchUser({
				key: this.keyword,
			});

			let dataSearch = search.data.data.data.xdt_api__v1__fbsearch__topsearch_connection.users;
			console.log('ksjdfkjsdkfj:', dataSearch);
			
			let infoAccount = []
			for (let i = 0; i < 10; i++) {
				let dataDetail = await InstagramService.detailProfile({
					username: dataSearch[i].user.username,
				});
				infoAccount = [...infoAccount,dataDetail.data.data.data.user];

			}

			// console.log('hahahaah: :', dataDetail);
			console.log("gia trij", infoAccount)
			this.dataAccount = infoAccount
		},
	},
};
</script>
<style>
.inputSearch {
	padding: 10px;
	width: 300px;
	border-radius: 20px;
	margin-bottom: 36px;
}
</style>

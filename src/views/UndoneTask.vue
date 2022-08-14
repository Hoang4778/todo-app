<template>
	<div class="undone-item" v-for="todo in undoneList" :key="todo.id">
		<h2>{{ todo.title }}</h2>
		<p>
			Added on {{ months[todo.timeStamp.toDate().getMonth()] }}
			{{ todo.timeStamp.toDate().getDate() }}
			{{ todo.timeStamp.toDate().getFullYear() }}
		</p>
	</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import db from "@/firebase/configs";
export default {
	setup() {
		let undoneList = ref([]);
		let months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		function getUndoneTodo() {
			onSnapshot(
				query(collection(db, "todoList"), where("isDone", "==", false)),
				(item) => {
					let undoneTasks = [];
					item.forEach((element) => {
						undoneTasks.push({ ...element.data(), id: element.id });
					});
					let tempArr = undoneTasks.sort((x, y) => y.timeStamp - x.timeStamp);
					undoneList.value = [...tempArr];
				}
			);
		}

		getUndoneTodo();

		return {
			undoneList,
			months,
		};
	},
};
</script>

<style>
.undone-item {
	max-width: 500px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2px solid darkmagenta;
	margin-bottom: 20px;
}
.undone-item > p {
	font-style: italic;
}
</style>

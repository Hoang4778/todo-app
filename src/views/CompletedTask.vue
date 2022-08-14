<template>
	<div class="completed-item" v-for="todo in completedList" :key="todo.id">
		<h2>{{ todo.title }}</h2>
		<p>
			Added on {{ months[todo.timeStamp.toDate().getMonth()] }}
			{{ todo.timeStamp.toDate().getDate() }}
			{{ todo.timeStamp.toDate().getFullYear() }}
		</p>
	</div>
</template>

<script>
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import db from "@/firebase/configs";
import { ref } from "@vue/reactivity";
export default {
	setup() {
		let completedList = ref([]);
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

		function getCompletedTodo() {
			onSnapshot(
				query(collection(db, "todoList"), where("isDone", "==", true)),
				(item) => {
					let completedTasks = [];
					item.forEach((element) => {
						completedTasks.push({ ...element.data(), id: element.id });
					});
					completedList.value = completedTasks.sort(
						(x, y) => y.timeStamp - x.timeStamp
					);
				}
			);
		}

		getCompletedTodo();

		return {
			completedList,
			getCompletedTodo,
			months,
		};
	},
};
</script>

<style>
.completed-item {
	max-width: 500px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2px solid darkmagenta;
	margin-bottom: 20px;
}
.completed-item > p {
	font-style: italic;
}
</style>

<template>
	<div id="new-todo">
		<div id="plus-icon">
			<img
				src="https://img.icons8.com/external-flat-icons-inmotus-design/30/000000/external-Plus-mathematics-geometry-flat-icons-inmotus-design.png"
			/>
		</div>
		<div id="input-field">
			<input
				type="text"
				id="search-field"
				v-model="todoTitle"
				@keypress.enter="addTodo"
				placeholder="New todo here"
			/>
			<button id="add-btn" @click="addTodo">ADD</button>
		</div>
	</div>
	<TodoSearch :input="todoList" @return="displaySearch" />
	<div v-if="searchList" class="search-display">
		<div
			class="search-item"
			v-for="item in searchList"
			:key="item.id"
			:class="{ 'item-done': item.isDone }"
		>
			<div class="search-title">
				<h2>{{ item.title }}</h2>
				<div>
					<button
						id="done-icon"
						@click="handleComplete(item.id, item.isDone)"
						:class="{ done: item.isDone }"
					>
						<img
							src="https://img.icons8.com/external-regular-kawalan-studio/30/000000/external-tick-user-interface-regular-kawalan-studio.png"
						/>
					</button>
					<button id="delete-icon" @click="handleDelete(item.id)">
						<img
							src="https://img.icons8.com/sf-ultralight/30/000000/filled-trash.png"
						/>
					</button>
				</div>
			</div>
			<p>
				Added on {{ months[item.timeStamp.toDate().getMonth()] }}
				{{ item.timeStamp.toDate().getDate() }}
				{{ item.timeStamp.toDate().getFullYear() }}
			</p>
		</div>
	</div>
	<div
		class="todo-item"
		v-for="todo in todoList"
		:key="todo.id"
		:class="{ 'item-done': todo.isDone }"
		v-else
	>
		<div class="todo-title">
			<h2>{{ todo.title }}</h2>
			<div>
				<button
					id="done-icon"
					@click="handleComplete(todo.id, todo.isDone)"
					:class="{ done: todo.isDone }"
				>
					<img
						src="https://img.icons8.com/external-regular-kawalan-studio/30/000000/external-tick-user-interface-regular-kawalan-studio.png"
					/>
				</button>
				<button id="delete-icon" @click="handleDelete(todo.id)">
					<img
						src="https://img.icons8.com/sf-ultralight/30/000000/filled-trash.png"
					/>
				</button>
			</div>
		</div>
		<p>
			Added on {{ months[todo.timeStamp.toDate().getMonth()] }}
			{{ todo.timeStamp.toDate().getDate() }}
			{{ todo.timeStamp.toDate().getFullYear() }}
		</p>
	</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	orderBy,
	serverTimestamp,
	updateDoc,
	query,
} from "firebase/firestore";
import db from "../firebase/configs";
import TodoSearch from "../components/TodoSearch.vue";

export default {
	components: { TodoSearch },
	setup() {
		let todoList = ref([]);
		let todoTitle = ref("");
		let searchList = ref(null);
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

		function showTodo() {
			onSnapshot(
				query(collection(db, "todoList"), orderBy("timeStamp", "desc")),
				(snapShot) => {
					let result = [];
					snapShot.forEach((element) => {
						result.push({ ...element.data(), id: element.id });
						todoList.value = [...result];
					});
				}
			);
		}

		showTodo();

		async function addTodo() {
			await addDoc(collection(db, "todoList"), {
				title: todoTitle.value,
				isDone: false,
				timeStamp: serverTimestamp(),
			});
			todoTitle.value = "";
		}

		async function handleComplete(id, isDone) {
			await updateDoc(doc(db, "todoList", id), {
				isDone: !isDone,
			});
		}

		async function handleDelete(id) {
			await deleteDoc(doc(db, "todoList", id));
		}

		function displaySearch(result) {
			searchList.value = [...result];
		}

		return {
			todoList,
			todoTitle,
			addTodo,
			months,
			handleComplete,
			handleDelete,
			displaySearch,
			searchList,
		};
	},
};
</script>

<style>
#new-todo {
	border: 2px solid darkmagenta;
	border-radius: 10px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin-bottom: 20px;
}
#plus-icon {
	align-self: flex-end;
	transition-duration: 1s;
}
#plus-icon:hover {
	transform: rotate(180deg);
}
#input-field {
	display: flex;
	align-items: center;
	gap: 10px;
}
#search-field {
	width: 400px;
	height: 30px;
	font-size: 1.5rem;
	border-radius: 5px;
}
#add-btn {
	height: 35px;
	background-color: cornflowerblue;
	color: white;
	border: 1px solid cornflowerblue;
	border-radius: 5px;
	cursor: pointer;
}
.search-display {
	max-width: 500px;
	width: 100%;
}
.todo-item {
	max-width: 500px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2px solid darkmagenta;
	margin-bottom: 20px;
}
.search-item {
	max-width: 500px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2px solid darkmagenta;
	margin-bottom: 20px;
}
.search-item > p {
	max-width: 500px;
	width: 100%;
	font-style: italic;
	text-align: right;
	color: grey;
	margin: 0;
}
.todo-title {
	max-width: 500px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.search-title {
	max-width: 500px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.todo-item > p {
	max-width: 500px;
	width: 100%;
	font-style: italic;
	text-align: right;
	color: grey;
	margin: 0;
}
#done-icon {
	cursor: pointer;
	border: none;
}
.done {
	background-color: cornflowerblue;
}
.item-done {
	border-bottom: 2px solid cornflowerblue;
}
#delete-icon {
	cursor: pointer;
	border: none;
	border-left: 1px solid black;
}
</style>

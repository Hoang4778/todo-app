import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CompletedTask from "../views/CompletedTask.vue";
import UndoneTask from "../views/UndoneTask.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/completed",
		name: "completed-task",
		component: CompletedTask,
	},
	{
		path: "/undone",
		name: "undone-task",
		component: UndoneTask,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;

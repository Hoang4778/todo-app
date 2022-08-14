<template>
	<div id="container">
		<h1 id="title">Todo List</h1>
		<nav id="router-link">
			<router-link class="nav-link" :to="{ name: 'home' }">Home</router-link>
			<router-link class="nav-link" :to="{ name: 'completed-task' }"
				>Completed</router-link
			>
			<router-link class="nav-link" :to="{ name: 'undone-task' }"
				>Undone</router-link
			>
		</nav>
		<router-view />
	</div>
</template>

<style>
#container {
	max-width: 1200px;
	width: 100%;
	margin: 30px auto;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
}
#title {
	font-size: 2.5rem;
	color: darkmagenta;
}
.nav-link {
	color: cornflowerblue;
	font-size: 1.5rem;
	padding: 5px 10px;
	text-decoration: none;
	text-align: center;
}
.router-link-active {
	color: white;
	background-color: cornflowerblue;
	border: 1px solid cornflowerblue;
	border-radius: 5px;
}
</style>

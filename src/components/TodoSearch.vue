<template>
	<div id="search-bar">
		<img src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png" />
		<input
			type="text"
			placeholder="Search todo"
			id="search-field"
			@keyup="handleInput"
		/>
	</div>
</template>

<script>
export default {
	props: ["input"],
	setup(props, context) {
		function handleInput(e) {
			let regex = new RegExp(e.target.value, "i");
			let matchedTodo = props.input.filter((x) => regex.test(x.title));
			context.emit("return", matchedTodo);
		}
		return { handleInput };
	},
};
</script>

<style>
#search-bar {
	display: flex;
	align-items: center;
	border: 1px solid black;
	border-radius: 5px;
	background-color: white;
}
#search-field {
	max-width: 400px;
	width: 100%;
	height: 30px;
	border: none;
	font-size: 1.5rem;
	outline: none;
}
</style>

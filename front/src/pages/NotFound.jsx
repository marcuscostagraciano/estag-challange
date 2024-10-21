const notFoundMessageStyle = {
	fontWeight: "normal",
};

function NotFound() {
	return (
		<>
			<h1>Hello there, <i>adventurer</i>!</h1>

			<h3 style={notFoundMessageStyle}>
				Looks like the requested page does not exist.
				<br />
				Please, return to an existent page!
			</h3>
		</>
	);
}

export default NotFound;

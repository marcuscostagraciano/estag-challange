const articleStyle = {
	gridColumn: "1/-1",
	margin: "10vh auto",
	fontSize: "1.5rem",
};

const notFoundMessageStyle = {
	fontWeight: "normal",
};

function NotFound() {
	return (
		<article style={articleStyle}>
			<h1>
				Hello there, <i>adventurer</i>!
			</h1>

			<h3 style={notFoundMessageStyle}>
				Looks like the requested page does not exist.
				<br />
				Please, return to an existing page!
			</h3>
		</article>
	);
}

export default NotFound;

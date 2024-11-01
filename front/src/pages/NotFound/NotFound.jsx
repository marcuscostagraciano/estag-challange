import { Link } from "react-router-dom";

import "./NotFound.css";

function NotFound() {
	return (
		<article>
			<h1>
				Hello there, <i>adventurer</i>!
			</h1>

			<h3 id="not-found-message">
				Looks like the requested page does not exist.
				<br />
				Please, return to an existing page!
			</h3>

			<Link to={"/"} id="return-link" autoFocus>
				Return to the Store
			</Link>
		</article>
	);
}

export default NotFound;

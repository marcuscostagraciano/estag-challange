import { RouterProvider } from "react-router-dom";

import router from "./plugins/router";

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;

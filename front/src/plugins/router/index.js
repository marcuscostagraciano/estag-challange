import { createBrowserRouter } from "react-router-dom";
import routes from "./routes";

import NavBar from "../../layouts/NavBar/NavBar";

const router = createBrowserRouter([
	{
		path: "/",
		element: <NavBar />,
		children: routes,
	},
]);

export default router;

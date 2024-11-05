import { createBrowserRouter } from "react-router-dom";
import routes from "./routes";

import NavBar from "../../layouts/NavBar/NavBar";
import Main from "../../Customer/pages/Main/Main";

const router = createBrowserRouter([
	{
		path: "/",
		element: <NavBar />,
		element: <Main />,
		children: routes,
	},
]);

export default router;

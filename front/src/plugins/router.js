import { createBrowserRouter } from "react-router-dom";

import NavBar from "../layouts/NavBar/NavBar";

import Store from "../pages/Store";
import Product from "../pages/Product";
import Category from "../pages/Category";
import History from "../pages/History";

const router = createBrowserRouter([
	{
		path: "/",
		element: <NavBar />,
		children: [
			{ path: "/", element: <Store /> },
			{ path: "products", element: <Product /> },


			{ path: "categories", element: <Category /> },


			{ path: "history", element: <History /> },
			{ path: '*', element: <h1>Page Not Found</h1> }
		],
	},
]);

export default router;

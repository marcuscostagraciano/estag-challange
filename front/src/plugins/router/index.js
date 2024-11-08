import { createBrowserRouter } from "react-router-dom";
import routes from "./routes";

// import NavBar from "../../layouts/NavBar/NavBar";
// const router = createBrowserRouter([
// 	{
// 		path: "/",
// 		element: <NavBar />,
// 		children: routes,
// 	},
// ]);

import CustomerLayout from "../../Customer/layouts/CustomerLayout/CustomerLayout";
import Main from "../../Customer/pages/Main/Main";
import ProductPage from "../../Customer/pages/ProductPage/ProductPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <CustomerLayout />,
		children: [
			{
				path: "/",
				element: <Main />,
			},
			{
				path: "products/:productID",
				element: <ProductPage />,
				loader: ({ params }) => params,
			},
		],
	},
]);

export default router;

import Category from "../../pages/Category";
import History from "../../pages/History";
import NotFound from "../../pages/NotFound/NotFound";
import Product from "../../pages/Product";
import Store from "../../pages/Store";

const routes = [
    {
        path: "/",
        name: "Suite Store",
        element: <Store />,
        isUserVisible: true,
    },
    {
        path: "products",
        name: "Products",
        element: <Product />,
        isUserVisible: true,
    },
    {
        path: "categories",
        name: "Categories",
        element: <Category />,
        isUserVisible: true,
    },
    {
        path: "history",
        name: "History",
        element: <History />,
        isUserVisible: true,
    },
    {
        path: "*",
        name: "Not Found Page",
        element: <NotFound />,
        isUserVisible: false,
    },
];

export default routes;

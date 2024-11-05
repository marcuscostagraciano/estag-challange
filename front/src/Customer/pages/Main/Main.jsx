import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { THUNK_STATUS } from "../../../utils/constants";

import "./Main.css";

import {
	asyncFetchProducts,
	getProductsStatus,
	selectAllProducts,
} from "../../../features/products/productsSlice";
import {
	asyncFetchCategories,
	getCategoriesStatus,
	selectAllCategories,
} from "../../../features/categories/categoriesSlice";
import { getOrderItemStatus } from "../../../features/orderItem/orderItemSlice";
import { getOrdersStatus } from "../../../features/orders/ordersSlice";

import ProductCard from "../../components/ProductCard/ProductCard";

const Main = () => {
	const dispatch = useDispatch();

	const productsList = useSelector(selectAllProducts);
	const categoriesList = useSelector(selectAllCategories);
	const categoriesStatus = useSelector(getCategoriesStatus);
	const productsStatus = useSelector(getProductsStatus);
	const orderItemStatus = useSelector(getOrderItemStatus);
	const ordersStatus = useSelector(getOrdersStatus);

	useEffect(() => {
		if (categoriesStatus === THUNK_STATUS.IDLE)
			dispatch(asyncFetchCategories());
		if (productsStatus === THUNK_STATUS.IDLE)
			dispatch(asyncFetchProducts());
	}, [
		categoriesStatus,
		productsStatus,
		orderItemStatus,
		ordersStatus,
		dispatch,
	]);

	const renderProductList = productsList.map((product, index) => (
		<ProductCard product={product} key={index} />
	));

	return (
		<>
			<main>
				<aside className="sidebar">
					<h1>Filtros</h1>
					{categoriesList.map((cat) => (
						<label>
							<input type="checkbox" />
							{cat.name}
						</label>
					))}
				</aside>

				<section className="products-list">{renderProductList}</section>
			</main>
		</>
	);
};

export default Main;

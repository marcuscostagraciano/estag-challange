import { useDispatch, useSelector } from "react-redux";
import { Outlet, NavLink } from "react-router-dom";
import { useEffect } from "react";

import "./NavBar.css";

import { THUNK_STATUS } from "../../utils/constants";

import {
	asyncFetchCategories,
	getCategoriesError,
	getCategoriesStatus,
} from "../../features/categories/categoriesSlice";
import {
	asyncFetchOrderItems,
	getOrderItemStatus,
	getOrderItemError,
} from "../../features/orderItem/orderItemSlice";
import {
	asyncFetchOrders,
	getOrdersError,
	getOrdersStatus,
} from "../../features/orders/ordersSlice";
import {
	asyncFetchProducts,
	getProductsError,
	getProductsStatus,
} from "../../features/products/productsSlice";

function NavBar() {
	const dispatch = useDispatch();

	// Categories
	const categoriesStatus = useSelector(getCategoriesStatus);
	const categoriesError = useSelector(getCategoriesError);
	// Products
	const productsStatus = useSelector(getProductsStatus);
	const productsError = useSelector(getProductsError);
	// Orders
	const orderItemStatus = useSelector(getOrderItemStatus);
	const orderItemError = useSelector(getOrderItemError);
	// Orders
	const ordersStatus = useSelector(getOrdersStatus);
	const ordersError = useSelector(getOrdersError);

	useEffect(() => {
		if (!categoriesError && categoriesStatus === THUNK_STATUS.IDLE)
			dispatch(asyncFetchCategories());
		if (!ordersError && ordersStatus === THUNK_STATUS.IDLE)
			dispatch(asyncFetchOrders());
		if (!orderItemError && orderItemStatus === THUNK_STATUS.IDLE)
			dispatch(asyncFetchOrderItems());
		if (!productsError && productsStatus === THUNK_STATUS.IDLE)
			dispatch(asyncFetchProducts());
	}, [
		categoriesStatus,
		productsStatus,
		orderItemStatus,
		ordersStatus,
		dispatch,
	]);

	return (
		<>
			<nav className="primary-bg page-header">
				<NavLink to="/">Suite Store</NavLink>
				<NavLink to="products">Products</NavLink>
				<NavLink to="categories">Categories</NavLink>
				<NavLink to="history">History</NavLink>
			</nav>

			<main className="site-body">
				<Outlet />
			</main>
		</>
	);
}

export default NavBar;

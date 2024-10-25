import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	PRODUCT_FIELDS,
	PRODUCT_TABLE_HEADERS,
	THUNK_STATUS,
} from "../utils/constants";

import ItemsTable from "../components/Table";
import ProductsForm from "../components/Products/Form";

import {
	asyncFetchCategories,
	getCategoriesStatus,
	selectAllCategories,
} from "../features/categories/categoriesSlice";

import {
	asyncFetchProducts,
	asyncDeleteProduct,
	asyncPostProduct,
	getProductsStatus,
	selectAllProducts,
} from "../features/products/productsSlice";

function Product() {
	const amountRef = useRef();
	const nameRef = useRef();
	const priceRef = useRef();
	const categoryRef = useRef();

	const dispatch = useDispatch();
	// Categories
	const categoriesList = useSelector(selectAllCategories);
	const categoriesStatus = useSelector(getCategoriesStatus);
	// Products
	const productsList = useSelector(selectAllProducts);
	const productsStatus = useSelector(getProductsStatus);

	useEffect(() => {
		if (categoriesStatus === THUNK_STATUS.IDLE)
			dispatch(asyncFetchCategories());
		if (productsStatus === THUNK_STATUS.IDLE)
			dispatch(asyncFetchProducts());
	}, [categoriesStatus, productsStatus, dispatch, THUNK_STATUS]);

	const handleOnSubmit = (e) => {
		e.preventDefault();

		const name = nameRef.current.value;
		const amount = amountRef.current.value;
		const price = priceRef.current.value;
		const category = categoryRef.current.value;
		dispatch(asyncPostProduct({ name, amount, price, category }));
		nameRef.current.value = null;
		amountRef.current.value = null;
		priceRef.current.value = null;
	};

	const handleOnDelete = (productId) => {
		dispatch(asyncDeleteProduct(productId));
	};

	return (
		<>
			<section className="left-side-panel">
				<ProductsForm
					amountRef={amountRef}
					nameRef={nameRef}
					priceRef={priceRef}
					categoryRef={categoryRef}
					categoriesList={categoriesList}
					onSubmit={handleOnSubmit}
				/>
			</section>

			<div className="middle-divisor" />

			<section className="right-side-panel">
				<ItemsTable
					tableHeaders={PRODUCT_TABLE_HEADERS}
					fetchStatus={productsStatus}
					itemsProperties={PRODUCT_FIELDS}
					itemList={productsList}
					onDelete={handleOnDelete}
				/>
			</section>
		</>
	);
}

export default Product;

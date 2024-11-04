import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getListObject } from "../utils/";

import Loader from "../components/Loader/Loader";
import ProductsForm from "../components/Products/Form";
import Table from "../components/Products/Table";

import { selectAllCategories } from "../features/categories/categoriesSlice";

import {
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
	const imgUrlRef = useRef();

	const dispatch = useDispatch();
	// Categories
	const categoriesList = useSelector(selectAllCategories);
	// Products
	const productsList = useSelector(selectAllProducts);
	const productsStatus = useSelector(getProductsStatus);

	const handleOnSubmit = (e) => {
		e.preventDefault();

		const name = nameRef.current.value;
		const amount = amountRef.current.value;
		const price = priceRef.current.value;
		const categoryCode = categoryRef.current.value;
		const category = getListObject(categoriesList, categoryCode);
		const imgUrl = imgUrlRef.current.value;
		dispatch(
			asyncPostProduct({
				name,
				amount,
				price,
				categoryCode,
				category,
				imgUrl,
			})
		);

		nameRef.current.value = null;
		amountRef.current.value = null;
		priceRef.current.value = null;
		imgUrlRef.current.value = null;
	};

	const handleOnDelete = (productId) => {
		dispatch(asyncDeleteProduct(productId));
	};

	return (
		<>
			<Loader loadingStatus={productsStatus} />

			<section className="left-side-panel">
				<ProductsForm
					amountRef={amountRef}
					nameRef={nameRef}
					priceRef={priceRef}
					categoryRef={categoryRef}
					imgUrlRef={imgUrlRef}
					categoriesList={categoriesList}
					onSubmit={handleOnSubmit}
				/>
			</section>

			<div className="middle-divisor" />

			<section className="right-side-panel">
				<Table
					fetchStatus={productsStatus}
					itemList={productsList}
					onDelete={handleOnDelete}
				/>
			</section>
		</>
	);
}

export default Product;

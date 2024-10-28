import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	CATEGORY_FIELDS,
	CATEGORY_TABLE_HEADERS,
	THUNK_STATUS,
} from "../utils/constants";

import ItemsTable from "../components/Table";
import CategoriesForm from "../components/Categories/Form";

import {
	selectAllCategories,
	getCategoriesError,
	getCategoriesStatus,
	asyncFetchCategories,
	asyncDeleteCategory,
	asyncPostCategory,
} from "../features/categories/categoriesSlice";

import {
	asyncFetchProducts,
	getProductsStatus,
} from "../features/products/productsSlice";
import Loader from "../components/Loader/Loader";

function Category() {
	const categoryNameRef = useRef();
	const categoryTaxRef = useRef();

	const dispatch = useDispatch();
	const categories = useSelector(selectAllCategories);
	const categoriesStatus = useSelector(getCategoriesStatus);
	const productsStatus = useSelector(getProductsStatus);
	const categoriesError = useSelector(getCategoriesError);

	useEffect(() => {
		if (!categoriesError && categoriesStatus === THUNK_STATUS.IDLE)
			dispatch(asyncFetchCategories());
		if (productsStatus === THUNK_STATUS.IDLE)
			dispatch(asyncFetchProducts());
	}, [categoriesStatus, productsStatus, dispatch]);

	const handleOnSubmit = (e) => {
		e.preventDefault();

		const name = categoryNameRef.current.value;
		const tax = categoryTaxRef.current.value;
		dispatch(asyncPostCategory({ name, tax }));

		categoryNameRef.current.value = "";
		categoryTaxRef.current.value = "";
	};

	const handleOnDelete = (categoryId) => {
		dispatch(asyncDeleteCategory(categoryId));
	};

	return (
		<>
			<Loader loadingStatus={categoriesStatus} />

			<section className="left-side-panel">
				<CategoriesForm
					onSubmit={handleOnSubmit}
					categoryNameRef={categoryNameRef}
					categoryTaxRef={categoryTaxRef}
				/>
			</section>

			<div className="middle-divisor" />

			<section className="right-side-panel">
				<ItemsTable
					tableHeaders={CATEGORY_TABLE_HEADERS}
					itemList={categories}
					fetchStatus={categoriesStatus}
					itemsProperties={CATEGORY_FIELDS}
					onDelete={handleOnDelete}
				/>
			</section>
		</>
	);
}

export default Category;

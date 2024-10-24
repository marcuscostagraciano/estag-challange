import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CATEGORY_TABLE_HEADERS, THUNK_STATUS } from "../utils/constants";

import ItemsTable from "../components/Table";
import Form from "../components/Category/Form/Form";

import {
	selectAllCategories,
	getCategoriesError,
	getCategoriesStatus,
	fetchCategories,
} from "../features/categories/categoriesSlice";

function Category() {
	const categoryNameRef = useRef(null);
	const categoryTaxRef = useRef(null);

	const dispatch = useDispatch();
	const categories = useSelector(selectAllCategories);
	const categoriesStatus = useSelector(getCategoriesStatus);
	const categoriesError = useSelector(getCategoriesError);

	useEffect(() => {
		if (categoriesStatus === THUNK_STATUS.IDLE) dispatch(fetchCategories());
	}, [categoriesStatus, dispatch]);

	const handleOnSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<>
			<section className="left-side-panel">
				<Form
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
				/>
			</section>
		</>
	);
}

export default Category;

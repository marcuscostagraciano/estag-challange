import { useEffect, useRef, useState } from "react";

import ItemsTable from "../components/Table";
import Form from "../components/Category/Form/Form";

import { CATEGORY_TABLE_HEADERS } from "../utils/constants";

function Category() {
	const categoryNameRef = useRef(null);
	const categoryTaxRef = useRef(null);
	const [categoriesList, setCategoriesList] = useState([]);

	const handleOnSubmit = (e) => {
		e.preventDefault();

		categoryNameRef.current.value = "";
		categoryTaxRef.current.value = "";
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
					itemList={categoriesList}
				/>
			</section>
		</>
	);
}

export default Category;

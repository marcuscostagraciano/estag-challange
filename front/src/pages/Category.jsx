import { useState } from "react";

import CategoryTable from "../components/CategoryTable/CategoryTable";

function Category() {
	return (
		<>
			<section className="left-side-panel">
				<CategoryTable />
			</section>

			<div className="middle-divisor" />

			<section className="right-side-panel">
				<CategoryTable/>
			</section>
		</>
	);
}

export default Category;

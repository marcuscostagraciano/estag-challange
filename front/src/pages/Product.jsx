import { useEffect, useRef } from "react";

import { PRODUCT_TABLE_HEADERS } from "../utils/constants";

import ItemsTable from "../components/Table";
import ProductsForm from "../components/Products/Form";

function Product() {
	const amountRef = useRef();
	const nameRef = useRef();
	const priceRef = useRef();

	useEffect(() => {}, []);

	const handleOnSubmit = (e) => {
		e.preventDefault();

		console.log(nameRef.current.value);
		console.log(amountRef.current.value);
		console.log(priceRef.current.value);
	};

	return (
		<>
			<section className="left-side-panel">
				<ProductsForm
					amountRef={amountRef}
					nameRef={nameRef}
					priceRef={priceRef}
					onSubmit={handleOnSubmit}
				/>
			</section>

			<div className="middle-divisor" />

			<section className="right-side-panel">
				<ItemsTable
					tableHeaders={PRODUCT_TABLE_HEADERS}
					itemList={[]}
				/>
			</section>
		</>
	);
}

export default Product;

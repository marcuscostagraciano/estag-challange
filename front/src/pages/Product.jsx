import ItemsTable from "../components/Table";
import { useEffect, useState } from "react";

import Products from "../services/Products";
import { PRODUCT_TABLE_HEADERS } from "../utils/constants";

function Product() {
	const [productsList, setProductsList] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setProductsList(await Products.getProducts());
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<section className="left-side-panel"></section>

			<div className="middle-divisor" />

			<section className="right-side-panel">
				<ItemsTable
					tableHeaders={PRODUCT_TABLE_HEADERS}
					itemList={productsList}
				/>
			</section>
		</>
	);
}

export default Product;

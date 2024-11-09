import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";

import "./ProductPage.css";

import { selectAllProducts } from "../../../features/products/productsSlice";

const ProductPage = () => {
	const { productID } = useLoaderData();
	const selectedProduct = [...useSelector(selectAllProducts)].find(
		(product) => product.code == productID
	);

	return (
		<>
			<main>
				<img
					src={selectedProduct?.img_url ?? ""}
					alt={"Image of '" + selectedProduct?.name + "' album"}
					id="product-image"
				/>
				ProductPage
			</main>
		</>
	);
};

export default ProductPage;

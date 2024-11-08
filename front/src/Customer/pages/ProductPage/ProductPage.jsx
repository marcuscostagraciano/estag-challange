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
			<img
				src={selectedProduct.img_url}
				alt={"Image of '" + selectedProduct.name + "' album"}
				id=""
			/>
			ProductPage
		</>
	);
};

export default ProductPage;

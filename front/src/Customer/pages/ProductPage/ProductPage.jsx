import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";

import "./ProductPage.css";

import {
	asyncFetchProducts,
	selectAllProducts,
	getProductsStatus,
} from "../../../features/products/productsSlice";
import { THUNK_STATUS } from "../../../utils/constants";

const ProductPage = () => {
	const dispatch = useDispatch();

	const { productID } = useLoaderData();
	const productsStatus = useSelector(getProductsStatus);
	const selectedProduct = [...useSelector(selectAllProducts)].find(
		(product) => product.code == productID
	);

	useEffect(() => {
		if (productsStatus == THUNK_STATUS.IDLE) dispatch(asyncFetchProducts());
	}, [productsStatus]);

	return (
		<>
			<img
				src={selectedProduct?.img_url ?? ""}
				alt={"Image of '" + selectedProduct?.name + "' album"}
				id="product-image"
			/>
			ProductPage
		</>
	);
};

export default ProductPage;

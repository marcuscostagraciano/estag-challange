import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "../components/Store/Form/Form";
import Loader from "../components/Loader/Loader";
import MainTable from "../components/Store/MainTable";

import {
	getProductsStatus,
	patchProductAmount,
	selectAllProducts,
} from "../features/products/productsSlice";
import { getListObject } from "../utils";
import { addProduct } from "../features/cart/cartSlice";
import { PATCH_OPERATIONS } from "../utils/constants";

const Store = () => {
	const productsStatus = useSelector(getProductsStatus);

	const dispatch = useDispatch();
	const productsList = useSelector(selectAllProducts);

	const selectedProductAmount = useRef();
	const [selectedProduct, setSelectedProduct] = useState();
	const [selectedProductMaxAmount, setSelectedProductMaxAmount] = useState();

	const handleOnChange = (e) => {
		const productCode = e.target.value;
		const product = getListObject(productsList, productCode);

		setSelectedProduct(product);
		setSelectedProductMaxAmount(product.amount);
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		const amount = Number(selectedProductAmount.current.value);
		const newAmount = selectedProductMaxAmount - amount;
		const productToDispatch = {
			...selectedProduct,
			amount,
			total: amount * selectedProduct.price,
		};

		dispatch(addProduct(productToDispatch));
		dispatch(
			patchProductAmount({
				...productToDispatch,
				operation: PATCH_OPERATIONS.SUB,
			})
		);
		setSelectedProductMaxAmount(newAmount);

		selectedProductAmount.current.value = "";
	};

	return (
		<>
			<Loader loadingStatus={productsStatus} />

			<section className="left-side-panel">
				<Form
					onChange={handleOnChange}
					onSubmit={handleOnSubmit}
					productAmountRef={selectedProductAmount}
					productsList={productsList}
					selectedProduct={selectedProduct}
					selectedProductMaxAmount={selectedProductMaxAmount}
				/>
			</section>

			<section className="middle-divisor"></section>

			<section className="right-side-panel">
				<MainTable />
			</section>
		</>
	);
};

export default Store;

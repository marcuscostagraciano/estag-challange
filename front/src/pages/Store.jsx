import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "../components/Store/Form/Form";
import Loader from "../components/Loader/Loader";
import MainTable from "../components/Store/MainTable";

import { getListObject } from "../utils";
import { PATCH_OPERATIONS } from "../utils/constants";

import {
	addProduct as addProductToCart,
	removeProduct as removeProductFromCart,
	selectAllProductsFromCart,
} from "../features/cart/cartSlice";
import {
	getProductsStatus,
	patchProductAmount,
	selectAllProducts,
} from "../features/products/productsSlice";

const Store = () => {
	const productsStatus = useSelector(getProductsStatus);

	const dispatch = useDispatch();
	const productsList = useSelector(selectAllProducts);
	const cartProductsList = useSelector(selectAllProductsFromCart);

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

		dispatch(addProductToCart(productToDispatch));
		dispatch(
			patchProductAmount({
				...productToDispatch,
				operation: PATCH_OPERATIONS.SUB,
			})
		);
		setSelectedProductMaxAmount(newAmount);

		selectedProductAmount.current.value = "";
	};

	const handleOnDelete = (objectIndex) => {
		dispatch(removeProductFromCart(objectIndex));
		const removedProduct = cartProductsList.at(objectIndex);

		if (removedProduct.code === selectedProduct.code) {
			const newSelectedProductMaxAmount =
				selectedProductMaxAmount + removedProduct.amount;
			setSelectedProductMaxAmount(newSelectedProductMaxAmount);
		}

		dispatch(
			patchProductAmount({
				...removedProduct,
				operation: PATCH_OPERATIONS.ADD,
			})
		);
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
				<MainTable
					onDelete={handleOnDelete}
					productsList={cartProductsList}
				/>
			</section>
		</>
	);
};

export default Store;

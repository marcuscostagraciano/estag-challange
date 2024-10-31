import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Form.css";

import { getListObject } from "../../../utils";

import {
	patchProductAmount,
	selectAllProducts,
} from "../../../features/products/productsSlice";
import { addProduct as addProductToCart } from "../../../features/cart/cartSlice";
import { PATCH_OPERATIONS } from "../../../utils/constants";

const Form = () => {
	const dispatch = useDispatch();
	const productsList = useSelector(selectAllProducts);

	const selectedProductAmount = useRef();
	const [selectedProduct, setSelectedProduct] = useState();
	const [selectedProductCode, setSelectedProductCode] = useState(false);
	const [selectedProductMaxAmount, setSelectedProductMaxAmount] = useState();
	const [selectedProductPrice, setSelectedProductPrice] = useState();
	const [selectedProductTax, setSelectedProductTax] = useState();

	const handleOnChange = (e) => {
		const productCode = e.target.value;
		setSelectedProductCode(productCode);

		const product = getListObject(productsList, productCode);

		setSelectedProduct(product);
		setSelectedProductPrice(product.price);

		setSelectedProductMaxAmount(product.amount);
		setSelectedProductTax(product.category.tax);
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

		dispatch(
			addProductToCart({
				product: productToDispatch,
				tax: selectedProductTax,
			})
		);
		dispatch(
			patchProductAmount({
				...productToDispatch,
				operation: PATCH_OPERATIONS.SUB,
			})
		);
		setSelectedProductMaxAmount(newAmount);

		selectedProductAmount.current.value = "";
	};

	const renderProductsList = productsList.map((product) => {
		if (product.amount)
			return (
				<option
					key={product.code}
					value={product.code}
					disabled={!!!product.amount}
				>
					{product.name}
				</option>
			);
	});
	const isProductsListEmpty = !!productsList.length;

	return (
		<>
			<form id="input-form" onSubmit={handleOnSubmit}>
				<label htmlFor="product-selection">Product</label>
				<select
					name="product-selection"
					id="product-selection"
					title="Product selection"
					onChange={handleOnChange}
					defaultValue={"default"}
				>
					<option value="default" disabled>
						Select a product
					</option>
					{renderProductsList}
				</select>
				<section className="inputs">
					<input
						type="number"
						name="amount-input"
						id="amount-input"
						title={
							selectedProductCode
								? `Amount to be bought`
								: "Select a product to input the amount"
						}
						placeholder="Amount"
						min={1}
						max={selectedProductMaxAmount}
						ref={selectedProductAmount}
						required
						disabled={!selectedProductCode}
					/>
					<input
						type="number"
						name="tax-input"
						id="tax-input"
						title="Product's category tax"
						placeholder="Product's category tax"
						value={selectedProductTax}
						readOnly
					/>
					<input
						type="number"
						name="unitary-price-input"
						id="unitary-price-input"
						title="Product's unitary price"
						placeholder="Product's unitary price"
						value={selectedProductPrice}
						readOnly
					/>
				</section>
				<input
					type="submit"
					id="submit-button"
					className="primary-bg"
					value="Add Product to cart"
					title={
						!isProductsListEmpty
							? "Register a Product to enable this button"
							: ""
					}
					disabled={!selectedProductCode}
				/>
			</form>
		</>
	);
};

export default Form;

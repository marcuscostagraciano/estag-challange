import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "../components/Store/Form";

import { getListObject, getListObjectProperty } from "../utils";

import {
	getProductsStatus,
	selectAllProducts,
} from "../features/products/productsSlice";
import { selectAllCategories } from "../features/categories/categoriesSlice";
import { selectTax, selectTotalValue } from "../features/cart/cartSlice";
import Loader from "../components/Loader/Loader";

const Store = () => {
	const dispatch = useDispatch();
	const productsList = useSelector(selectAllProducts);
	const productsStatus = useSelector(getProductsStatus);
	const categoriesList = useSelector(selectAllCategories);
	const tax = useSelector(selectTax);
	const total = useSelector(selectTotalValue);

	const selectedProductAmount = useRef();
	const [selectedProductCode, setSelectedProductCode] = useState(false);
	const [selectedProductMaxAmount, setSelectedProductMaxAmount] = useState();
	const [selectedProductPrice, setSelectedProductPrice] = useState();
	const [selectedProductTax, setSelectedProductTax] = useState();

	const handleOnChange = (e) => {
		const productCode = e.target.value;
		setSelectedProductCode(productCode);

		const product = getListObject(productsList, productCode);
		setSelectedProductPrice(product.price);
		setSelectedProductMaxAmount(product.amount);

		const categoryOfSelectedProduct = getListObject(
			categoriesList,
			product.category_code
		);
		setSelectedProductTax(categoryOfSelectedProduct.tax);
		console.log({
			productCode,
			product,
			categoryOfSelectedProduct,
			productPrice: product.price,
		});
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		selectedProductAmount.current.value = "";
	};

	return (
		<>
			<Loader loadingStatus={productsStatus} />

			<section className="left-side-panel">
				<Form
					onChange={handleOnChange}
					onSubmit={handleOnSubmit}
					productsList={productsList}
					productCode={selectedProductCode}
					productAmount={selectedProductAmount}
					productMaxAmount={selectedProductMaxAmount}
					productPrice={selectedProductPrice}
					productTax={selectedProductTax}
				/>
			</section>

			<section className="middle-divisor"></section>

			<section className="right-side-panel">
				<button onClick={handleOnSubmit}>clica</button>
			</section>
		</>
	);
};

export default Store;

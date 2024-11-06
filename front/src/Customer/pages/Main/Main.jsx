import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { THUNK_STATUS } from "../../../utils/constants";

import "./Main.css";

import {
	asyncFetchProducts,
	getProductsStatus,
	selectAllProducts,
} from "../../../features/products/productsSlice";
import {
	asyncFetchCategories,
	getCategoriesStatus,
	selectAllCategories,
} from "../../../features/categories/categoriesSlice";

import ProductCard from "../../components/ProductCard/ProductCard";

const Main = () => {
	const dispatch = useDispatch();

	const productsList = useSelector(selectAllProducts);
	const categoriesList = useSelector(selectAllCategories);
	const categoriesStatus = useSelector(getCategoriesStatus);
	const productsStatus = useSelector(getProductsStatus);

	const [filteredProductList, setFilteredProductList] = useState([]);
	const categoryFilterRef = useRef();

	useEffect(() => {
		if (categoriesStatus === THUNK_STATUS.IDLE)
			dispatch(asyncFetchCategories());
		if (productsStatus === THUNK_STATUS.IDLE)
			dispatch(asyncFetchProducts());
		if (productsList) setFilteredProductList(productsList);
	}, [categoriesStatus, productsStatus, productsList, dispatch]);

	const renderProductList = filteredProductList.map((product, index) => (
		<ProductCard product={product} key={index} />
	));

	const handleOnChange = () => {
		const selectedCategoryCode = categoryFilterRef.current.value;
		const isCategoryCodeNumber = !!Number(selectedCategoryCode)
		
		const filteredList = productsList.filter(
			(product) => product.category.code == selectedCategoryCode
		);
		setFilteredProductList(isCategoryCodeNumber ? filteredList : productsList);
	};

	const handleReset = () => {
		categoryFilterRef.current.value = "default";
		setFilteredProductList(productsList);
	};

	return (
		<>
			<main>
				<aside className="sidebar">
					<h1>Filtros</h1>
					<select
						defaultValue="default"
						onChange={handleOnChange}
						ref={categoryFilterRef}
					>
						<option value="default">All</option>
						{categoriesList.map((cat) => (
							<option value={cat.code} key={cat.code}>
								{cat.name}
							</option>
						))}
					</select>
					<br />
					<button onClick={handleReset}>Reset</button>
				</aside>

				<section className="products-list">{renderProductList}</section>
			</main>
		</>
	);
};

export default Main;

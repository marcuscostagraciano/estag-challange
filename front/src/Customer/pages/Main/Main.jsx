import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { THUNK_STATUS } from "../../../utils/constants";

import "./Main.css";
import Footer from "../../components/Footer/Footer";

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
import SideBar from "../../components/SideBar/SideBar";

const Main = () => {
	const dispatch = useDispatch();

	const productsList = useSelector(selectAllProducts);
	const categoriesList = useSelector(selectAllCategories);
	const categoriesStatus = useSelector(getCategoriesStatus);
	const productsStatus = useSelector(getProductsStatus);

	const [filteredProductList, setFilteredProductList] = useState([]);
	const [artists, setArtists] = useState([]);

	useEffect(() => {
		if (categoriesStatus === THUNK_STATUS.IDLE)
			dispatch(asyncFetchCategories());
		if (productsStatus === THUNK_STATUS.IDLE)
			dispatch(asyncFetchProducts());
		if (productsList) {
			setFilteredProductList(productsList);

			const artistsSet = new Set(
				productsList.map((product) => product.artist)
			);
			setArtists([...artistsSet].sort());
		}
	}, [categoriesStatus, productsStatus, productsList, dispatch]);

	const renderProductList = filteredProductList.map((product, index) => (
		<ProductCard product={product} key={index} />
	));

	return (
		<>
			<main>
				<SideBar
					artists={artists}
					categoriesList={categoriesList}
					productsList={productsList}
					setFilteredProductList={setFilteredProductList}
				/>
				<section className="products-list">{renderProductList}</section>
			</main>
			<Footer />
		</>
	);
};

export default Main;

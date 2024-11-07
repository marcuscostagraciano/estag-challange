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
	const [sortedCategoriesList, setSortedCategoriesList] = useState([]);
	const [artists, setArtists] = useState([]);

	useEffect(() => {
		if (categoriesStatus === THUNK_STATUS.IDLE)
			dispatch(asyncFetchCategories());
		if (productsStatus === THUNK_STATUS.IDLE)
			dispatch(asyncFetchProducts());
		if (categoriesList) {
			const nameSortedCategories = [...categoriesList].sort(
				(catA, catB) => catA.name.localeCompare(catB.name)
			);
			setSortedCategoriesList(nameSortedCategories);
		}
		if (productsList) {
			setFilteredProductList(productsList);
			const sortedArtistsList = [
				...new Set(productsList.map((product) => product.artist)),
			].sort();
			const artistsInitials = [
				...new Set(sortedArtistsList.map((artist) => artist[0])),
			];
			const initialsAndArtists = artistsInitials.map((initial) => ({
				initial,
				artists: sortedArtistsList.filter((artist) =>
					artist.startsWith(initial)
				),
			}));

			setArtists(initialsAndArtists);
		}
	}, [
		categoriesStatus,
		productsStatus,
		categoriesList,
		productsList,
		dispatch,
	]);

	const renderProductList = filteredProductList.map((product, index) => (
		<ProductCard product={product} key={index} />
	));

	return (
		<>
			<main>
				<SideBar
					categoriesList={sortedCategoriesList}
					initialsAndArtists={artists}
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

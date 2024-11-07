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

import ProductCard from "../../components/ProductCard/ProductCard";
import SideBar from "../../components/SideBar/SideBar";

const Main = () => {
	const dispatch = useDispatch();

	const productsList = useSelector(selectAllProducts);

	const productsStatus = useSelector(getProductsStatus);

	const [filteredProductList, setFilteredProductList] = useState([]);

	useEffect(() => {
		if (productsStatus === THUNK_STATUS.IDLE)
			dispatch(asyncFetchProducts());

		if (productsList) setFilteredProductList(productsList);
	}, [productsStatus, productsList, dispatch]);

	const renderProductList = filteredProductList.map((product, index) => (
		<ProductCard product={product} key={index} />
	));

	return (
		<>
			<main>
				<SideBar
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

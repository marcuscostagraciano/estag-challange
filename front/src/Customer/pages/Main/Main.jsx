import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./Main.css";
import Footer from "../../components/Footer/Footer";

import {
	getProductsStatus,
	selectAllProducts,
} from "../../../features/products/productsSlice";

import ProductCard from "../../components/ProductCard/ProductCard";
import SideBar from "../../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";

const Main = () => {
	const productsList = useSelector(selectAllProducts);
	const [filteredProductList, setFilteredProductList] = useState([]);

	useEffect(() => {
		if (productsList) setFilteredProductList(productsList);
	}, [productsList]);

	const renderProductList = filteredProductList.map((product, index) => (
		<ProductCard product={product} key={index} />
	));

	return (
		<>
			<Outlet />
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

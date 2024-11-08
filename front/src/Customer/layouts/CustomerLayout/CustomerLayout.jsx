import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../../assets/base.css";
import "./CustomerLayout.css";

import { THUNK_STATUS } from "../../../utils/constants";
import { selectAllProductsFromCart } from "../../../features/cart/cartSlice";
import {
	asyncFetchProducts,
	getProductsStatus,
} from "../../../features/products/productsSlice";

const CustomerLayout = (props) => {
	const dispatch = useDispatch();

	const cartProducts = useSelector(selectAllProductsFromCart);
	const productsStatus = useSelector(getProductsStatus);

	useEffect(() => {
		if (productsStatus === THUNK_STATUS.IDLE)
			dispatch(asyncFetchProducts());
	}, [productsStatus, dispatch]);

	return (
		<>
			<header id="store-header">
				<span className="offside-regular" id="store-name">
					SwiftStore
				</span>
				<span id="cart-button">
					<button
						className="bi bi-cart-fill"
						id="see-cart-button"
						onClick={() => {
							console.log("clicked");
						}}
					>
						<span id="number-products-cart">
							{cartProducts.length}
						</span>
					</button>
				</span>
			</header>
			<Outlet />
		</>
	);
};

export default CustomerLayout;

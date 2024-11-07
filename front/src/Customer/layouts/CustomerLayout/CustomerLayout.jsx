import { Outlet } from "react-router-dom";

import "../../assets/base.css";
import "./CustomerLayout.css";

import { selectAllProductsFromCart } from "../../../features/cart/cartSlice";
import { useSelector } from "react-redux";

const CustomerLayout = (props) => {
	const cartProducts = useSelector(selectAllProductsFromCart);

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
						<span id="number-products-cart">{cartProducts.length}</span>
					</button>
				</span>
			</header>
			<Outlet />
		</>
	);
};

export default CustomerLayout;

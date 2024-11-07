import { Outlet } from "react-router-dom";

import "../../assets/base.css";
import "./CustomerLayout.css";

const CustomerLayout = (props) => {
	return (
		<>
			<header id="store-header">
				<span className="offside-regular" id="store-name">
					SwiftStore
				</span>
				<span id="cart-button">
					<button className="bi bi-cart-fill" id="see-cart-button">
						<span id="number-products-cart">5</span>
					</button>
				</span>
			</header>
			<Outlet />
		</>
	);
};

export default CustomerLayout;

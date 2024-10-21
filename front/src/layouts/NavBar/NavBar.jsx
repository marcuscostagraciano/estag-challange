import { Outlet, NavLink } from "react-router-dom";

import "./NavBar.css";

function NavBar() {
	return (
		<>
			<nav className="primary-bg page-header">
				<NavLink to="/">Suite Store</NavLink>
				<NavLink to="products">Products</NavLink>
				<NavLink to="categories">Categories</NavLink>
				<NavLink to="history">History</NavLink>
			</nav>

			<main className="site-body">
				<Outlet />
			</main>
		</>
	);
}

export default NavBar;

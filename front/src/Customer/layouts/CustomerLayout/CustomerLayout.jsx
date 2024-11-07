import { Outlet } from "react-router-dom";

import '../../assets/base.css'
import './CustomerLayout.css'

const CustomerLayout = (props) => {
	return (
		<>
			<header>CustomerLayout</header>
			<Outlet />
		</>
	);
};

export default CustomerLayout;

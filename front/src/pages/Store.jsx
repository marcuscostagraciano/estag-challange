import { useSelector } from "react-redux";

import Form from "../components/Store/Form/Form";
import Loader from "../components/Loader/Loader";
import MainTable from "../components/Store/MainTable";

import { getProductsStatus } from "../features/products/productsSlice";

const Store = () => {
	const productsStatus = useSelector(getProductsStatus);

	return (
		<>
			<Loader loadingStatus={productsStatus} />

			<section className="left-side-panel">
				<Form />
			</section>

			<section className="middle-divisor"></section>

			<section className="right-side-panel">
				<MainTable />
			</section>
		</>
	);
};

export default Store;

import { useDispatch, useSelector } from "react-redux";

import ValuesTable from "./ValuesTable/ValuesTable";

import {
	PATCH_OPERATIONS,
	SUITE_STORE_TABLE_HEADERS,
} from "../../utils/constants";

import {
	removeProduct,
	selectAllProductsFromCart,
} from "../../features/cart/cartSlice";
import { patchProductAmount } from "../../features/products/productsSlice";

const Header = () => (
	<thead>
		<tr>
			{SUITE_STORE_TABLE_HEADERS.map((header, index) => (
				<td key={index}>{header}</td>
			))}
		</tr>
	</thead>
);

const Body = ({ productsList }) => {
	const dispatch = useDispatch();
	const cartProductsList = useSelector(selectAllProductsFromCart);

	const handleOnDelete = (objectIndex) => {
		dispatch(removeProduct(objectIndex));
		const lastRemovedProduct = cartProductsList.at(objectIndex);

		dispatch(
			patchProductAmount({
				...lastRemovedProduct,
				operation: PATCH_OPERATIONS.ADD,
			})
		);
	};

	const productsTRs = productsList.map((product, index) => (
		<tr key={index}>
			<td>{product.name}</td>
			<td>{product.amount}</td>
			<td>{product.price}</td>
			<td>{product.total}</td>
			<td>
				<button
					className="bi bi-trash-fill delete-btn"
					onClick={() => handleOnDelete(index)}
				/>
			</td>
		</tr>
	));

	return <tbody>{productsTRs}</tbody>;
};

const Table = () => {
	const productsList = useSelector(selectAllProductsFromCart);

	return (
		<>
			<table>
				<Header />
				<Body productsList={productsList} />
			</table>
			<ValuesTable productsList={productsList} />
		</>
	);
};

export default Table;

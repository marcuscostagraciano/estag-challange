import { useDispatch, useSelector } from "react-redux";

import ValuesTable from "./ValuesTable/ValuesTable";

import { SUITE_STORE_TABLE_HEADERS } from "../../utils/constants";

import {
	removeProduct,
	selectAllProducts,
} from "../../features/cart/cartSlice";

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

	const handleOnDelete = (objectIndex) => {
		dispatch(removeProduct(objectIndex));
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
	const productsList = useSelector(selectAllProducts);
	const areProductsInList = !!productsList.length;

	return (
		<>
			<table>
				<Header />
				<Body productsList={productsList} />
			</table>
			<ValuesTable areProductsInList={areProductsInList} />
		</>
	);
};

export default Table;

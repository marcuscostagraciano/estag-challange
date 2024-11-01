import ValuesTable from "./ValuesTable/ValuesTable";

import { SUITE_STORE_TABLE_HEADERS } from "../../utils/constants";

const Header = () => (
	<thead>
		<tr>
			{SUITE_STORE_TABLE_HEADERS.map((header, index) => (
				<td key={index}>{header}</td>
			))}
		</tr>
	</thead>
);

const Body = ({ onDelete, productsList }) => {
	const productsTRs = productsList.map((product, index) => (
		<tr key={index}>
			<td>{product.name}</td>
			<td>{product.amount}</td>
			<td>{product.price}</td>
			<td>{product.total}</td>
			<td>
				<button
					className="bi bi-trash-fill delete-btn"
					onClick={() => onDelete(index)}
				/>
			</td>
		</tr>
	));

	return <tbody>{productsTRs}</tbody>;
};

const Table = ({ onDelete, productsList }) => {
	return (
		<>
			<table>
				<Header />
				<Body onDelete={onDelete} productsList={productsList} />
			</table>
			<ValuesTable productsList={productsList} />
		</>
	);
};

export default Table;

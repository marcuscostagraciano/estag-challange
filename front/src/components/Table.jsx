import { THUNK_STATUS } from "../utils/constants";

const Headers = ({ headers }) => {
	return (
		<thead>
			<tr>
				{headers.map((header, index) => (
					<td key={index}>{header}</td>
				))}
			</tr>
		</thead>
	);
};

const Body = ({ items, fetchStatus, quantityTableRows }) => {
	const itemsProperties = Object.keys(items.length ? items[0] : []);

	const renderListOfItems = items.map((item) => {
		return (
			<tr key={item.code}>
				{itemsProperties.map((property) => (
					<td key={property}>{item[property]}</td>
				))}
			</tr>
		);
	});

	const tableRowMessage = (
		<tr>
			<td colSpan={quantityTableRows}>
				{fetchStatus === THUNK_STATUS.LOADING
					? "Loading items..."
					: fetchStatus === THUNK_STATUS.FAILED
					? "Something went wrong!"
					: "No items"}
			</td>
		</tr>
	);

	return <tbody>{items.length ? renderListOfItems : tableRowMessage}</tbody>;
};

function Table({ tableHeaders, fetchStatus, itemList }) {
	const countTableRows = tableHeaders.length;

	return (
		<>
			<table>
				<Headers headers={tableHeaders} />
				<Body
					items={itemList}
					quantityTableRows={countTableRows}
					fetchStatus={fetchStatus}
				/>
			</table>
		</>
	);
}

export default Table;

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

const Body = ({ items, fetchStatus, quantityTableRows, onDelete }) => {
	const itemsProperties = Object.keys(items.length ? items[0] : []);

	const renderListOfItems = items.map((item) => {
		return (
			<tr key={item.code}>
				{itemsProperties.map((property) => (
					<td key={property}>{item[property]}</td>
				))}
				<td>
					<button
						className="bi bi-trash-fill delete-btn"
						onClick={() => onDelete(item.code)}
					/>
				</td>
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

function Table({ tableHeaders, fetchStatus, itemList, onDelete }) {
	const countTableRows = tableHeaders.length;

	return (
		<>
			<table>
				<Headers headers={tableHeaders} />
				<Body
					items={itemList}
					quantityTableRows={countTableRows}
					fetchStatus={fetchStatus}
					onDelete={onDelete}
				/>
			</table>
		</>
	);
}

export default Table;

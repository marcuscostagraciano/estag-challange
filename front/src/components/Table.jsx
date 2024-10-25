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

const Body = ({ items, fetchStatus, itemsProperties, onDelete }) => {
	const countTableRows = itemsProperties.length;

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
			<td colSpan={countTableRows}>
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

function Table({
	tableHeaders,
	fetchStatus,
	itemList,
	itemsProperties,
	onDelete,
}) {
	return (
		<>
			<table>
				<Headers headers={tableHeaders} />
				<Body
					items={itemList}
					fetchStatus={fetchStatus}
					itemsProperties={itemsProperties}
					onDelete={onDelete}
				/>
			</table>
		</>
	);
}

export default Table;

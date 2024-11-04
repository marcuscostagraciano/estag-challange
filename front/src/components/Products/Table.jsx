import { PRODUCT_TABLE_HEADERS, THUNK_STATUS } from "../../utils/constants";

const Body = ({ items, fetchStatus, onDelete }) => {
	const countTableRows = 6;

	const renderListOfItems = items.map((item) => {
		return (
			<tr key={item.code}>
				<td>{item.code}</td>
				<td>{item.name}</td>
				<td>{item.amount}</td>
				<td>{item.price}</td>
				<td>
					<a
						href={item.img_url}
						target="_blank"
						rel="noopener noreferrer"
					>
						Open image
					</a>
				</td>
				<td>{item.category.name}</td>
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

const Table = ({ fetchStatus, itemList, onDelete }) => {
	const renderHeader = (
		<thead>
			<tr>
				{PRODUCT_TABLE_HEADERS.map((header, index) => (
					<td key={index}>{header}</td>
				))}
			</tr>
		</thead>
	);

	return (
		<>
			<table>
				{renderHeader}
				<Body
					items={itemList}
					fetchStatus={fetchStatus}
					onDelete={onDelete}
				/>
			</table>
		</>
	);
};

export default Table;

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

const Body = ({ items, quantityTableRows }) => {
	const itemsProperties = Object.keys(items.length ? items[0] : []);

	return (
		<tbody>
			{items.length ? (
				items.map((item) => {
					return (
						<tr key={item.code}>
							{itemsProperties.map((property) => (
								<td key={property}>{item[property]}</td>
							))}
						</tr>
					);
				})
			) : (
				<tr>
					<td colSpan={quantityTableRows}>No items</td>
				</tr>
			)}
		</tbody>
	);
};

function Table({ tableHeaders, itemList }) {
	const countTableRows = tableHeaders.length;

	return (
		<>
			<table>
				<Headers headers={tableHeaders} />
				<Body items={itemList} quantityTableRows={countTableRows} />
			</table>
		</>
	);
}

export default Table;

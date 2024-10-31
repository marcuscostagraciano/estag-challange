import "./Table.css";

import { HISTORY_TABLE_HEADERS } from "../../../utils/constants";

const Header = () => {
	const renderHeader = HISTORY_TABLE_HEADERS.map((header, index) => (
		<th key={index}>{header}</th>
	));

	return (
		<thead>
			<tr>{renderHeader}</tr>
		</thead>
	);
};

const Body = ({ ordersList, setOrderCode, setIsModalVisible }) => {
	const handleViewOrder = (orderCode) => {
		setOrderCode(orderCode);
		setIsModalVisible(true);
	};

	const renderBody = ordersList.map((order) => {
		return (
			<tr key={order.code} onClick={() => handleViewOrder(order.code)}>
				<td>{order.code}</td>
				<td>{order.tax}</td>
				<td>{order.total}</td>
			</tr>
		);
	});

	return <tbody>{renderBody}</tbody>;
};

const Table = ({ ordersList, setOrderCode, setIsModalVisible }) => {
	return (
		<table id="history-table">
			<Header />
			<Body
				ordersList={ordersList}
				setOrderCode={setOrderCode}
				setIsModalVisible={setIsModalVisible}
			/>
		</table>
	);
};

export default Table;

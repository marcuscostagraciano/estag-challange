import { useSelector } from "react-redux";

import "./Table.css";

import { HISTORY_TABLE_HEADERS } from "../../../utils/constants";

import { selectAllOrders } from "../../../features/orders/ordersSlice";
import { selectAllOrderItem } from "../../../features/orderItem/orderItemSlice";

const Header = () => {
	const renderHeader = HISTORY_TABLE_HEADERS.map((header, index) => (
		<td key={index}>{header}</td>
	));

	return (
		<thead>
			<tr>{renderHeader}</tr>
		</thead>
	);
};

const Body = () => {
	const orders = useSelector(selectAllOrders);
	const orderItems = useSelector(selectAllOrderItem);

	const handleViewOrder = (orderCode) => {
		console.log({ orderCode, orders, orderItems });
	};

	const renderBody = orders.map((order) => {
		return (
			<tr key={order.code}>
				<td>{order.code}</td>
				<td>{order.tax}</td>
				<td>{order.total}</td>
				<td>
					<button
						className="delete-btns"
						onClick={() => handleViewOrder(order.code)}
					>
						View order
					</button>
				</td>
			</tr>
		);
	});

	return <tbody>{renderBody}</tbody>;
};

const Table = () => {
	return (
		<section className="site-body">
			{/* <Table /> */}
			<table id="history-table">
				<Header />
				<Body />
			</table>
		</section>
	);
};

export default Table;

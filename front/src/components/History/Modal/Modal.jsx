import { useSelector } from "react-redux";

import "./Modal.css";

import { selectAllOrderItem } from "../../../features/orderItem/orderItemSlice";

const Modal = ({ order, setIsModalVisible }) => {
	const allOrderItem = useSelector(selectAllOrderItem);
	const orderOrderItem = allOrderItem.filter(
		(orderItem) => orderItem.order_code === order.code
	);
	const totalOrderAmount = orderOrderItem.reduce(
		(total, item) => total + item.amount,
		0
	);

	const renderOrderItems = orderOrderItem.map((item) => {
		return (
			<p key={item.code}>
				{item.amount}x - {item.product.name}
			</p>
		);
	});

	return (
		<section id="history-info">
			<section id="left-panel">
				<h1>Order code:</h1>
				{order.code}

				<h1>Order tax ($)</h1>
				{order.tax}
				<h1>Order total ($)</h1>

				{order.total}
				<h1>Qty of products</h1>

				{totalOrderAmount}
			</section>
			<section id="right-panel">
				<h1>Products</h1>
				<section id="products-list">{renderOrderItems}</section>
			</section>
			<button onClick={() => setIsModalVisible(false)}>Hide info</button>
		</section>
	);
};

export default Modal;

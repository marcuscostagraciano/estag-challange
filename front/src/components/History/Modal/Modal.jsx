import { useSelector } from "react-redux";

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
		<section>
			// order code
			{order.code}
			// order tax
			{order.tax}
			// order total
			{order.total}
			// sum orderItems amounts
			{totalOrderAmount}
			// items list
			{renderOrderItems}
			<button onClick={() => setIsModalVisible(false)}>Hide info</button>
		</section>
	);
};

export default Modal;

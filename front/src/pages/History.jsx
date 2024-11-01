import { useState } from "react";
import { useSelector } from "react-redux";

import Loader from "../components/Loader/Loader";
import Table from "../components/History/Table/Table";
import Modal from "../components/History/Modal/Modal";

import { selectAllOrders } from "../features/orders/ordersSlice";
import { getOrderItemStatus } from "../features/orderItem/orderItemSlice";

const History = () => {
	const orders = useSelector(selectAllOrders);
	const orderItemStatus = useSelector(getOrderItemStatus);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [orderCode, setOrderCode] = useState();

	const renderModal = isModalVisible ? (
		<Modal
			order={orders.find((order) => order.code === orderCode)}
			setIsModalVisible={setIsModalVisible}
		/>
	) : (
		"Select a order to see it's details"
	);

	return (
		<>
			<Loader loadingStatus={orderItemStatus} />
			<section className="left-side-panel">
				<Table
					ordersList={orders}
					setOrderCode={setOrderCode}
					setIsModalVisible={setIsModalVisible}
				/>
			</section>
			<div className="middle-divisor" />
			<section className="right-side-panel">{renderModal}</section>
		</>
	);
};

export default History;
